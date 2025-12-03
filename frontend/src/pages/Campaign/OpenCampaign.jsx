import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  closeCampaign,
  donateToCampaign,
  getCampaignById,
  runRaffle,
} from "@/lib/api/campaign";

import avatarImage from "/golub.webp";

export default function OpenCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sum, setSum] = useState(0);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  // === FETCH CAMPAIGN ===
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignById(id),
  });

  // === CLOSE CAMPAIGN ===
  const closeMutation = useMutation({
    mutationFn: () => closeCampaign(id),
    onSuccess: () => queryClient.invalidateQueries(["campaign", id]),
  });

  // === DONATE ===
  const donateMutation = useMutation({
    mutationFn: (body) => donateToCampaign(id, body),
    onSuccess: () => {
      setSum(0);
      setComment("");
      queryClient.invalidateQueries(["campaign", id]);
    },
  });

  // === RUN RAFFLE ===
  const raffleMutation = useMutation({
    mutationFn: () => runRaffle(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaign", id]);
      navigate(`/campaigns/${id}/winner`);
    },
  });

  // === LOADING/ERROR ===
  if (isLoading)
    return <p className="p-10 text-center text-xl">Завантаження...</p>;

  if (error)
    return (
      <p className="p-10 text-center text-xl text-red-600">
        Помилка: {error.message}
      </p>
    );

  const campaign = data.data;
  const isMine = campaign.organizer_id === campaign.currentUserId;
  const isClosed = campaign.status === "CLOSED";

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-8 flex flex-col items-center">

      {/* ========== CARD ========== */}
      <div className="relative w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl flex bg-white">

        {/* Назад */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-xl font-bold text-white z-20 drop-shadow"
        >
          ← Назад
        </button>

        {/* ЛІВИЙ БЛОК */}
        <div className="w-1/2 bg-gradient-to-b from-[#f8d0c1] to-[#f4e6df] p-12 flex flex-col items-center text-center">
          <img
            src={avatarImage}
            className="h-48 w-48 rounded-full border-4 border-white shadow-xl mb-6"
          />

          <p className="text-lg text-gray-700 font-medium">
            {campaign.user?.name ?? "Користувач"} збирає на
          </p>

          <h1 className="text-4xl font-black text-gray-900 mb-6">
            {campaign.title}
          </h1>

          {/* ПРОГРЕС */}
          <div className="w-full mt-4">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400"
                style={{
                  width: `${
                    (campaign.collected_amount / (campaign.target_amount || 1)) *
                    100
                  }%`,
                }}
              />
            </div>

            <div className="mt-3 flex justify-between text-lg font-semibold">
              <span>Зібрано {campaign.collected_amount}₴</span>
              <span>Ціль {campaign.target_amount}₴</span>
            </div>
          </div>
        </div>

        {/* ПРАВИЙ БЛОК */}
        <div className="w-1/2 bg-white p-12 flex flex-col items-center">

          {/* === ДОНАТ === */}
          {!isMine && !isClosed && (
            <>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Впишіть суму
              </h2>

              <input
                type="number"
                value={sum}
                onChange={(e) => setSum(Number(e.target.value))}
                className="w-40 border-b-2 border-gray-300 text-center text-5xl font-bold bg-transparent"
              />

              <div className="flex gap-4 my-4">
                {[50, 100, 500].map((x) => (
                  <button
                    key={x}
                    onClick={() => setSum(sum + x)}
                    className="rounded-full border bg-white px-4 py-2 shadow"
                  >
                    +{x}₴
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Коментар..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-xl border p-3 shadow-sm mb-4"
              />

              <button
                onClick={() =>
                  donateMutation.mutate({ amount: sum, comment })
                }
                className="w-full rounded-xl bg-[#592916] py-3 text-lg font-semibold text-white shadow-lg"
              >
                {donateMutation.isLoading ? "Оплата…" : "Сплатити"}
              </button>
            </>
          )}

          {/* === МОЯ БАНКА НЕ ЗАКРИТА === */}
          {isMine && !isClosed && (
            <p className="mt-16 text-center text-gray-700 text-lg font-semibold">
              Ціль ще не досягнута, але ви можете закрити збір достроково.
            </p>
          )}

          {/* === ЗАКРИТА БАНКА === */}
          {isClosed && (
            <p className="text-xl text-gray-700 mt-16">
              Цільову суму зібрано!
            </p>
          )}
        </div>
      </div>

      {/* ========== БЛОК КНОПОК ПІД КАРТКОЮ ========== */}

      {/* МОЯ + НЕ ЗАКРИТА */}
      {isMine && !isClosed && (
        <div className="mt-8 flex gap-4">
          <button className="rounded-full bg-white px-6 py-3 text-lg font-semibold shadow">
            Поділитися
          </button>

          <button
            onClick={() => closeMutation.mutate()}
            className="rounded-full bg-[#f7b267] px-6 py-3 text-lg font-semibold text-gray-800 shadow"
          >
            {closeMutation.isLoading ? "Закриваємо…" : "Закінчити збір"}
          </button>
        </div>
      )}

      {/* МОЯ + ЗАКРИТА → МОЖНО ПРОВОДИТИ РОЗІГРАШ */}
      {isMine && isClosed && (
        <div className="mt-8 flex flex-col items-center gap-4">
          <button
            onClick={() => raffleMutation.mutate()}
            className="rounded-full bg-[#592916] px-8 py-3 text-lg font-semibold text-white shadow hover:opacity-90"
          >
            {raffleMutation.isLoading
              ? "Проводимо розіграш…"
              : "Провести розіграш"}
          </button>
        </div>
      )}

      {/* ЧУЖА + ЗАКРИТА */}
      {!isMine && isClosed && (
        <button
          onClick={() => navigate("/campaigns")}
          className="mt-8 rounded-full bg-white px-6 py-3 text-lg font-semibold shadow"
        >
          Інші банки
        </button>
      )}
    </div>
  );
}
