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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const router_1 = __importDefault(require("./auth/router"));
const router_2 = __importDefault(require("./movie/router"));
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
app.enable("trust proxy");
//node-fetch not work due to package.json
// app.get("*", (req, res) => {
//   // res.status(404).json({ msg: "No route is matching your request.." });
//   fetch(
//     "https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=1"
//   )
//     .then((resp) => resp.json())
//     .then((movies) => {
//       console.log(movies);
//       res.json(movies);
//     });
// });
//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.disable("x-powered-by");
// app.use(express.urlencoded({ extended: true }));
/* SETUP ROUTES */
app.use(router_1.default);
app.use("/", router_2.default);
/* SETUP MIDDLEWARE */
// app.use(middleware);
app.post("/temp", (req, res) => {
    const movies = req.body.movies;
    movies.forEach(function (movie) {
        return __awaiter(this, void 0, void 0, function* () { });
    });
});
app.get("*", (req, res) => {
    res.json("i am here");
});
/* START SERVER */
// console.log(stripSecretKey, stripePublicKey);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
