/*
  Warnings:

  - You are about to drop the column `permisssions` on the `Admin` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Permission" ADD VALUE 'SHARE_ACCESS';

-- AlterTable
ALTER TABLE "Admin" DROP COLUMN "permisssions",
ADD COLUMN     "isApproved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "permissions" "Permission"[] DEFAULT ARRAY['VIEW']::"Permission"[];
