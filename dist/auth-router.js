import { Router } from "express";
import authController from "./auth-controller.js";
import { check } from "express-validator";
import { authMiddleware } from "./middleware/auth-middleware.js";
import { roleMiddleware } from "./middleware/role-middleware.js";
const router = new Router();
router.post("/registration", [
    check("username", "Поле пользователя не может быть пустым").notEmpty(),
    check("password", "Поле пароля должно быть более 4 символов и меньше 10 символов").isLength({ min: 4, max: 10 }),
], authController.registration);
router.post("/login", authController.login);
router.get("/users", roleMiddleware(["USER"]), authMiddleware, authController.getUsers);
export default router;
