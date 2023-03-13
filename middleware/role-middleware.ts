import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { secret } from "../config.js";

interface ITokenPayload {
  roles: string[];
}
export function roleMiddleware(roles: string[]) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
    try {
      const [, token] = authHeader.split(" ");
      const decoded = verify(token, secret);
      const { roles: userRoles } = decoded as ITokenPayload;
      let hasRole = false;
      userRoles.forEach((role: string) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" });
      }
      next();
    } catch (error) {
      console.log(error);
      return res.status(403).json({ message: "Пользователь не авторизован" });
    }
  };
}
