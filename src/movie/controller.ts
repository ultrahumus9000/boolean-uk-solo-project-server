import { Request, Response } from "express";
import db from "../utils/database";
import fetch from "node-fetch";

function originalFetchAllMoveis(req: Request, res: Response) {
  fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=1"
  )
    .then((resp: any) => resp.json())
    .then((movies: any) => {
      console.log("rawMoviesData", movies);
      res.json(movies);
    });
}

export { originalFetchAllMoveis };
