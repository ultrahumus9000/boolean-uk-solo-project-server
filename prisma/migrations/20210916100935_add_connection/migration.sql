/*
  Warnings:

  - You are about to drop the column `showRoom` on the `Cinema` table. All the data in the column will be lost.
  - You are about to drop the column `eventId` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agendaId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_transactionId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_cinemaId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropIndex
DROP INDEX "Event_cinemaId_unique";

-- AlterTable
ALTER TABLE "Agenda" ADD COLUMN     "type" "Type" NOT NULL DEFAULT E'D2';

-- AlterTable
ALTER TABLE "Cinema" DROP COLUMN "showRoom",
ADD COLUMN     "screening" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "date" DATE NOT NULL;

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "eventId";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "date",
DROP COLUMN "userId",
ADD COLUMN     "agendaId" INTEGER NOT NULL,
ADD COLUMN     "guestId" INTEGER NOT NULL,
ADD COLUMN     "orderTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Order";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_guestId_fkey" FOREIGN KEY ("guestId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "Agenda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "Cinema"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
