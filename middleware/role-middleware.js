const { verify } = require("jsonwebtoken");
const { secret } = require("../config.js");

function roleMiddleware(roles) {
  return function (req, res, next) {
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
      const { roles: userRoles } = decoded;
      let hasRole = false;
      userRoles.forEach((role) => {
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

module.exports = roleMiddleware;
