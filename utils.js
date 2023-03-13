import { secret } from "./config";
import jwt from "jsonwebtoken";

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

module.exports = { generateAccessToken };
