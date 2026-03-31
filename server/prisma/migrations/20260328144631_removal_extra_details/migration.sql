/*
  Warnings:

  - You are about to drop the column `specialization` on the `Participant` table. All the data in the column will be lost.
  - You are about to drop the column `yearInCourse` on the `Participant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "specialization",
DROP COLUMN "yearInCourse";
