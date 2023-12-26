/*
  Warnings:

  - A unique constraint covering the columns `[day]` on the table `DoctorTimeSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DoctorTimeSlot_day_key" ON "DoctorTimeSlot"("day");
