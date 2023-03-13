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
    return jwt.sign({
        id,
        roles,
    }, secret, { expiresIn: "24h" });
}
class AuthController {
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        message: "\u041F\u0440\u043E\u0438\u0437\u043E\u0448\u043B\u0430 \u043E\u0448\u0438\u0431\u043A\u0430 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F" /* Message.registrationError */,
                        errors,
                    });
                }
                const { username, password } = req.body;
                const candidate = yield User.findOne({ username });
                if (candidate) {
                    return res
                        .status(400)
                        .json({ message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0441 \u0442\u0430\u043A\u0438\u043C \u0438\u043C\u0435\u043D\u0435\u043C \u0443\u0436\u0435 \u0435\u0441\u0442\u044C" /* Message.alreadyHaveThisUser */ });
                }
                const userRole = yield Role.findOne({ value: "USER" /* Roles.user */ });
                const hashPassword = bcryptjs.hashSync(password, 7);
                const user = new User({
                    username,
                    password: hashPassword,
                    roles: [userRole === null || userRole === void 0 ? void 0 : userRole.value],
                });
                yield user.save();
                return res
                    .status(200)
                    .json({ message: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C \u0431\u044B\u043B \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0437\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D" /* Message.successRegistration */ });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({ message: "Registration error" /* Message.isError */ });
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
                    return res.status(400).json({ message: "\u0412\u0432\u0435\u0434\u0435\u043D \u043D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C" /* Message.wrongPassword */ });
                }
                const token = generateAccessToken(user._id, user.roles);
                return res.json({ token });
            }
            catch (error) {
                res.status(400).json({ message: "Login error" /* Message.isLoginError */ });
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
