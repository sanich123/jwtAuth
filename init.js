const express = require("express");
const mongoose = require("mongoose");
const { router } = require("./auth-router.js");
const { MONGO_DB_CONNECTION, Routes } = require("./const.js");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(Routes.auth, router);

async function start() {
  try {
    await mongoose.connect(MONGO_DB_CONNECTION);
    app.listen(PORT, () =>
      console.log(`server was started at the port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = { start, app };
