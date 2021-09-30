import { Request, Response } from "express";
import db from "../utils/database";
const { movie } = db;

async function fetchAllMoveis(req: Request, res: Response) {
  try {
    const movies = await movie.findMany({
      orderBy: {
        releaseDate: "asc",
      },
      select: {
        id: true,
        title: true,
        overview: true,
        releaseDate: true,
        genre: true,
        poster: true,
      },
    });

    res.json(movies);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function addOneFilm(req: Request, res: Response) {
  const filmData = req.body;
  try {
    const result = await movie.create({
      data: filmData,
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    res.json("fail to add");
  }
}

async function deleteOneFilm(req: Request, res: Response) {
  const movieId = Number(req.params.id);
  try {
    await movie.delete({
      where: {
        id: movieId,
      },
    });
    res.json("succeed deleted");
  } catch (error) {
    console.log(error);
    res.json("fail to delete");
  }
}

export { fetchAllMoveis, addOneFilm, deleteOneFilm };
