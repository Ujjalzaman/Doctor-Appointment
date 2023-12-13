/*
  Warnings:

  - A unique constraint covering the columns `[doctorId]` on the table `Favourites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favourites_doctorId_key" ON "Favourites"("doctorId");
