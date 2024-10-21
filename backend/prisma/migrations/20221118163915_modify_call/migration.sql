/*
  Warnings:

  - Added the required column `endTime` to the `Call` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromTime` to the `Call` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Call" ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "fromTime" TEXT NOT NULL;
