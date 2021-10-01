import { User } from ".prisma/client";
import { Request, Response } from "express";
import { stripSecretKey } from "../utils/authgenerator";

const stripe = require("stripe")(stripSecretKey);

async function addNewPayment(req: Request, res: Response) {
  const { token, total } = req.body;
  const { id } = req.currentUser as User;
  const idempotentKey = new Date().getTime();
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const result = await stripe.charges.create({
      amount: total * 100,
      currency: "gbp",
      customer: customer.id,
      receipt_email: token.email,
      description: "film tickets",
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export default addNewPayment;
