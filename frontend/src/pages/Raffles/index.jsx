import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import LoginModal from "@/components/AuthModal/login"

import frog from "/frog.png"
import golub from "/golub.webp"

export default function RafflesPage() {
  const navigate = useNavigate()

  const [authOpen, setAuthOpen] = useState(false)
  const [redirectId, setRedirectId] = useState(null)

  const raffles = [
    // 🔥 Розіграші з профілю
    {
      id: 1,
      title: "На пшеницю",
      owner: "Денис Г.",
      img: golub,
      current: 15.74,
      target: 50,
      min: 5,
      type: "одиночний",
      winners: 1,
    },
    {
      id: 2,
      title: "На психолога",
      owner: "Василь К.",
      img: frog,
      current: 15.74,
      target: 50,
      min: 10,
      type: "множинний",
      winners: 3,
    },
    {
      id: 3,
      title: "На подорож",
      owner: "Василь К.",
      img: frog,
      current: 15.74,
      target: 50,
      min: 5,
      type: "одиночний",
      winners: 1,
    },
    {
      id: 4,
      title: "На поїсти",
      owner: "Денис Г.",
      img: golub,
      current: 50,
      target: 50,
      min: 0,
      type: "закритий",
      winners: 0,
    },

    // 🔥 Нові незалежні розіграші
    {
      id: 5,
      title: "На лікування котика",
      owner: "Марія К.",
      img: frog,
      current: 220,
      target: 500,
      min: 20,
      type: "множинний",
      winners: 3,
    },
    {
      id: 6,
      title: "На подорож до Львова",
      owner: "Ігор С.",
      img: golub,
      current: 150,
      target: 300,
      min: 15,
      type: "одиночний",
      winners: 1,
    },
  ]

  // клік по розіграшу
  const handleOpenRaffle = (id) => {
    const token = Cookies.get("jwt")

    if (!token) {
      setRedirectId(id)
      setAuthOpen(true)
      return
    }

    navigate(`/raffles/${id}`)
  }

  // коли модалка закрилась — якщо токен зʼявився, переходимо
  const handleAuthChange = (isOpen) => {
    setAuthOpen(isOpen)

    if (!isOpen) {
      const token = Cookies.get("jwt")
      if (token && redirectId) {
        navigate(`/raffles/${redirectId}`)
      }
    }
  }

  return (
    <>
      {/* Модалка логіну (без тригера, керується станом) */}
      <LoginModal open={authOpen} onOpenChange={handleAuthChange} />

      <div className="min-h-screen w-full bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] py-10 px-6 flex justify-center">
        <div className="w-full max-w-6xl rounded-3xl bg-white shadow-xl p-10 relative">

          {/* Кнопка НАЗАД  */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 left-6 flex items-center gap-2 text-xl font-bold text-gray-800
                       drop-shadow-[0_0_12px_rgba(0,0,0,0.45)] hover:opacity-90 transition"
          >
            ← Назад
          </button>

          <h1 className="text-5xl font-extrabold text-[#2b2b2b] mb-10 text-center">
            Доступні розіграші:
          </h1>

          <div className="flex flex-col gap-8">
            {raffles.map((r) => (
              <div
                key={r.id}
                onClick={() => handleOpenRaffle(r.id)}
                className="block cursor-pointer flex flex-col md:flex-row bg-gradient-to-r from-[#ffe6e1] to-[#fff5d7]
                           rounded-2xl p-6 shadow-lg hover:scale-[1.02] hover:shadow-xl transition"
              >
                {/* Ліва частина */}
                <div className="flex flex-1 gap-4 items-center">
                  <img
                    src={r.img}
                    alt={r.title}
                    className="w-20 h-20 rounded-full object-cover border-2 border-white"
                  />

                  <div className="flex flex-col w-full">
                    <h2 className="text-2xl font-bold">{r.title}</h2>

                    {/* прогрес */}
                    <div className="w-full h-3 bg-white rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-orange-400"
                        style={{ width: `${(r.current / r.target) * 100}%` }}
                      ></div>
                    </div>

                    <p className="text-xl font-bold mt-2">
                      {r.current} ₴ / {r.target} ₴
                    </p>
                    <p className="text-gray-600 text-sm">{r.owner}</p>
                  </div>
                </div>

                {/* Права частина */}
                <div className="flex flex-1 flex-col justify-center mt-6 md:mt-0 md:pl-10">
                  <p className="text-lg font-semibold">
                    Мінімальний внесок:{" "}
                    <span className="font-bold">{r.min} ₴</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Тип розіграшу:{" "}
                    <span className="font-bold">{r.type}</span>
                  </p>
                  <p className="text-lg font-semibold">
                    Кількість переможців:{" "}
                    <span className="font-bold">{r.winners}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}
