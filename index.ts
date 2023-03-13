import express from "express";
import mongoose from "mongoose";
import router from "./auth-router.js";
import { MONGO_DB_CONNECTION, Routes } from "./const.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(Routes.auth, router);

(async () => {
  try {
    await mongoose.connect(MONGO_DB_CONNECTION);
    app.listen(PORT, () =>
      console.log(`server was started at the port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
})();
