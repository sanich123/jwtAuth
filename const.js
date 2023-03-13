const MONGO_DB_CONNECTION =
  "mongodb+srv://sanich123:17011987@auth-backend.frds7zt.mongodb.net/?retryWrites=true&w=majority";

const Routes = {
  auth: "/auth",
  registration: "/registration",
  login: "/login",
  users: "/users",
}

const Roles = {
  user: "USER",
  admin: "ADMIN",
}

const Message = {
  emptyField: "Поле пользователя не может быть пустым",
  passwordRequirements: "Поле пароля должно быть более 4 символов и меньше 10 символов",
  wrongPassword: "Введен неправильный пароль",
  registrationError: "Произошла ошибка регистрации пользователя",
  alreadyHaveThisUser: "Пользователь с таким именем уже есть",
  successRegistration: "Пользователь был успешно зарегистрирован",
  isError: "Registration error",
  isLoginError: "Login error",
}

module.exports = {MONGO_DB_CONNECTION, Roles, Message, Routes}