import { Router } from "express";
import { Request, Response, NextFunction, RequestHandler } from 'express';
import authController from "./auth-controller.js";
import { check } from "express-validator";
import { authMiddleware } from "./middleware/auth-middleware.js";
import { roleMiddleware } from "./middleware/role-middleware.js";
import { Message, Roles, Routes } from "./const.js";

const router = new (Router as any)();
router.post(
  Routes.registration,
  [
    check("username", Message.emptyField).notEmpty(),
    check("password", Message.passwordRequirements).isLength({ min: 4, max: 10 }),
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

export default router;
