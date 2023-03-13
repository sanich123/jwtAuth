const User = require("./models/User.js");
const Role = require("./models/Role.js");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("./config.js");
const { Types } = require("mongoose");
const { Message, Roles } = require("./const.js");

function generateAccessToken(id, roles) {
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
  async registration(req, res,) {
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
  async login(req, res) {
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
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {}
  }
}

module.exports = new AuthController();
