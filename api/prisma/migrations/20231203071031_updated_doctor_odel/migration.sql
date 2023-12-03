/*
  Warnings:

  - You are about to drop the column `middleName` on the `Doctor` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "middleName",
ADD COLUMN     "award" TEXT,
ADD COLUMN     "biography" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "clinicAddress" TEXT,
ADD COLUMN     "clinicImages" TEXT,
ADD COLUMN     "clinicName" TEXT,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "completionYear" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "dob" TEXT,
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "price" TEXT,
ADD COLUMN     "registration" TEXT,
ADD COLUMN     "services" TEXT,
ADD COLUMN     "specialization" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "year" TEXT;
