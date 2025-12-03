// src/pages/Campaign/OpenCampaign.jsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  closeCampaign,
  deleteCampaign,
  donateToCampaign,
  getCampaignById,
  runRaffle,
} from "@/lib/api/campaign";

import avatarImage from "/golub.webp";

// 🔥 Простий toast
function Toast({ text }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-full shadow-lg animate-fadeInOut">
      {text}
    </div>
  );
}

export default function OpenCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [sum, setSum] = useState(0);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState("");

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  const queryClient = useQueryClient();

  // === FETCH CAMPAIGN ===
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignById(id),
  });

  // === CLOSE ===
  const closeMutation = useMutation({
    mutationFn: () => closeCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaign", id]);
      showToast("Збір закрито. Кошти зараховано організатору 💛");
    },
    onError: () => showToast("Помилка при закритті збору"),
  });

  // === DONATE ===
  const donateMutation = useMutation({
    mutationFn: (body) => donateToCampaign(id, body),
    onSuccess: () => {
      setSum(0);
      setComment("");
      queryClient.invalidateQueries(["campaign", id]);
      showToast("Дякуємо за донат ❤️");
    },
    onError: () => showToast("Помилка при оплаті"),
  });

  // === DELETE ===
  const deleteMutation = useMutation({
    mutationFn: () => deleteCampaign(id),
    onSuccess: () => {
      showToast("Збір видалено");
      navigate("/campaigns");
    },
    onError: () => showToast("Помилка при видаленні"),
  });

  // === RAFFLE ===
  const raffleMutation = useMutation({
    mutationFn: () => runRaffle(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaign", id]);
      showToast("Розіграш проведено! 🎁");
      navigate(`/campaigns/${id}/winner`);
    },
    onError: () => showToast("Помилка розіграшу"),
  });

  // === LOADING / ERROR ===
  if (isLoading)
    return <p className="p-10 text-center text-xl">Завантаження...</p>;

  if (error)
    return (
      <p className="p-10 text-center text-xl text-red-600">
        Помилка завантаження збору
      </p>
    );

  const campaign = data.data;

  // хто я
  const meId = campaign.currentUserId;
  const isMine = campaign.organizer_id === meId;

  const isClosed = campaign.status === "CLOSED";

  // чи вже є переможець
  const hasWinner =
    Boolean(campaign.winner_id) ||
    Boolean(campaign.winner?.id) ||
    Boolean(campaign.Raffle?.[0]?.RaffleWinner?.[0]?.user_id);

  // чи вже був розіграш
  const hasRaffle = Boolean(
    campaign.Raffle?.some((r) => r.status === "COMPLETED")
  );

  const target = campaign.target_amount || 0;
  const collected = campaign.collected_amount || 0;
  const progress = target ? Math.min(100, (collected / target) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-8 flex flex-col items-center">
      {/* Toast */}
      {toast && <Toast text={toast} />}

      {/* CARD */}
      <div className="relative max-w-6xl w-full bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-xl font-bold text-white z-20 drop-shadow"
        >
          ← Назад
        </button>

        {/* LEFT */}
        <div className="w-full md:w-1/2 bg-gradient-to-b from-[#f8d0c1] to-[#f4e6df] p-10 md:p-12 text-center flex flex-col items-center">
          <img
            src={avatarImage}
            className="h-40 w-40 md:h-48 md:w-48 rounded-full border-4 border-white shadow-xl mb-6 object-cover"
          />

          <p className="text-lg text-gray-700 mb-1">
            {campaign.user?.name} збирає на
          </p>

          <h1 className="text-3xl md:text-4xl font-black mb-4">
            {campaign.title}
          </h1>

          {campaign.description && (
            <p className="mb-6 text-sm text-gray-600 max-w-md">
              {campaign.description}
            </p>
          )}

          <div className="w-full">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-lg font-semibold">
              <span>{collected}₴</span>
              <span>{target}₴</span>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              {target
                ? `Зібрано ${Math.round(progress)}% від цілі`
                : "Ціль не вказана, збір триває довільно"}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col items-center justify-center">
          {/* Якщо це НЕ моя банка і вона активна — форма донату */}
          {!isMine && !isClosed && (
            <>
              <h2 className="text-xl mb-4 text-center">
                Підтримайте цей збір — оберіть суму або введіть свою ❤️
              </h2>

              <input
                type="number"
                value={sum}
                onChange={(e) => setSum(Number(e.target.value) || 0)}
                className="w-40 text-center text-5xl border-b-2 mb-4 outline-none"
              />

              <div className="flex gap-4 mb-4">
                {[50, 100, 500].map((x) => (
                  <button
                    key={x}
                    type="button"
                    onClick={() => setSum((prev) => prev + x)}
                    className="rounded-full border px-4 py-2 shadow text-sm"
                  >
                    +{x}₴
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Коментар до донату (необов'язково)"
                className="w-full p-3 border rounded-xl mb-4 text-sm"
              />

              <button
                type="button"
                onClick={() =>
                  donateMutation.mutate({ amount: sum, comment })
                }
                className="w-full rounded-xl bg-[#592916] py-3 text-lg text-white font-semibold shadow"
                disabled={sum <= 0}
              >
                Підтримати збір ❤️
              </button>

              {sum <= 0 && (
                <p className="mt-2 text-xs text-red-500">
                  Введіть суму донату, щоб продовжити.
                </p>
              )}
            </>
          )}

          {/* Якщо збір закритий */}
          {isClosed && (
            <p className="text-xl mt-6 text-center text-gray-800 font-semibold">
              Збір завершено. Дякуємо кожному, хто долучився 💛
            </p>
          )}

          {/* Якщо це моя банка і ще активна — підказка про завершення */}
          {isMine && !isClosed && (
            <p className="mt-6 text-xs text-gray-500 text-center max-w-xs">
              Ви можете завершити збір достроково. Після завершення нові донати
              не прийматимуться, а зібрані кошти будуть зараховані на ваш
              баланс.
            </p>
          )}
        </div>
      </div>

      {/* ⭐ КНОПКИ ВЛАСНИКА — ЗАВЖДИ ДЛЯ ОРГАНІЗАТОРА ⭐ */}
      {isMine && (
        <div className="mt-8 flex flex-wrap gap-4 justify-center items-center">
          {/* Видалити — завжди */}
          <button
            type="button"
            onClick={() => deleteMutation.mutate()}
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow text-sm md:text-base"
          >
            Видалити збір назавжди
          </button>

          {/* Закрити — поки активний */}
          {!isClosed && (
            <button
              type="button"
              onClick={() => closeMutation.mutate()}
              className="px-6 py-3 bg-[#f7b267] rounded-full shadow text-sm md:text-base"
            >
              Завершити збір
            </button>
          )}

          {/* Провести розіграш — тільки якщо збір ЗАКРИТИЙ і ще немає переможця */}
          {isClosed && !hasWinner && !hasRaffle && (
            <button
              type="button"
              onClick={() => raffleMutation.mutate()}
              className="px-6 py-3 rounded-full bg-[#592916] text-white shadow text-sm md:text-base"
            >
              Почати розіграш 🎁
            </button>
          )}

          {/* Перегляд переможця */}
          {hasWinner && (
            <button
              type="button"
              onClick={() => navigate(`/campaigns/${campaign.id}/winner`)}
              className="px-6 py-3 rounded-full bg-green-600 text-white shadow text-sm md:text-base"
            >
              Переглянути переможця 🎉
            </button>
          )}
        </div>
      )}
    </div>
  );
}
