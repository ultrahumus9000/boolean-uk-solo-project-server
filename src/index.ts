require("dotenv").config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import middleware from "./utils/middleware";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";
import { stripSecretKey, stripePublicKey } from "./utils/authgenerator";
const app = express();

/* SETUP MIDDLEWARE */

app.disable("x-powered-by");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(morgan("dev"));

/* SETUP ROUTES */

// app.use(middleware);

let rawMoviesData = [];

app.get("*", (req, res) => {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=1"
  )
    .then((resp: any) => resp.json())
    .then((movies: any) => {
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
