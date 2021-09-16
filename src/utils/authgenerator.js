const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const JWT_SECRET = process.env.JWT;
const stripKey = process.env.STRIPE_KEY;

console.log("stripe", stripKey);

function createToken(payload) {
  return jwt.sign(payload, JWT_SECRET);
}

function validateToken(token) {
  console.log("line 12 jwt", JWT_SECRET);
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { createToken, validateToken, stripKey };
