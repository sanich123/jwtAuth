const { Router } = require("express");
const authController = require("./auth-controller.js");
const { check } = require("express-validator");
const authMiddleware = require("./middleware/auth-middleware.js");
const roleMiddleware = require("./middleware/role-middleware.js");
const { Message, Roles, Routes } = require("./const.js");

const router = new Router();
router.post(
  Routes.registration,
  [
    check("username", Message.emptyField).notEmpty(),
    check("password", Message.passwordRequirements).isLength({
      min: 4,
      max: 10,
    }),
  ],
  authController.registration
);
router.post(Routes.login, authController.login);
router.get(
  Routes.users,
  roleMiddleware([Roles.user]),
  authMiddleware,
  authController.getUsers
);

module.exports = { router };
