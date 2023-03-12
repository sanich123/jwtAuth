import { verify } from "jsonwebtoken";
import { secret } from "../config.js";
export function authMiddleware(req, res, next) {
    var _a;
    if (req.method === "OPTIONS") {
        next();
    }
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token) {
            return res.status(403).json({ message: "Пользователь не авторизован" });
        }
        const decodedData = verify(token, secret);
        req.user = decodedData;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Пользователь не авторизован" });
    }
}
;
