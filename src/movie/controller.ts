import { Request, Response } from "express";
import db from "../utils/database";
const { movie } = db;

async function fetchAllMoveis(req: Request, res: Response) {
  try {
    const movies = await movie.findMany({
      select: {
        id: true,
        title: true,
        overview: true,
      },
    });
    res.json(movies);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export { fetchAllMoveis };
