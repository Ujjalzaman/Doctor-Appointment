/*
  Warnings:

  - The `dateOfBirth` column on the `Patient` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "gender" TEXT,
DROP COLUMN "dateOfBirth",
ADD COLUMN     "dateOfBirth" TIMESTAMP(3);
