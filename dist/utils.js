import { secret } from './config';
import jwt from "jsonwebtoken";
export function generateAccessToken(id, roles) {
    return jwt.sign({
        id,
        roles,
    }, secret, { expiresIn: "24h" });
}
