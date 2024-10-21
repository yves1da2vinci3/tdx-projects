/*
  Warnings:

  - You are about to drop the column `orderCategory` on the `SubBasicOrder` table. All the data in the column will be lost.
  - You are about to drop the column `priceTicker` on the `SubBasicOrder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubBasicOrder" DROP COLUMN "orderCategory",
DROP COLUMN "priceTicker";
