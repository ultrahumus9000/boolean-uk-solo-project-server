require("dotenv").config();

import morgan from "morgan";
import middleware from "./utils/middleware";
import { Response, Request } from "express";
import authRouter from "./auth/router";
import movieRouter from "./movie/router";
const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const app = express();

app.enable("trust proxy");

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
app.use("/", movieRouter);

/* SETUP MIDDLEWARE */
// app.use(middleware);

app.get("*", (req: Request, res: Response) => {
  res.json("i am here");
});

/* START SERVER */

// console.log(stripSecretKey, stripePublicKey);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
