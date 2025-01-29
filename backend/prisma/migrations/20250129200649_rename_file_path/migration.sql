/*
  Warnings:

  - You are about to drop the column `receiptPath` on the `Claim` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "receiptPath",
ADD COLUMN     "filePath" TEXT;
