const { Router } = require("express");

const transactionRouter = Router();

import addTransaction from "./controller";

transactionRouter.post("/", addTransaction);

export default transactionRouter;
