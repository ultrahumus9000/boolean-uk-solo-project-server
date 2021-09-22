import { Request, Response } from "express";
import db from "../utils/database";
const { cinema } = db;

async function getCinemaInfo(req: Request, res: Response) {
  try {
    const cinemaInfo = await cinema.findUnique({
      where: {
        id: 1,
      },
    });
    res.json(cinemaInfo);
  } catch (error) {
    res.json(error);
  }
}

export { getCinemaInfo };
