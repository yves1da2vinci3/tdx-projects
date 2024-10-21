/*
  Warnings:

  - You are about to drop the `BankDeposit` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WithdrawalCash` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WithdrawalCommodities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `eDeposit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BankDeposit" DROP CONSTRAINT "BankDeposit_userId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawalCash" DROP CONSTRAINT "WithdrawalCash_userId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawalCommodities" DROP CONSTRAINT "WithdrawalCommodities_tickerId_fkey";

-- DropForeignKey
ALTER TABLE "WithdrawalCommodities" DROP CONSTRAINT "WithdrawalCommodities_userId_fkey";

-- DropForeignKey
ALTER TABLE "eDeposit" DROP CONSTRAINT "eDeposit_userId_fkey";

-- DropTable
DROP TABLE "BankDeposit";

-- DropTable
DROP TABLE "WithdrawalCash";

-- DropTable
DROP TABLE "WithdrawalCommodities";

-- DropTable
DROP TABLE "eDeposit";

-- CreateTable
CREATE TABLE "Deposit" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "transactionId" INTEGER,
    "fileUploadUrl" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Deposit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdrawal" (
    "id" SERIAL NOT NULL,
    "type" INTEGER NOT NULL,
    "tickerId" INTEGER,
    "qty" INTEGER,
    "amount" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "withDrawalTo" TEXT,
    "dateToWithdrawal" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Withdrawal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Deposit" ADD CONSTRAINT "Deposit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Withdrawal" ADD CONSTRAINT "Withdrawal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
