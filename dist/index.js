var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from "express";
import mongoose from "mongoose";
import router from "./auth-router.js";
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use("/auth", router);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose.connect("mongodb+srv://sanich123:17011987@auth-backend.frds7zt.mongodb.net/?retryWrites=true&w=majority");
        app.listen(PORT, () => console.log(`server was started at the port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
