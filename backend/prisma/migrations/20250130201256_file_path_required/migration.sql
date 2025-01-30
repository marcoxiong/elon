/*
  Warnings:

  - Made the column `filePath` on table `Claim` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Claim" ALTER COLUMN "filePath" SET NOT NULL;
