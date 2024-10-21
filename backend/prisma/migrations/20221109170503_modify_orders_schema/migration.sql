/*
  Warnings:

  - You are about to drop the column `commoditTypeId` on the `BasicOrder` table. All the data in the column will be lost.
  - You are about to drop the `SubBasicOrder` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `commodityTypeId` to the `BasicOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `advancedSubOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `advancedSubOrder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BasicOrder" DROP CONSTRAINT "BasicOrder_commoditTypeId_fkey";

-- DropForeignKey
ALTER TABLE "SubBasicOrder" DROP CONSTRAINT "SubBasicOrder_orderId_fkey";

-- DropForeignKey
ALTER TABLE "SubBasicOrder" DROP CONSTRAINT "SubBasicOrder_tickerId_fkey";

-- AlterTable
ALTER TABLE "AdvancedOrder" ADD COLUMN     "basicOrderId" INTEGER,
ADD COLUMN     "completedDate" TIMESTAMP(3),
ADD COLUMN     "fee" INTEGER,
ADD COLUMN     "isAttached" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "BasicOrder" DROP COLUMN "commoditTypeId",
ADD COLUMN     "commodityTypeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "advancedSubOrder" ADD COLUMN     "completedDate" TIMESTAMP(3),
ADD COLUMN     "fee" INTEGER,
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "status" SMALLINT NOT NULL;

-- DropTable
DROP TABLE "SubBasicOrder";

-- CreateTable
CREATE TABLE "AdminNotification" (
    "id" SERIAL NOT NULL,
    "notificationStatus" BOOLEAN NOT NULL DEFAULT false,
    "type" INTEGER NOT NULL,
    "notificationContent" TEXT NOT NULL,
    "parentId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BasicOrder" ADD CONSTRAINT "BasicOrder_commodityTypeId_fkey" FOREIGN KEY ("commodityTypeId") REFERENCES "commodityType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdvancedOrder" ADD CONSTRAINT "AdvancedOrder_basicOrderId_fkey" FOREIGN KEY ("basicOrderId") REFERENCES "BasicOrder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
