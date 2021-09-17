"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = (0, express_1.default)();
/* SETUP MIDDLEWARE */
app.disable("x-powered-by");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// app.use(express.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
app.use((0, morgan_1.default)("dev"));
/* SETUP ROUTES */
// app.use(middleware);
// const fetch = require("node-fetch");
let rawMoviesData = [];
app.get("*", (req, res) => {
    (0, node_fetch_1.default)("https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=1")
        .then((resp) => resp.json())
        .then((movies) => {
        // rawMoviesData = movies;
        console.log("rawMoviesData", movies);
        res.json({ ok: true });
    });
});
/* START SERVER */
// console.log(stripSecretKey, stripePublicKey);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
