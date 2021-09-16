import { NextFunction, Request, Response } from "express";
import { validateToken } from "./authgenerator";
import { JwtPayload } from "jsonwebtoken";

export default (req, res, next) => {
  const { token } = req.cookies;

  let userData = token && validateToken(token);

  if (userData) {
    req.currentUser = userData;
    console.log("line 27", userData);
    next();
  } else {
    res.status(401).json("You need to be logged in to access this data");
  }
};
