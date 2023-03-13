import User from "./models/User.js";
import Role from "./models/Role.js";
import bcryptjs from "bcryptjs";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { secret } from "./config.js";
import { Types } from "mongoose";
import { Message, Roles } from "./const.js";

function generateAccessToken(id: Types.ObjectId, roles: string[]) {
  return jwt.sign(
    {
      id,
      roles,
    },
    secret,
    { expiresIn: "24h" }
  );
}
class AuthController {
  async registration(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: Message.registrationError,
          errors,
        });
      }
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res
          .status(400)
          .json({ message: Message.alreadyHaveThisUser });
      }
      const userRole = await Role.findOne({ value: Roles.user });
      const hashPassword = bcryptjs.hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword,
        roles: [userRole?.value],
      });
      await user.save();
      return res
        .status(200)
        .json({ message: Message.successRegistration });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: Message.isError });
    }
  }
  async login(req: Request, res: Response) {
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
        return res.status(400).json({ message: Message.wrongPassword });
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.json({ token });
    } catch (error) {
      res.status(400).json({ message: Message.isLoginError });
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
