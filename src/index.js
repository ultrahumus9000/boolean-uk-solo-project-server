require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const middleware = require("./utils/middleware");
const cookieParser = require("cookie-parser");
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

app.get("*", (req, res) => {
  res.json({ ok: true });
});

/* START SERVER */

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`);
});
