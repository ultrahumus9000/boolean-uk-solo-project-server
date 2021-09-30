import { User } from ".prisma/client";
import { Request, Response } from "express";
import { stripSecretKey } from "../utils/authgenerator";

const stripe = require("stripe")(stripSecretKey);

function addNewPayment(req: Request, res: Response) {
  const { token, total } = req.body;
  const { email, id } = req.currentUser as User;
  try {
    const idempotentKey = new Date().getTime();
    stripe.customers
      .create({
        email,
        source: token.id,
      })
      .then((customer: any) =>
        stripe.charges.create(
          {
            amount: total * 100,
            currency: "gbp",
            customer: customer.id,
            receipt_email: email,
            description: "film tickets",
          },
          { idempotentKey }
        )
      )
      .then((result: any) => res.status(200).json(result));
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export default addNewPayment;
