const { Router } = require("express");

import addNewPayment from "./controller";
const paymentRouter = Router();

paymentRouter.post("/", addNewPayment);

export default paymentRouter;
