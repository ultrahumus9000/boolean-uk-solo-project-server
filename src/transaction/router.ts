const { Router } = require("express");

const transactionRouter = Router();

import { addTransaction, getRevenue } from "./controller";

transactionRouter.get("/revenue", getRevenue);
transactionRouter.post("/", addTransaction);

export default transactionRouter;
