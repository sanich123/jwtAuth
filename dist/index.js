"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const express = require("express");
const mongoose = require("mongoose");
const router = require("./auth-router.js");
const { MONGO_DB_CONNECTION, Routes } = require("./const.js");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(Routes.auth, router);
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose.connect(MONGO_DB_CONNECTION);
            app.listen(PORT, () => console.log(`server was started at the port ${PORT}`));
        }
        catch (error) {
            console.log(error);
        }
    });
}
;
start();
module.exports = app;
