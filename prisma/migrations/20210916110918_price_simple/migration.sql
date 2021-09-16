/*
  Warnings:

  - You are about to drop the column `type` on the `Agenda` table. All the data in the column will be lost.
  - You are about to drop the column `imaxPrice` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price2D` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price3D` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Agenda" DROP COLUMN "type";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "imaxPrice",
DROP COLUMN "price2D",
DROP COLUMN "price3D",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 10;

-- DropEnum
DROP TYPE "Type";
