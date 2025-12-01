// XXX: ESLint - 'React' is declared but its value is never read.
import React, { useState } from 'react'
//XXX: Use 'react-router' instead
import { useNavigate } from 'react-router-dom'

// XXX: Use images from public folder
// import avatarImage from '/golub.webp'
import avatarImage from '../../res/golub.webp'

const filters = [
  { label: 'Усі', value: 'all' },
  { label: 'Мої збори', value: 'my' },
  { label: 'Підтримані збори', value: 'supported' },
  { label: 'Мої закриті збори', value: 'closed' }
]

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
    icon: ''        
  }
]

const CampaignsPage = () => {
  const navigate = useNavigate()
  //TODO: Use search params instead
  // https://reactrouter.com/api/hooks/useSearchParams
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredCampaigns = campaigns.filter((c) => {
    if (activeFilter === 'all') return true
    return c.type === activeFilter
  })

  //XXX: Remove max-w-6xl and redesign an app to Figma's board
  return (
    <div className="flex min-h-screen justify-center bg-[#f9f9f9] p-6">
      <div className="w-full max-w-6xl rounded-3xl bg-white p-10 shadow-lg">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={avatarImage}
              alt="User Avatar"
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">Денис Голуб</h2>
              {/* XXX: Accent color of our app is stone, not gray */}
              <p className="text-gray-500">
                Баланс: <strong>5 000₴</strong>
              </p>
            </div>
          </div>

          {/* XXX: Accent color of our app is stone, not black */}
          <button
            onClick={() => navigate('/campaign/new')}
            className="rounded-full bg-black px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:opacity-90"
          >
            + Нова банка
          </button>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-3xl font-bold">Усі збори</h2>
          {/* XXX: Accent color of our app is stone, not gray */}
          <span className="text-xl text-gray-500">
            {filteredCampaigns.length}
          </span>
        </div>

        {/* XXX: Accent color of our app is stone, not gray */}
        <div className="mb-10 flex gap-3">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${
                activeFilter === f.value
                  ? 'border-black bg-black text-white shadow-md'
                  : 'border-gray-300 bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredCampaigns.map((c) => (
            <div
              key={c.id}
              onClick={() => navigate(`/campaign/${c.id}`)}
              className={`cursor-pointer rounded-2xl border p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${c.color}`}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-bold">{c.title}</h3>

                <span className="text-lg transition-transform duration-200 hover:scale-125">
                  {c.icon}
                </span>
              </div>

              {/* XXX: Accent color of our app is stone, not gray */}
              <p className="mb-3 text-sm text-gray-500">
                {c.amount}₴ / {c.goal}₴
              </p>

              {/* XXX: Accent color of our app is stone, not gray */}
              <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-green-400 transition-all duration-700"
                  style={{ width: `${(c.amount / c.goal) * 100}%` }}
                />
              </div>

              {/* XXX: Accent color of our app is stone, not gray */}
              <div className="flex justify-between text-sm text-gray-600">
                <span>{c.user}</span>
                <span>{c.from}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CampaignsPage
