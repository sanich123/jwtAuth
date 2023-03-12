const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./auth-router.js");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sanich123:17011987@auth-backend.frds7zt.mongodb.net/?retryWrites=true&w=majority"
    );
    app.listen(PORT, () =>
      console.log(`server was started at the port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
