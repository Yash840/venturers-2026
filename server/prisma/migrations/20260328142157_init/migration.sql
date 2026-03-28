-- CreateEnum
CREATE TYPE "Year" AS ENUM ('First', 'Second', 'Third', 'Fourth');

-- CreateEnum
CREATE TYPE "PassTier" AS ENUM ('Premium', 'Customized');

-- CreateEnum
CREATE TYPE "Permission" AS ENUM ('VIEW', 'MODIFY');

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "institute" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "yearInCourse" "Year" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "passTier" "PassTier" NOT NULL,
    "eventsApplied" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "billingAmount" DOUBLE PRECISION NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "paymentSSLink" TEXT NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "permisssions" "Permission"[] DEFAULT ARRAY['VIEW']::"Permission"[],

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
