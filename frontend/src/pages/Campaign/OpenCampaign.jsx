import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import avatarImage from "../../res/golub.webp";

const campaigns = [
  { id: 1, title: "На пшеницю", amount: 15.74, goal: 50, user: "Василь К.", from: "від 5₴" },
  { id: 2, title: "На психолога", amount: 15.74, goal: 50, user: "Хтось ", from: "від 10₴" },
  { id: 3, title: "На подорож", amount: 15.74, goal: 50, user: "Василь К.", from: "від 5₴" },
  { id: 4, title: "На поїсти", amount: 50, goal: 50, user: "Хтось", from: "Завершений" },
];

export default function OpenCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sum, setSum] = useState(0);

  const campaign = campaigns.find((c) => c.id === Number(id));

  if (!campaign) {
    return <h2 className="text-center mt-20 text-3xl font-bold">Збір не знайдено 🙁</h2>;
  }

  const isMine = campaign.user === "Користувач";
  const isClosed = campaign.amount >= campaign.goal;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-8">
      <div className="relative w-full max-w-6xl p-0 flex flex-col gap-6 bg-transparent shadow-none">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-white font-bold text-xl drop-shadow-[0_0_6px_rgba(0,0,0,0.6)] flex items-center gap-2 hover:opacity-90"
        >
          ← Назад
        </button>

        <div className="w-full flex rounded-3xl overflow-hidden shadow-2xl">

          <div className="w-1/2 bg-gradient-to-b from-[#f8d0c1] to-[#f4e6df] p-10 flex flex-col items-center gap-6">
            <img
              src={avatarImage}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-xl"
            />

            <p className="text-lg text-gray-700">{campaign.user} збирає на</p>

            <h1 className="text-4xl font-extrabold text-gray-900">{campaign.title}</h1>

            <div className="w-full flex flex-col items-center mt-4">
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-400 transition-all duration-500"
                  style={{ width: `${(campaign.amount / campaign.goal) * 100}%` }}
                />
              </div>

              <div className="flex justify-between w-full text-lg mt-3 font-semibold">
                <span>Зібрано {campaign.amount}₴</span>
                <span>Ціль {campaign.goal}₴</span>
              </div>
            </div>
          </div>

          <div className="w-1/2 bg-[#fdfdfd] p-12 flex flex-col justify-center items-center gap-6">
            {!isClosed ? (
              <>
                <h2 className="text-xl font-semibold text-gray-800">Впишіть суму</h2>
                <input
                  type="number"
                  value={sum}
                  onChange={(e) => setSum(Number(e.target.value))}
                  className="text-5xl font-bold text-center text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-gray-600 w-40"
                />

                <div className="flex gap-4">
                  {[50, 100, 500].map((x) => (
                    <button
                      key={x}
                      onClick={() => setSum(sum + x)}
                      className="px-4 py-2 bg-white border rounded-full shadow hover:bg-gray-100"
                    >
                      +{x}₴
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Коментар..."
                  className="w-full p-3 border rounded-xl shadow-sm"
                />

                <button className="w-full bg-[#592916] text-white py-3 rounded-xl text-lg font-semibold shadow-lg hover:opacity-90">
                  Сплатити
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-10">
                <p className="text-xl text-gray-700 mb-6">
                  Цільову суму зібрано, банку більше не можна поповнювати.
                </p>
                <button
                  onClick={() => navigate("/campaigns")}
                  className="px-6 py-3 bg-white border rounded-full shadow hover:bg-gray-100 font-medium"
                >
                  Інші банки
                </button>
              </div>
            )}
          </div>
        </div>

        {isMine && !isClosed && (
          <div className="flex justify-center gap-6 mt-4">
            <button className="px-6 py-3 bg-white border rounded-full shadow hover:bg-gray-100 font-medium">
              Поділитися банкою
            </button>
            <button className="px-6 py-3 bg-yellow-200 rounded-full shadow hover:bg-yellow-300 font-medium">
              Закінчити збір
            </button>
            <button className="px-6 py-3 bg-blue-200 rounded-full shadow hover:bg-blue-300 font-medium">
              Провести розіграш
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
