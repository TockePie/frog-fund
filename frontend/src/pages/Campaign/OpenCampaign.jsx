// XXX: ESLint - 'React' is declared but its value is never read.
import React, { useState } from 'react'
//XXX: Use 'react-router' instead
import { useNavigate, useParams } from 'react-router-dom'

// XXX: Use images from public folder
// import avatarImage from '/golub.webp'
import avatarImage from '../../res/golub.webp'

const campaigns = [
  {
    id: 1,
    title: 'На пшеницю',
    amount: 15.74,
    goal: 50,
    user: 'Василь К.',
    from: 'від 5₴'
  },
  {
    id: 2,
    title: 'На психолога',
    amount: 15.74,
    goal: 50,
    user: 'Хтось ',
    from: 'від 10₴'
  },
  {
    id: 3,
    title: 'На подорож',
    amount: 15.74,
    goal: 50,
    user: 'Василь К.',
    from: 'від 5₴'
  },
  {
    id: 4,
    title: 'На поїсти',
    amount: 50,
    goal: 50,
    user: 'Хтось',
    from: 'Завершений'
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

  const isMine = campaign.user === 'Користувач'
  const isClosed = campaign.amount >= campaign.goal

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-8">
      <div className="relative flex w-full max-w-6xl flex-col gap-6 bg-transparent p-0 shadow-none">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 flex items-center gap-2 text-xl font-bold text-white drop-shadow-[0_0_6px_rgba(0,0,0,0.6)] hover:opacity-90"
        >
          ← Назад
        </button>

        <div className="flex w-full overflow-hidden rounded-3xl shadow-2xl">
          <div className="flex w-1/2 flex-col items-center gap-6 bg-gradient-to-b from-[#f8d0c1] to-[#f4e6df] p-10">
            <img
              src={avatarImage}
              className="h-48 w-48 rounded-full border-4 border-white object-cover shadow-xl"
            />

            <p className="text-lg text-gray-700">{campaign.user} збирає на</p>

            <h1 className="text-4xl font-extrabold text-gray-900">
              {campaign.title}
            </h1>

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

          <div className="flex w-1/2 flex-col items-center justify-center gap-6 bg-[#fdfdfd] p-12">
            {!isClosed ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center p-10 text-center">
                <p className="mb-6 text-xl text-gray-700">
                  Цільову суму зібрано, банку більше не можна поповнювати.
                </p>
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

        {isMine && !isClosed && (
          <div className="mt-4 flex justify-center gap-6">
            <button className="rounded-full border bg-white px-6 py-3 font-medium shadow hover:bg-gray-100">
              Поділитися банкою
            </button>
            <button className="rounded-full bg-yellow-200 px-6 py-3 font-medium shadow hover:bg-yellow-300">
              Закінчити збір
            </button>
            <button className="rounded-full bg-blue-200 px-6 py-3 font-medium shadow hover:bg-blue-300">
              Провести розіграш
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
