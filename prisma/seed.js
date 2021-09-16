const faker = require("faker");

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const { movie, cinema, user, policy } = db;

const fetch = require("node-fetch");

const rawMoviesData = [];

async function fetchMovies() {
  await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=1"
  )
    .then((resp) => resp.json)
    .then((movies) => {
      rawMoviesData = movies;
      console.log("rawMoviesData", rawMoviesData);
    });
}

async function seed() {
  await fetchMovies();
  console.log("rawMoviesData", rawMoviesData);
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
