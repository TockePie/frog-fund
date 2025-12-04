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

// ======================== TOAST ========================
function Toast({ text }) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
      bg-black text-white px-6 py-3 rounded-full shadow-lg animate-fadeInOut">
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

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const queryClient = useQueryClient();

  // ======================== GET CAMPAIGN ========================
  const { data, isLoading, error } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () => getCampaignById(id),
  });

  const closeMutation = useMutation({
    mutationFn: () => closeCampaign(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaign", id]);
      showToast("Збір закрито!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteCampaign(id),
    onSuccess: () => {
      showToast("Збір видалено!");
      navigate("/campaigns");
    },
  });

  const donateMutation = useMutation({
    mutationFn: (body) => donateToCampaign(id, body),
    onSuccess: () => {
      setSum(0);
      setComment("");
      queryClient.invalidateQueries(["campaign", id]);
      showToast("Дякуємо за донат ❤️");
    },
  });

  const raffleMutation = useMutation({
    mutationFn: () => runRaffle(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["campaign", id]);
      showToast("Розіграш проведено!");
      navigate(`/campaigns/${id}/winner`);
    },
  });

  if (isLoading)
    return <p className="p-10 text-center text-xl">Завантаження…</p>;

  if (error)
    return (
      <p className="p-10 text-center text-xl text-red-600">
        Помилка завантаження
      </p>
    );

  const c = data.data;

  const isMine = c.organizer_id === c.currentUserId;
  const isClosed = c.status === "CLOSED";
  const hasWinner = Boolean(c.winner_id);

  const goalReached = c.collected_amount >= (c.target_amount || 0);

  const progress =
    ((c.collected_amount || 0) / (c.target_amount || 1)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-r 
      from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] 
      p-8 flex flex-col items-center">

      {toast && <Toast text={toast} />}

      <div className="relative max-w-6xl w-full bg-white 
        rounded-3xl shadow-2xl flex overflow-hidden">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-xl font-bold text-white z-20 drop-shadow">
          ← Назад
        </button>

        {/* LEFT BLOCK */}
        <div className="w-1/2 bg-gradient-to-b from-[#f8d0c1] to-[#f4e6df] 
          p-12 text-center flex flex-col items-center">

          <img
            src={avatarImage}
            className="h-48 w-48 rounded-full border-4 mb-6"
          />

          <p className="text-lg text-gray-700">{c.user.name} збирає на</p>

          <h1 className="text-4xl font-black mb-3">{c.title}</h1>

          <p className="text-gray-600 mb-6 max-w-xs">{c.description}</p>

          <div className="w-full">
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-500"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-3 flex justify-between text-lg font-semibold text-black">
              <span>{c.collected_amount}₴</span>
              <span>{c.target_amount || "—"}₴</span>
            </div>
          </div>
        </div>

        {/* RIGHT BLOCK */}
        <div className="w-1/2 p-12 flex flex-col items-center justify-center text-center">

          {/* ============ IF NOT OWNER & ACTIVE → DONATE ============== */}
          {!isMine && !isClosed && (
            <>
              <h2 className="text-xl mb-4 text-gray-800">Впишіть суму</h2>

              <input
                type="number"
                value={sum}
                onChange={(e) => setSum(Number(e.target.value))}
                className="w-40 text-center text-5xl border-b-2 mb-4"
              />

              <div className="flex gap-4 mb-4">
                {[50, 100, 500].map((x) => (
                  <button
                    key={x}
                    onClick={() => setSum(sum + x)}
                    className="rounded-full border px-4 py-2 shadow">
                    +{x}₴
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Коментар…"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full p-3 border rounded-xl mb-4"
              />

              <button
                onClick={() => donateMutation.mutate({ amount: sum, comment })}
                className="w-full rounded-xl bg-[#592916] py-3 text-lg text-white shadow">
                Сплатити
              </button>
            </>
          )}

          {/* ============ OWNER — TEXT BLOCK ============== */}
          {isMine && !isClosed && (
            <div className="mt-10">
              {!goalReached && (
                <p className="text-xl font-semibold text-gray-800 max-w-md mx-auto">
                  Сума ще не зібрана, але ви можете завершити збір достроково.
                </p>
              )}

              {goalReached && (
                <p className="text-xl font-semibold text-[#592916] max-w-md mx-auto">
                  🎉 Мета досягнута — можете завершити збір та отримати кошти!
                </p>
              )}
            </div>
          )}

          {/* ============ IF CLOSED ============== */}
          {isClosed && (
            <p className="text-xl mt-12 font-semibold text-gray-800">
              Збір завершено
            </p>
          )}
        </div>
      </div>

      {/* BOTTOM BUTTONS */}
      {isMine && (
        <div className="mt-8 flex gap-4 justify-center items-center">

          <button
            onClick={() => deleteMutation.mutate()}
            className="px-6 py-3 bg-red-500 text-white rounded-full shadow">
            Видалити збір
          </button>

          {!isClosed && (
            <button
              onClick={() => closeMutation.mutate()}
              className="px-6 py-3 bg-[#f7b267] rounded-full shadow">
              Закінчити збір
            </button>
          )}

          {isClosed && !hasWinner && (
            <button
              onClick={() => raffleMutation.mutate()}
              className="px-6 py-3 bg-[#592916] text-white rounded-full shadow">
              Провести розіграш
            </button>
          )}

          {hasWinner && (
            <button
              onClick={() => navigate(`/campaigns/${c.id}/winner`)}
              className="px-6 py-3 bg-green-600 text-white rounded-full shadow">
              Переможець 🎉
            </button>
          )}
        </div>
      )}
    </div>
  );
}
