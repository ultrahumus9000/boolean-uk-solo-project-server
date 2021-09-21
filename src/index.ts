require("dotenv").config();
import morgan from "morgan";
import middleware from "./utils/middleware";
import { Response, Request } from "express";
import authRouter from "./auth/router";
import movieRouter from "./movie/router";
import userRouter from "./user/router";
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
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.disable("x-powered-by");

// app.use(express.urlencoded({ extended: true }));

/* SETUP ROUTES */
app.use(authRouter);
app.use("/movies", movieRouter);
app.use("/user", userRouter);

/* SETUP MIDDLEWARE */

app.use(middleware);

app.get("*", (req: Request, res: Response) => {
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
