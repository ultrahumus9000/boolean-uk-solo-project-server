/*
  Warnings:

  - A unique constraint covering the columns `[movieId]` on the table `Agenda` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Agenda_movieId_key" ON "Agenda"("movieId");
