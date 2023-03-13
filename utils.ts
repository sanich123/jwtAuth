import { Types } from "mongoose";
import {secret} from './config';
import jwt from "jsonwebtoken";

export function generateAccessToken(id: Types.ObjectId, roles: string[]) {
  return jwt.sign(
    {
      id,
      roles,
    },
    secret,
    { expiresIn: "24h" }
  );
}
