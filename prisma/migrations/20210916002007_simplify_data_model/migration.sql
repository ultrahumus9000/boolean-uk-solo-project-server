/*
  Warnings:

  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('D2', 'D3', 'IMAX');

-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "duration" SET DEFAULT E'100 mins';

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "type" "Type" NOT NULL;
