-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "winner_id" UUID;

-- AddForeignKey
ALTER TABLE "Campaign" ADD CONSTRAINT "Campaign_winner_id_fkey" FOREIGN KEY ("winner_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
