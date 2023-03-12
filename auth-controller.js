const User = require("./models/user.js");
const Role = require("./models/role.js");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

class AuthController {
  async registration(req, res) {
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
        roles: [userRole.value],
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
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const oldFriend = await User.findOne({ username });
      if (!oldFriend) {
        return res
          .status(400)
          .json({ message: `There is no ${username} in our database` });
      }
      const currentPassword = bcryptjs.compareSync(
        password,
        oldFriend.password
      );
      if (!currentPassword) {
        return res.status(400).json({ message: "Введен неправильный пароль" });
      }
    } catch (error) {
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      res.json("server works");
    } catch (error) {}
  }
}

module.exports = new AuthController();
