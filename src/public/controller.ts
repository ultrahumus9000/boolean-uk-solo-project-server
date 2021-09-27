import { Request, Response } from "express";
import db from "../utils/database";
const { event } = db;

async function getPublicEvent(req: Request, res: Response) {
  try {
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export { getPublicEvent };
