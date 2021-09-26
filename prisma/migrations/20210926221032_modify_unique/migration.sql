/*
  Warnings:

  - A unique constraint covering the columns `[movieId,showTime]` on the table `Agenda` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Agenda_movieId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Agenda_movieId_showTime_key" ON "Agenda"("movieId", "showTime");
