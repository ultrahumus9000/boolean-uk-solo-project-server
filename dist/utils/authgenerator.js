"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripePublicKey = exports.stripSecretKey = exports.validateToken = exports.createToken = void 0;
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default("payment", {
    apiVersion: "2020-08-27",
    typescript: true,
});
const stripSecretKey = process.env.STRIPE_SECRET_KEY;
exports.stripSecretKey = stripSecretKey;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;
exports.stripePublicKey = stripePublicKey;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT;
function createToken(payload) {
    console.log("create token", jsonwebtoken_1.default.sign(payload, JWT_SECRET));
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET);
}
exports.createToken = createToken;
function validateToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
exports.validateToken = validateToken;
