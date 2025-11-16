import prisma from "../utils/prisma.js";

class RaffleRunService {
    async runRaffle(raffleId) {
        const raffle = await prisma.raffle.findUnique(
            {
                where: { id: raffleId }
            });

        if (!raffle) throw new Error("Raffle not found");
        const { raffle_type, campaign_id, winner_count } = raffle;
        const donations = await prisma.donation.findMany(
            {
                where: { campaign_id },
                include: { user: true }
            });

        if (donations.length === 0)
            throw new Error("No donations to this campaign");
        let winners = [];

        if (raffle_type === "ALL") {
            winners = this.pickAll(donations, winner_count);
        } else if (raffle_type === "MULTIPLE") {
            winners = this.pickMultiple(donations, winner_count);
        } else if (raffle_type === "TOP") {
            winners = this.pickTop(donations, winner_count);
        }

        await prisma.raffleWinner.createMany
            ({
                data: winners.map(w => ({
                    raffle_id: raffleId,
                    user_id: w.user.id
                }))
            });

        for (const win of winners) {
            await prisma.notification.create({
                data: {
                    user_id: win.user.id,
                    message: `Ви перемогли!`,
                    status: "PENDING"
                }
            });
        }

        await prisma.raffle.update(
            {
                where: { id: raffleId },
                data: { status: "COMPLETED" }
            });

        return winners;
    }

    // Однаковий шанс для всіх
    pickAll(donations, count) {
        const shuffled = [...donations].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }

    // Шанс скейлиться з величиною донату
    pickMultiple(donations, count) {
        const pool = [];

        for (const d of donations) {
            const multiplier = Math.max(1, Math.floor(d.amount / 50));
            for (let i = 0; i < multiplier; i++) {
                pool.push(d);
            }
        }

        const selected = [];
        for (let i = 0; i < count && pool.length > 0; i++) {
            const idx = Math.floor(Math.random() * pool.length);
            selected.push(pool[idx]);
            pool.splice(idx, 1);
        }

        return selected;
    }

    // Топ донати
    pickTop(donations, count) {
        return donations
            .sort((a, b) => b.amount - a.amount)
            .slice(0, count);
    }
}

export default new RaffleRunService();
