import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import NotificationBell from "@/components/NotificationBell";
import { getAllCampaigns } from "@/lib/api/campaign";
import { getNotifications } from "@/lib/api/notifications";
import { getMe } from "@/lib/api/user";

export default function CampaignsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  // Поточний користувач
  const meQuery = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe().then((res) => res.data),
  });

  // Банки
  const campaignsQuery = useQuery({
    queryKey: ["campaigns"],
    queryFn: () => getAllCampaigns().then((res) => res.data),
  });

  // Сповіщення (єдиний запит на notifications)
  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications().then((res) => res.data),
  });

  if (
    meQuery.isLoading ||
    campaignsQuery.isLoading ||
    notificationsQuery.isLoading
  ) {
    return <p className="p-10 text-center">Завантаження...</p>;
  }

  const me = meQuery.data;
  const campaigns = campaignsQuery.data;
  const notifications = notificationsQuery.data ?? [];

  // Переможні кампанії (за нотифікаціями)
  const winnerCampaigns = new Set(
    notifications
      .filter((n) => n.status === "PENDING" && n.campaign_id)
      .map((n) => n.campaign_id)
  );

  // ========= ФІЛЬТРИ =========
  let list = [];

  if (filter === "all") {
    list = campaigns.filter((c) => {
      const mine = c.organizer_id === me.id;
      const supported = c.Donation?.some((d) => d.donor_id === me.id);
      const won = winnerCampaigns.has(c.id);
      return mine || supported || won;
    });
  }

  if (filter === "mine") {
    list = campaigns.filter((c) => c.organizer_id === me.id);
  }

  if (filter === "supported") {
    list = campaigns.filter((c) =>
      c.Donation?.some((d) => d.donor_id === me.id)
    );
  }

  if (filter === "closed") {
    list = campaigns.filter(
      (c) => c.organizer_id === me.id && c.status === "CLOSED"
    );
  }

  // ========= ВИХІД =========
  const logOut = () => {
    Cookies.remove("jwt");
    navigate("/");
  };

  // ========= РЕНДЕР =========
  return (
    <div className="flex min-h-screen justify-center bg-[#f9f9f9] p-6">
      <div className="w-full max-w-6xl rounded-3xl bg-white p-10 shadow-lg">
        {/* ПРОФІЛЬ + Дзвіночок */}
        <div className="mb-8 flex items-center justify-between">
          {/* Ліва частина профілю */}
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

          {/* Права частина — Дзвіночок + Кнопки */}
          <div className="flex items-center gap-4">
            {/* 🔔 Дзвіночок */}
            <NotificationBell
              notifications={notifications}
              isLoading={notificationsQuery.isLoading}
            />

            {/* Вийти */}
            <button
              onClick={logOut}
              className="rounded-full bg-red-500 px-6 py-3 text-lg font-semibold text-white hover:bg-red-600 transition"
            >
              Вийти
            </button>

            {/* Нова банка */}
            <button
              onClick={() => navigate("/campaign/new")}
              className="rounded-full bg-black px-6 py-3 text-lg font-semibold text-white"
            >
              + Нова банка
            </button>
          </div>
        </div>

        {/* ФІЛЬТРИ */}
        <h2 className="mb-4 text-3xl font-bold">Усі збори</h2>
        <div className="mb-8 flex flex-wrap gap-3">
          {[
            ["all", "Усі"],
            ["mine", "Мої збори"],
            ["supported", "Підтримані"],
            ["closed", "Закриті"],
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
            const isWinner = winnerCampaigns.has(c.id);
            const progress =
              ((c.collected_amount ?? 0) / (c.target_amount || 1)) * 100;

            const goToCampaign = () => {
              if (isWinner) navigate(`/campaign/${c.id}/winner`);
              else navigate(`/campaign/${c.id}`);
            };

            return (
              <div
                key={c.id}
                onClick={goToCampaign}
                className="cursor-pointer rounded-2xl border-2 border-green-400 p-5 hover:shadow-xl transition bg-white relative"
              >
                <h3 className="text-lg font-bold mb-1">{c.title}</h3>

                <p className="text-sm text-gray-600">
                  {c.collected_amount}₴ / {c.target_amount ?? 0}₴
                </p>

                <div className="my-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {c.user?.name}
                </p>

                {c.status === "CLOSED" && (
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
