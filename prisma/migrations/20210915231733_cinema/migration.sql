/*
  Warnings:

  - You are about to drop the column `room` on the `Agenda` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `_EventToMovie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cinemaId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `screening` to the `Agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showTime` to the `Agenda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Agenda" DROP CONSTRAINT "Agenda_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "_EventToMovie" DROP CONSTRAINT "_EventToMovie_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToMovie" DROP CONSTRAINT "_EventToMovie_B_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_eventId_fkey";

-- AlterTable
ALTER TABLE "Agenda" DROP COLUMN "room",
ADD COLUMN     "screening" INTEGER NOT NULL,
ADD COLUMN     "showTime" TIME NOT NULL;

-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "eventId";

-- DropTable
DROP TABLE "_EventToMovie";

-- CreateIndex
CREATE UNIQUE INDEX "Event_cinemaId_unique" ON "Event"("cinemaId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
