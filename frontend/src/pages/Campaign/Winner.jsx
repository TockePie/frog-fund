import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCampaignById } from "@/lib/api/campaign";

import avatarImage from "/golub.webp";

export default function WinnerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignById(id),
  });

  if (isLoading)
    return <p className="p-10 text-center text-xl">Завантаження...</p>;

  if (error)
    return (
      <p className="p-10 text-center text-xl text-red-600">
        Помилка: {error.message}
      </p>
    );

  const campaign = data.data;
  const winnerName =
    campaign.winner?.name ||
    campaign.Raffle?.[0]?.RaffleWinner?.[0]?.user?.name ||
    "Переможець не знайдений";

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-8 flex flex-col items-center">
      <div className="w-full max-w-6xl rounded-3xl bg-white shadow-2xl flex overflow-hidden">
        {/* Ліва частина — банка */}
        <div className="w-1/2 bg-gradient-to-b from-[#f8d0c1] to-[#f4e6df] p-12 flex flex-col items-center text-center">
          <button
            onClick={() => navigate("/campaigns")}
            className="self-start mb-4 text-lg font-semibold text-white drop-shadow"
          >
            ← Назад
          </button>

          <img
            src={avatarImage}
            className="h-48 w-48 rounded-full border-4 border-white shadow-xl mb-6"
          />

          <p className="text-lg text-gray-700 font-medium mb-2">
            {campaign.user?.name ?? "Користувач"} збирає на
          </p>

          <h1 className="text-4xl font-black text-gray-900 mb-8">
            {campaign.title}
          </h1>

          <div className="w-full">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1fd35a]"
                style={{
                  width: `${
                    (campaign.collected_amount / (campaign.target_amount || 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="mt-3 flex justify-between text-lg font-semibold">
              <span>{campaign.collected_amount}₴</span>
            </div>
          </div>
        </div>

        {/* Права частина — переможець */}
        <div className="w-1/2 bg-white p-12 flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-black mb-4">
            Збір завершено
            <br />
            вітаємо переможців розіграшу!
          </h2>

          <div className="text-4xl mb-4">👑</div>

          <p className="text-2xl font-semibold mb-8">{winnerName}</p>

          <button className="rounded-2xl bg-[#f1f1f1] px-10 py-4 text-lg font-semibold shadow">
            Інформація
          </button>

          <p className="mt-6 text-sm text-gray-500 max-w-xs">
            Повідомлення про приз вже надіслано до особистого кабінету
            переможця
          </p>
        </div>
      </div>
    </div>
  );
}
