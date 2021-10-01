"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const authgenerator_1 = require("../utils/authgenerator");
const stripe = require("stripe")(authgenerator_1.stripSecretKey);
function addNewPayment(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token, total } = req.body;
        const { id } = req.currentUser;
        const idempotentKey = new Date().getTime();
        try {
            const customer = yield stripe.customers.create({
                email: token.email,
                source: token.id,
            });
            const result = yield stripe.charges.create({
                amount: total * 100,
                currency: "gbp",
                customer: customer.id,
                receipt_email: token.email,
                description: "film tickets",
            });
            console.log("stripe result", result);
            res.status(200).json(result);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.default = addNewPayment;
