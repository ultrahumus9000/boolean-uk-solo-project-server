const faker = require("faker");

const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

const { movie, cinema, user, policy } = db;

const renderArray = Array(6).fill("");

// const fetch = require("node-fetch");

// const rawMoviesData = [];

// const defaultPassword = "test";

// async function fetchMovies() {
//   await fetch(
//     "https://api.themoviedb.org/3/movie/popular?api_key=d214ecb9bda367118385bcbdb9cd776f&language=en-US&page=1"
//   )
//     .then((resp) => resp.json)
//     .then((movies) => {
//       rawMoviesData = movies;
//       console.log("rawMoviesData", rawMoviesData);
//     });
// }

// id           Int           @id @default(autoincrement())
// staff        User[]
// location     String
// capacity     Int           @default(60)
// screening    Int           @default(5)
// events       Event[]
// transactions Transaction[]

// id           Int           @id @default(autoincrement())
// adultPrice   Float         @default(10.00)
// childPrice   Float         @default(6.00)
// discount     Int           @default(10)
// condition    Int           @default(4)
// transactions Transaction[]

// id           Int           @id @default(autoincrement())
// username     String        @unique
// password     String
// firstName    String
// lastName     String
// email        String
// role         Role          @default(Guest)
// avatar       String
// cinema       Cinema?       @relation(fields: [cinemaId], references: [id], onDelete: Cascade)
// cinemaId     Int?
// transactions Transaction[]

async function seed() {
  // await fetchMovies();
  // console.log("rawMoviesData", rawMoviesData);

  const cinemaResult = await cinema.create({
    data: {
      location: "Sheffield",
    },
  });

  const policyResult = await policy.create({
    data: {},
  });

  let data = [];
  for (const ele of renderArray) {
    const newUser = {
      username: faker.internet.userName(),
      password: defaultPassword,
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      role: "Admin",
      avatar: faker.internet.avatar(),
      cinemaId: cinemaResult.id,
    };
    data.push(newUser);
  }

  const userResult = await user.createMany({
    data,
  });

  console.log(cinemaResult, policyResult, data);
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
