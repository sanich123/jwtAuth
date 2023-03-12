const Router = require("express");
const router = new Router();
const authController = require("./auth-controller.js");
const { check } = require("express-validator");

router.post(
  "/registration",
  [
    check("username", "Поле пользователя не может быть пустым").notEmpty(),
    check(
      "password",
      "Поле пароля должно быть более 4 символов и меньше 10 символов"
    ).isLength({ min: 4, max: 10 }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/users", authController.getUsers);

module.exports = router;
