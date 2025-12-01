// XXX: It's better to name this file index.jsx

import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// XXX: Use images from public folder
import avatarImage from '../../res/golub.webp'

// Поточний користувач = Денис
const currentUser = {
  id: 1,
  name: "Денис Г"
}
const campaigns = [
  {
    id: 1,
    title: 'На пшеницю',
    amount: 15.74,
    goal: 50,
    user: 'Денис Г',
    ownerId: 1,
    from: 'від 5₴',
    type: 'my',
    raffleDone: false,  // 🔥 Розіграш НЕ проведено
    color: 'border-green-300',
    icon: ''
  },
  {
    id: 2,
    title: 'На корм',
    amount: 76.76,
    goal: 100,
    user: 'Василь К.',
    ownerId: 22,
    from: 'від 10₴',
    type: 'supported',
    raffleDone: false,
    color: 'border-red-300',
    icon: ''
  },
  {
    id: 3,
    title: 'На психолога',
    amount: 10.6,
    goal: 200,
    user: 'Василь Д.',
    ownerId: 17,
    from: 'від 5₴',
    type: 'supported',
    raffleDone: false,
    color: 'border-yellow-300',
    icon: ''
  },
  {
    id: 4,
    title: 'На поїсти',
    amount: 50,
    goal: 50,
    user: 'Денис Г',
    ownerId: 1,
    from: 'Завершений',
    type: 'closed',
    raffleDone: true,   
    color: 'border-gray-300',
    icon: '🎈'         
  }
]

export default function OpenCampaign() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [sum, setSum] = useState(0)

  const campaign = campaigns.find((c) => c.id === Number(id))

  if (!campaign) {
    return (
      <h2 className="mt-20 text-center text-3xl font-bold">
        Збір не знайдено 🙁
      </h2>
    )
  }

  const isMine = campaign.ownerId === currentUser.id
  const isClosed = campaign.amount >= campaign.goal

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-8">
      <div className="relative flex w-full max-w-6xl flex-col gap-6 bg-transparent p-0 shadow-none">

        {/* Назад */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-xl font-bold text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.6)] hover:opacity-90"
        >
          ← Назад
        </button>

        <div className="flex w-full overflow-hidden rounded-3xl shadow-2xl">

          {/* Лівий блок */}
          <div className="flex w-1/2 flex-col items-center gap-6 bg-gradient-to-b from-[#f8d0c1] to-[#f4e6df] p-10">
            <img
              src={avatarImage}
              className="h-48 w-48 rounded-full border-4 border-white object-cover shadow-xl"
            />

            <p className="text-lg text-gray-700">{campaign.user} збирає на</p>

            <h1 className="text-4xl font-extrabold text-gray-900">
              {campaign.title}
            </h1>

            {/* Прогрес */}
            <div className="mt-4 flex w-full flex-col items-center">
              <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full bg-orange-400 transition-all duration-500"
                  style={{
                    width: `${(campaign.amount / campaign.goal) * 100}%`
                  }}
                />
              </div>

              <div className="mt-3 flex w-full justify-between text-lg font-semibold">
                <span>Зібрано {campaign.amount}₴</span>
                <span>Ціль {campaign.goal}₴</span>
              </div>
            </div>
          </div>

          {/* Правий блок */}
          <div className="flex w-1/2 flex-col items-center justify-center gap-6 bg-[#fdfdfd] p-12">

            {/* ================================
                НЕ МОЯ БАНКА — НЕ ЗАКРИТА
            ================================= */}
            {!isMine && !isClosed && (
              <>
                <h2 className="text-xl font-semibold text-gray-800">
                  Впишіть суму
                </h2>

                <input
                  type="number"
                  value={sum}
                  onChange={(e) => setSum(Number(e.target.value))}
                  className="w-40 border-b-2 border-gray-300 bg-transparent text-center text-5xl font-bold text-gray-900 focus:border-gray-600 focus:outline-none"
                />

                <div className="flex gap-4">
                  {[50, 100, 500].map((x) => (
                    <button
                      key={x}
                      onClick={() => setSum(sum + x)}
                      className="rounded-full border bg-white px-4 py-2 shadow hover:bg-gray-100"
                    >
                      +{x}₴
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="Коментар..."
                  className="w-full rounded-xl border p-3 shadow-sm"
                />

                <button className="w-full rounded-xl bg-[#592916] py-3 text-lg font-semibold text-white shadow-lg hover:opacity-90">
                  Сплатити
                </button>
              </>
            )}

            {/* ================================
                МОЯ БАНКА — НЕ ЗАКРИТА
            ================================= */}
            {isMine && !isClosed && (
              <div className="mt-8 flex flex-col items-center gap-4">

                <button className="w-64 rounded-xl bg-white py-4 text-lg font-semibold border border-gray-300 shadow hover:bg-gray-100 transition">
                  Поділитися банкою
                </button>

                <button className="w-64 rounded-xl bg-[#f7b267] py-4 text-lg font-semibold text-gray-800 shadow hover:bg-[#f59e50] transition">
                  Закінчити збір
                </button>

                <button className="w-64 rounded-xl bg-[#592916] py-4 text-lg font-semibold text-white shadow-lg hover:opacity-90 transition">
                  Провести розіграш
                </button>

              </div>
            )}

            {/* =========================================================
                ЗАВЕРШЕНА БАНКА (ДИЗАЙН ЯК ТИ ПРОСИЛА — ЧУЖА ВЕРСІЯ + МОЯ)
            ========================================================= */}
            {isClosed && (
              <div className="flex flex-col items-center justify-center p-10 text-center">

                <p className="mb-6 text-xl text-gray-700">
                  Цільову суму зібрано, банку більше не можна поповнювати.
                </p>

                {/* КНОПКИ ТІЛЬКИ ДЛЯ ДЕНИСА */}
                {isMine && (
                  <div className="flex flex-col gap-4 mb-6">
                    <button className="w-56 rounded-xl bg-gray-200 py-3 font-semibold hover:bg-gray-300">
                      Інформація
                    </button>

                    <button className="w-56 rounded-xl bg-[#592916] text-white py-3 font-semibold shadow-lg hover:opacity-90">
                      Провести розіграш
                    </button>
                  </div>
                )}

                {/* Кнопка для всіх */}
                <button
                  onClick={() => navigate('/campaigns')}
                  className="rounded-full border bg-white px-6 py-3 font-medium shadow hover:bg-gray-100"
                >
                  Інші банки
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

