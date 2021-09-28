import { Request, Response } from "express";
import { add } from "date-fns";
import db from "../utils/database";
const { event, agenda } = db;

type BasicEvent = {
  newDate: string;
  cinemaId: number;
  movies: number[];
  showTime: string[];
  quantity: number;
};

type BasicLoopEvent = {
  date: string;
  repeatDigit: number;
  cinemaId: number;
  movies: number[];
  showTime: string[];
  quantity: number;
};
async function basicCreateEvent({
  newDate,
  cinemaId,
  movies,
  showTime,
  quantity,
}: BasicEvent) {
  const newEvent = await event.create({
    data: {
      date: newDate,
      cinemaId,
    },
  });
  for (const movie of movies) {
    for await (const timeSlot of showTime) {
      const modifiedDate = new Date(
        Number(newDate.slice(0, 4)),
        Number(newDate.slice(5, 7)),
        Number(newDate.slice(8, 10)),
        Number(timeSlot.slice(0, 2)),
        Number(timeSlot.slice(3, 5))
      ).toISOString();
      const newAgenda = await agenda.create({
        data: {
          movieId: movie,
          screening: movies.indexOf(movie) + 1,
          showTime: modifiedDate,
          eventId: newEvent.id,
          quantity,
        },
      });
    }
  }
  return true;
}

async function basicLoopCreateEvent({
  date,
  repeatDigit,
  cinemaId,
  movies,
  showTime,
  quantity,
}: BasicLoopEvent) {
  const repeatArray = Array(repeatDigit).fill("");

  const orginaldate = new Date(date);

  for (let i = 0; i < repeatArray.length; i++) {
    let newDate = "";
    let modifiedDate = 0;
    if (i === 0) {
      modifiedDate = orginaldate.setDate(orginaldate.getDate() + 0);
    } else {
      modifiedDate = orginaldate.setDate(orginaldate.getDate() + 1);
    }
    newDate = new Date(modifiedDate).toISOString();

    const result = await basicCreateEvent({
      newDate,
      cinemaId,
      movies,
      showTime,
      quantity,
    });
  }
  return true;
}
async function createNewEvent(req: Request, res: Response) {
  // need create new event with new agenda if there isnt any here
  const { date, cinemaId, movies, showTime, screening, quantity, repeat } =
    req.body;

  try {
    if (repeat !== "none") {
      if (repeat === "one") {
        //library method
        // const result = add(
        //   new Date(
        //     Number(modifiedDate.slice(0, 4)),
        //     Number(modifiedDate.slice(5, 7)),
        //     Number(modifiedDate.slice(8, 10))
        //   ),
        //   {
        //     months: -1,
        //     days: 3,
        //   }
        // );
        const repeatDigit = 7;
        try {
          const result = await basicLoopCreateEvent({
            date,
            repeatDigit,
            cinemaId,
            movies,
            showTime,
            quantity,
          });
          res.json("succeed");
        } catch (error) {
          throw new Error("fail");
        }
      } else if (repeat === "two") {
        const repeatDigit = 14;

        try {
          const result = await basicLoopCreateEvent({
            date,
            repeatDigit,
            cinemaId,
            movies,
            showTime,
            quantity,
          });
          res.json("succeed");
        } catch (error) {
          throw new Error("fail");
        }
      } else {
        const repeatDigit = 30;
        try {
          const result = await basicLoopCreateEvent({
            date,
            repeatDigit,
            cinemaId,
            movies,
            showTime,
            quantity,
          });
          res.json("succeed");
        } catch (error) {
          throw new Error("fail");
        }
      }
    } else {
      const newDate = new Date(date).toISOString();
      try {
        const result = await basicCreateEvent({
          newDate,
          cinemaId,
          movies,
          showTime,
          quantity,
        });
        res.json("succeed");
      } catch (error) {
        throw new Error("fail");
      }
    }
  } catch (error) {
    console.log(error);
    res.json("fail");
  }
}

async function getLastestEvent(req: Request, res: Response) {
  try {
    const lastestEvent = await event.findFirst({
      orderBy: {
        date: "desc",
      },
    });

    res.json(lastestEvent);
  } catch (error) {
    console.log("");
    res.json("");
  }
}

export { createNewEvent, getLastestEvent };
