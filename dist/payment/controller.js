"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authgenerator_1 = require("../utils/authgenerator");
const stripe = require("stripe")(authgenerator_1.stripSecretKey);
function addNewPayment(req, res) {
    const { token, total } = req.body;
    const { email, id } = req.currentUser;
    try {
        const idempotentKey = new Date().getTime();
        stripe.customers
            .create({
            email: token.email,
            source: token.id,
        })
            .then((customer) => stripe.charges.create({
            amount: total * 100,
            currency: "gbp",
            customer: customer.id,
            receipt_email: email,
            description: "film tickets",
        }, { idempotentKey }))
            .then((result) => res.status(200).json(result));
    }
    catch (error) {
        console.log(error);
        res.json(error);
    }
}
exports.default = addNewPayment;
