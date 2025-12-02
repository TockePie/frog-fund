import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

import LoginModal from "@/components/AuthModal/login";
import { getAllCampaigns } from "@/lib/api/campaign";

import golub from "/golub.webp";

export default function RafflesPage() {
  const navigate = useNavigate();

  const [authOpen, setAuthOpen] = useState(false);
  const [redirectId, setRedirectId] = useState(null);

  // 🔥 Автовідкриття модалки при вході
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (!token) setAuthOpen(true);
  }, []);

  // 🔥 Вийти
  const logout = () => {
    Cookies.remove("jwt");
    setAuthOpen(true);
  };

  // 🔥 Завантаження зборів
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: getAllCampaigns,
  });

  if (isLoading)
    return <p className="p-10 text-center text-xl">Завантаження...</p>;

  if (error)
    return (
      <p className="p-10 text-center text-xl text-red-600">
        Помилка: {error.message}
      </p>
    );

  const campaigns = data.data;

  // Клік по картці
  const handleOpen = (id) => {
    const token = Cookies.get("jwt");
    if (!token) {
      setRedirectId(id);
      setAuthOpen(true);
      return;
    }
    navigate(`/campaign/${id}`);
  };

  // Після логіну
  const handleAuthChange = (isOpen) => {
    setAuthOpen(isOpen);
    const token = Cookies.get("jwt");

    if (!isOpen && token && redirectId) {
      navigate(`/campaign/${redirectId}`);
    }
  };

  // === Функція визначення кольору рамки ===
  const getBorderColor = (c) => {
    const progress = (c.collected_amount ?? 0) / (c.target_amount || 1);

    if (c.status === "CLOSED") return "border-green-500";
    if (progress < 0.2) return "border-red-400";
    if (progress < 0.8) return "border-yellow-400";
    return "border-orange-500";
  };

  return (
    <>
      <LoginModal open={authOpen} onOpenChange={handleAuthChange} />

      <div className="min-h-screen w-full bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] py-10 px-6 flex justify-center">

        <div className="w-full max-w-6xl rounded-3xl bg-white shadow-xl p-10 relative">

          {/* Назад */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center gap-2 text-xl font-bold text-gray-800 hover:opacity-90 transition"
          >
            ← Назад
          </button>

          {/* Вийти */}
          <button
            onClick={logout}
            className="absolute top-6 right-6 px-5 py-2 rounded-full bg-black text-white font-semibold hover:bg-gray-900 transition"
          >
            Вийти
          </button>

          <h1 className="text-5xl font-extrabold text-[#2b2b2b] mb-10 text-center">
            Усі збори
          </h1>

          <div className="flex flex-col gap-8">
            {campaigns.map((c) => {
              const progress =
                ((c.collected_amount ?? 0) / (c.target_amount || 1)) * 100;

              return (
                <div
                  key={c.id}
                  onClick={() => handleOpen(c.id)}
                  className={`block cursor-pointer flex flex-col md:flex-row 
                             bg-gradient-to-r from-[#ffe6e1] to-[#fff5d7]
                             rounded-2xl p-6 shadow-lg hover:scale-[1.02] hover:shadow-xl transition border-4 ${getBorderColor(
                               c
                             )}`}
                >
                  {/* Ліва частина */}
                  <div className="flex flex-1 gap-4 items-center">
                    <img
                      src={golub}
                      alt="avatar"
                      className="w-20 h-20 rounded-full object-cover border-2 border-white"
                    />

                    <div className="flex flex-col w-full">
                      <h2 className="text-2xl font-bold">{c.title}</h2>

                      <div className="w-full h-3 bg-white rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-orange-400"
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      <p className="text-xl font-bold mt-2">
                        {c.collected_amount} ₴ / {c.target_amount} ₴
                      </p>

                      <p className="text-gray-600 text-sm">
                        {c.user?.name ?? "Анонім"}
                      </p>
                    </div>
                  </div>

                  {/* Права частина */}
                  <div className="flex flex-1 flex-col justify-center mt-6 md:mt-0 md:pl-10">
                    <p className="text-lg font-semibold">
                      Мінімальний внесок:{" "}
                      <span className="font-bold">{c.min_amount ?? 0} ₴</span>
                    </p>

                    <p className="text-lg font-semibold">
                      Статус:{" "}
                      <span className="font-bold">
                        {c.status === "CLOSED" ? "Завершено" : "Активний"}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
