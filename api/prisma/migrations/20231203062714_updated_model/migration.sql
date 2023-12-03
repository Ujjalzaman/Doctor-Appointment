-- CreateEnum
CREATE TYPE "PaidType" AS ENUM ('online', 'cash');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('accept', 'cancel');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paidtype" "PaidType",
ADD COLUMN     "purpose" TEXT,
ADD COLUMN     "status" "AppointmentStatus";

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "dateOfBirth" TEXT,
ADD COLUMN     "mobile" TEXT,
ADD COLUMN     "state" TEXT,
ADD COLUMN     "zipCode" TEXT;
