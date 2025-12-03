import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import { getAllCampaigns } from "@/lib/api/campaign";
import { getMe } from "@/lib/api/user";

export default function CampaignsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  // Поточний користувач
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  // Всі збори
  const campaignsQuery = useQuery({
    queryKey: ["campaigns"],
    queryFn: getAllCampaigns,
  });

  if (meQuery.isLoading || campaignsQuery.isLoading)
    return <p className="p-10 text-center">Завантаження...</p>;

  if (meQuery.error || campaignsQuery.error)
    return (
      <p className="p-10 text-center text-red-600">Помилка завантаження</p>
    );

  const me = meQuery.data.data;
  const campaigns = campaignsQuery.data.data;

  // ===== ФІЛЬТРАЦІЯ =====
  let list = campaigns.filter((c) => {
    const isMine = c.organizer_id === me.id;
    const iDonated = c.Donation?.some((d) => d.donor_id === me.id);
    const iWon = c.Raffle?.some((r) =>
      r.RaffleWinner?.some((w) => w.user_id === me.id)
    );

    return isMine || iDonated || iWon;
  });

  if (filter === "mine") list = campaigns.filter((c) => c.organizer_id === me.id);

  if (filter === "supported")
    list = campaigns.filter((c) =>
      c.Donation?.some((d) => d.donor_id === me.id)
    );

  if (filter === "closed")
    list = campaigns.filter((c) => c.status === "CLOSED");

  // ===== СОРТУВАННЯ =====
  list = [...list].sort((a, b) => {
    const aClosed = a.status === "CLOSED";
    const bClosed = b.status === "CLOSED";
    return aClosed - bClosed;
  });

  // 🔥 ВИХІД
  const logOut = () => {
    Cookies.remove("jwt");
    navigate("/"); // або /raffles
  };

  return (
    <div className="flex min-h-screen justify-center bg-[#f9f9f9] p-6">
      <div className="w-full max-w-6xl rounded-3xl bg-white p-10 shadow-lg">
        {/* ПРОФІЛЬ */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/golub.webp"
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{me.name}</h2>
              <p className="text-gray-500">
                Баланс: <strong>{me.balance ?? 0}₴</strong>
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={logOut}
              className="rounded-full bg-red-500 px-6 py-3 text-lg font-semibold text-white hover:bg-red-600 transition"
            >
              Вийти
            </button>

            <button
              onClick={() => navigate("/campaign/new")}
              className="rounded-full bg-black px-6 py-3 text-lg font-semibold text-white"
            >
              + Нова банка
            </button>
          </div>
        </div>

        {/* Вкладки */}
        <h2 className="mb-4 text-3xl font-bold">Усі збори</h2>
        <div className="mb-8 flex flex-wrap gap-3">
          {[
            ["all", "Усі"],
            ["mine", "Мої збори"],
            ["supported", "Підтримані збори"],
            ["closed", "Мої закриті збори"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-full ${
                filter === key ? "bg-black text-white" : "bg-gray-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* СПИСОК */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c) => {
            const progress =
              ((c.collected_amount ?? 0) / (c.target_amount || 1)) * 100;

            const isClosed = c.status === "CLOSED";
            const myBank = c.organizer_id === me.id;

            const borderColor = myBank
              ? "border-blue-400"
              : isClosed
              ? "border-green-400"
              : "border-orange-400";

            const goToCampaign = () => {
              // 🔥 якщо закритий і вже є winner_id — одразу на сторінку переможця
              if (isClosed && c.winner_id) {
                navigate(`/campaigns/${c.id}/winner`);
              } else {
                navigate(`/campaign/${c.id}`);
              }
            };

            return (
              <div
                key={c.id}
                onClick={goToCampaign}
                className={`cursor-pointer rounded-2xl border-2 ${borderColor} p-5 hover:shadow-xl transition relative bg-white`}
              >
                <h3 className="text-lg font-bold mb-1">{c.title}</h3>

                <p className="text-sm text-gray-600">
                  {c.collected_amount}₴ / {c.target_amount ?? 0}₴
                </p>

                <div className="my-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      isClosed ? "bg-green-500" : "bg-orange-400"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {myBank ? "Ви" : c.user?.name}
                </p>

                {isClosed && (
                  <p className="absolute right-4 bottom-4 text-sm font-semibold text-gray-600">
                    Завершений
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
