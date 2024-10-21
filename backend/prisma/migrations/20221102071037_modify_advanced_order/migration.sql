-- AddForeignKey
ALTER TABLE "AdvancedOrder" ADD CONSTRAINT "AdvancedOrder_tickerId_fkey" FOREIGN KEY ("tickerId") REFERENCES "Ticker"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
