"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authgenerator_1 = require("./authgenerator");
exports.default = (req, res, next) => {
    const { token } = req.cookies;
    let userData = token && (0, authgenerator_1.validateToken)(token);
    if (userData) {
        req.currentUser = userData;
        console.log("line 27", userData);
        next();
    }
    else {
        res.status(401).json("You need to be logged in to access this data");
    }
};
