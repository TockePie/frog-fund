import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getMe } from "@/lib/api/user";

export default function CampaignsPage() {
  const navigate = useNavigate();

  // Запит: поточний користувач + його банки
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  if (isLoading)
    return <p className="p-10 text-center">Завантаження...</p>;

  if (error)
    return (
      <p className="p-10 text-center text-red-600">
        Помилка: {error.message}
      </p>
    );

  const user = data.data;
  const campaigns = user.Campaign || [];

  return (
    <div className="flex min-h-screen justify-center bg-[#f9f9f9] p-6">
      <div className="w-full max-w-6xl rounded-3xl bg-white p-10 shadow-lg">

        {/* ПРОФІЛЬ */}
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/golub.webp"
              alt="Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">
                Баланс: <strong>{user.balance ?? 0}₴</strong>
              </p>
            </div>
          </div>

          {/* НОВА БАНКА */}
          <button
            onClick={() => navigate("/campaign/new")}
            className="rounded-full bg-black px-6 py-3 text-lg font-semibold text-white"
          >
            + Нова банка
          </button>
        </div>

        {/* ЗБОРИ */}
        <h2 className="mb-6 text-3xl font-bold">Мої банки</h2>

        {campaigns.length === 0 && (
          <p className="text-gray-500 text-lg">У вас ще немає жодної банки.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {campaigns.map((c) => {
            const isClosed =
              (c.collected_amount ?? 0) >= (c.target_amount ?? Infinity);

            return (
              <div
                key={c.id}
                onClick={() => navigate(`/campaign/${c.id}`)}
                className="cursor-pointer rounded-2xl border p-5 hover:shadow-xl transition bg-white"
              >
                <h3 className="text-lg font-bold mb-2">{c.title}</h3>

                {/* Прогрес */}
                <p className="text-sm text-gray-600">
                  {c.collected_amount}₴ / {c.target_amount ?? 0}₴
                </p>

                <div className="my-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${((c.collected_amount ?? 0) /
                        (c.target_amount || 1)) * 100}%`,
                    }}
                  ></div>
                </div>

                <p className="text-sm text-gray-500">
                  Мін. внесок: {c.min_amount ?? "0"}₴
                </p>

                {/* Статус */}
                <p
                  className={`mt-3 text-sm font-semibold ${
                    isClosed ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {isClosed ? "Збір завершено" : "Активний збір"}
                </p>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}
