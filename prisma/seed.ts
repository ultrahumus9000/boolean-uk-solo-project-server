import { PrismaClient } from "@prisma/client";
import * as faker from "faker";
import { hash } from "bcrypt";

import fetch from "node-fetch";

const db = new PrismaClient();
const { movie, cinema, user, policy } = db;

const renderArray = Array(6).fill("");

const defaultPassword = "test";

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

// https://image.tmdb.org/t/p/w300/gzppdxEJ6fofhtLzSVSUJZEVxvq.jpg

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

  for (const ele of renderArray) {
    const hashedPasseword = await hash(defaultPassword, 10);

    const userResult = await user.create({
      data: {
        username: faker.internet.userName(),
        password: hashedPasseword,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        role: "Admin",
        avatar: faker.internet.avatar(),
        cinemaId: cinemaResult.id,
      },
    });

    console.log(userResult);
  }

  console.log(cinemaResult, policyResult);
}

seed()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await db.$disconnect();
  });
