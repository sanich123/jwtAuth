import { Router } from "express";
import authController from "./auth-controller.js";
import { check } from "express-validator";
import { authMiddleware } from "./middleware/auth-middleware.js";
import { roleMiddleware } from "./middleware/role-middleware.js";
const router = new Router();
router.post("/registration" /* Routes.registration */, [
    check("username", "\u041F\u043E\u043B\u0435 \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044F \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C" /* Message.emptyField */).notEmpty(),
    check("password", "\u041F\u043E\u043B\u0435 \u043F\u0430\u0440\u043E\u043B\u044F \u0434\u043E\u043B\u0436\u043D\u043E \u0431\u044B\u0442\u044C \u0431\u043E\u043B\u0435\u0435 4 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u0438 \u043C\u0435\u043D\u044C\u0448\u0435 10 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432" /* Message.passwordRequirements */).isLength({ min: 4, max: 10 }),
], authController.registration);
router.post("/login" /* Routes.login */, authController.login);
router.get("/users" /* Routes.users */, roleMiddleware(["USER" /* Roles.user */]), authMiddleware, authController.getUsers);
export default router;
