/*
  Warnings:

  - The `isRecommended` column on the `Reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Reviews" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "star" DROP NOT NULL,
ALTER COLUMN "star" SET DATA TYPE TEXT,
DROP COLUMN "isRecommended",
ADD COLUMN     "isRecommended" BOOLEAN;
