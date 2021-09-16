/*
  Warnings:

  - You are about to drop the column `price` on the `Policy` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "price",
ADD COLUMN     "adultPrice" DOUBLE PRECISION NOT NULL DEFAULT 10.00,
ADD COLUMN     "childPrice" DOUBLE PRECISION NOT NULL DEFAULT 6.00;
