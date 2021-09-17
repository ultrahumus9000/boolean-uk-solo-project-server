import Stripe from "stripe";
const stripe = new Stripe("payment", {
  apiVersion: "2020-08-27",
  typescript: true,
});

const stripSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT as string;

function createToken(payload: Jwt.JwtPayload) {
  console.log("create token", Jwt.sign(payload, JWT_SECRET));
  return Jwt.sign(payload, JWT_SECRET);
}

function validateToken(token: string) {
  return Jwt.verify(token, JWT_SECRET);
}

export { createToken, validateToken, stripSecretKey, stripePublicKey };
