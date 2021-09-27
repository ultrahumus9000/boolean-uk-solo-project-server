import { Request, Response } from "express";
import { date } from "faker";
import db from "../utils/database";
const { event, agenda, movie } = db;

async function getPublicEvent(req: Request, res: Response) {
  const today = new Date();
  try {
    const eventId = await event.findUnique({
      where: {
        date: today,
      },
      select: {
        id: true,
      },
    });
    if (!eventId) {
      return null;
    }
    const todayEventId = eventId.id;

    const rawMovieIds = await agenda.groupBy({
      by: ["movieId"],
      where: {
        eventId: todayEventId,
      },
    });

    let movieInfos: any[] = [];
    for await (const ele of rawMovieIds) {
      const movieInfo = await movie.findUnique({
        where: {
          id: ele.movieId,
        },
        include: {
          agendas: true,
        },
      });

      const agendaForToday = movieInfo?.agendas.filter(
        (agenda) => agenda.eventId === todayEventId
      );

      if (!agendaForToday) {
        return null;
      }

      const modifiedMovieInfo = { ...movieInfo, agendas: agendaForToday };

      movieInfos.push(modifiedMovieInfo);
    }

    res.json(movieInfos);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export { getPublicEvent };

// const rawEvents = await event.findUnique({
//     where: {
//       date: today,
//     },
//     select: {
//       date: true,
//       id: true,
//       agendas: {
//         select: {
//           movie: true,
//           showTime: true,
//           screening: true,
//           quantity: true,
//           movieId: true,
//         },
//       },
//     },
//   });
