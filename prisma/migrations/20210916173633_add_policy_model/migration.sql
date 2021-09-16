/*
  Warnings:

  - You are about to drop the column `condition` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Event` table. All the data in the column will be lost.
  - Added the required column `policyId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "condition",
DROP COLUMN "discount",
DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "policyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Policy" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 10,
    "discount" INTEGER NOT NULL DEFAULT 10,
    "condition" INTEGER NOT NULL DEFAULT 4,

    CONSTRAINT "Policy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "Policy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
