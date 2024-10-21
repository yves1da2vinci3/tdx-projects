/*
  Warnings:

  - You are about to drop the column `fee` on the `AdvancedOrder` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `AdvancedOrder` table. All the data in the column will be lost.
  - You are about to drop the column `fee` on the `advancedSubOrder` table. All the data in the column will be lost.
  - Added the required column `season` to the `AdvancedOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdvancedOrder" DROP CONSTRAINT "AdvancedOrder_userId_fkey";

-- AlterTable
ALTER TABLE "AdvancedOrder" DROP COLUMN "fee",
DROP COLUMN "seasonId",
ADD COLUMN     "season" INTEGER NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "orderValidity" SET DEFAULT 2,
ALTER COLUMN "fillType" DROP NOT NULL,
ALTER COLUMN "orderCategory" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Withdrawal" ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "advancedSubOrder" DROP COLUMN "fee";

-- CreateTable
CREATE TABLE "Fee" (
    "id" SERIAL NOT NULL,
    "rattachedOrderId" INTEGER NOT NULL,
    "Grading" INTEGER NOT NULL,
    "Weighing" INTEGER NOT NULL,
    "rattachedType" INTEGER NOT NULL DEFAULT 1,
    "centralDepository" INTEGER NOT NULL,
    "moistureLoss" INTEGER NOT NULL,
    "receiptingFee" INTEGER NOT NULL,
    "Storage" INTEGER NOT NULL,
    "Handling" INTEGER NOT NULL,
    "brokerCommission" INTEGER NOT NULL,
    "tradingFee" INTEGER NOT NULL,
    "regulatoryFee" INTEGER NOT NULL,
    "Drying" INTEGER NOT NULL DEFAULT 0,
    "Cleaning" INTEGER NOT NULL DEFAULT 0,
    "reBagging" INTEGER NOT NULL DEFAULT 0,
    "fumigation" INTEGER NOT NULL DEFAULT 0,
    "documentLink" TEXT,

    CONSTRAINT "Fee_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdvancedOrder" ADD CONSTRAINT "AdvancedOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
