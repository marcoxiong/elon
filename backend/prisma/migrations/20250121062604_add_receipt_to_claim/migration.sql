/*
  Warnings:

  - Added the required column `transactionDate` to the `Claim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "description" TEXT,
ADD COLUMN     "receiptPath" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL;
