/*
  Warnings:

  - You are about to drop the column `bookingId` on the `Prescription` table. All the data in the column will be lost.
  - Added the required column `appointmentId` to the `Prescription` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Prescription" DROP CONSTRAINT "Prescription_bookingId_fkey";

-- AlterTable
ALTER TABLE "Prescription" DROP COLUMN "bookingId",
ADD COLUMN     "appointmentId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prescription" ADD CONSTRAINT "Prescription_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "Appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
