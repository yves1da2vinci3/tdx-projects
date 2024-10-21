/*
  Warnings:

  - You are about to drop the column `category` on the `AdvancedOrder` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `AdvancedOrder` table. All the data in the column will be lost.
  - You are about to drop the column `orderType` on the `BasicOrder` table. All the data in the column will be lost.
  - Added the required column `orderCategory` to the `AdvancedOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderCategory` to the `BasicOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdvancedOrder" DROP COLUMN "category",
DROP COLUMN "type",
ADD COLUMN     "orderCategory" SMALLINT NOT NULL;

-- AlterTable
ALTER TABLE "BasicOrder" DROP COLUMN "orderType",
ADD COLUMN     "orderCategory" SMALLINT NOT NULL;
