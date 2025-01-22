/*
  Warnings:

  - The `status` column on the `Claim` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `categoryId` to the `Claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategoryId` to the `Claim` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Claim` required. This step will fail if there are existing NULL values in that column.
  - Made the column `receiptPath` on table `Claim` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "ClaimStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Claim" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "subcategoryId" TEXT NOT NULL,
ALTER COLUMN "createdAt" DROP NOT NULL,
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "receiptPath" SET NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ClaimStatus" NOT NULL DEFAULT 'PENDING';
