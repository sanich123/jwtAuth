var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "./models/User.js";
import Role from "./models/Role.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { secret } from "./config.js";
function generateAccessToken(id, roles) {
    const payload = {
        id,
        roles,
    };
    return jwt.sign(payload, secret, { expiresIn: "24h" });
}
class AuthController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        message: "Произошла ошибка регистрации пользователя",
                        errors,
                    });
                }
                const { username, password } = req.body;
                const candidate = yield User.findOne({ username });
                if (candidate) {
                    return res
                        .status(400)
                        .json({ message: "Пользователь с таким именем уже есть" });
                }
                const userRole = yield Role.findOne({ value: "USER" });
                const hashPassword = bcryptjs.hashSync(password, 7);
                const user = new User({
                    username,
                    password: hashPassword,
                    roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value],
                });
                yield user.save();
                return res
                    .status(200)
                    .json({ message: "Пользователь был успешно зарегистрирован" });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: "Registration error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield User.findOne({ username });
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
            }
            catch (error) {
                res.status(400).json({ message: "Login error" });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User.find();
                res.json(users);
            }
            catch (error) { }
        });
    }
}
export default new AuthController();
