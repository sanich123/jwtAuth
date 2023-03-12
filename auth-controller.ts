import User from "./models/User.js";
import Role from "./models/Role.js";
import bcryptjs from "bcryptjs";
import {Request, Response} from 'express';
import { Result, ValidationError, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { secret } from "./config.js";
// import { Request } from "express-validator/src/base.js";
import { Types } from "mongoose";

function generateAccessToken(id: Types.ObjectId, roles: string[]) {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
}

class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: "Произошла ошибка регистрации пользователя",
          errors,
        });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Пользователь с таким именем уже есть" });
      }
      const userRole = await Role.findOne({ value: "USER" });
      const hashPassword = bcryptjs.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole?.value],
      });
      await user.save();
      return res
        .status(200)
        .json({ message: "Пользователь был успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req: { body: { username: any; password: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; json: (arg0: { token: string; }) => any; }) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(400)
          .json({ message: `There is no ${username} in our database` });
      }
      const currentPassword = bcryptjs.compareSync(password, user.password);
      if (!currentPassword) {
        return res.status(400).json({ message: "Введен неправильный пароль" });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {}
  }
}

export default new AuthController();
