const express = require("express");
const mongoose = require("mongoose");
const router = require("./auth-router.js");
const { MONGO_DB_CONNECTION, Routes } = require("./const.js");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello world')
})
// app.use(Routes.auth, router);
app.listen(PORT, () => {
  console.log(`Server was working in the ${PORT}`)
})

// const start = async () => {
//   try {
//     await mongoose.connect(MONGO_DB_CONNECTION);
//     app.listen(PORT, () =>
//       console.log(`server was started at the port ${PORT}`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// start();

module.exports = app;

