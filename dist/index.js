"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const middleware_1 = __importDefault(require("./utils/middleware"));
const router_1 = __importDefault(require("./auth/router"));
const router_2 = __importDefault(require("./movie/router"));
const router_3 = __importDefault(require("./user/router"));
const router_4 = __importDefault(require("./event/router"));
const router_5 = __importDefault(require("./cinema/router"));
const router_6 = __importDefault(require("./policy/router"));
const router_7 = __importDefault(require("./public/router"));
const router_8 = __importDefault(require("./transaction/router"));
const router_9 = __importDefault(require("./payment/router"));
// import fetch from "node-fetch";
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();
app.enable("trust proxy");
//node-fetch not work due to package.json
//middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.disable("x-powered-by");
// app.use(express.urlencoded({ extended: true }));
/* SETUP ROUTES */
app.use(router_1.default);
app.use("/user", router_3.default);
app.use("/public", router_7.default);
/* SETUP MIDDLEWARE */
app.use(middleware_1.default);
app.use("/events", router_4.default);
app.use("/cinema", router_5.default);
app.use("/policy", router_6.default);
app.use("/movies", router_2.default);
app.use("/transactions", router_8.default);
app.use("/charges", router_9.default);
app.get("*", (req, res) => {
    res.status(404).json({ msg: "No route is matching your request.." });
});
// app.get("*", (req: Request, res: Response) => {
//   fetch(
//     "https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=1"
//   )
//     .then((resp) => resp.json())
//     .then((movies) => {
//       console.log(movies);
//       res.json(movies);
//     });
// });
/* START SERVER */
// console.log(stripSecretKey, stripePublicKey);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
