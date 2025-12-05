import { Link } from 'react-router'

import LoginModal from './components/AuthModal/login'

import frogMascot from '/frog.png'

function PageButton({ onClick, title, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} w-full rounded-2xl bg-[#f7b267] px-12 py-6 text-2xl font-extrabold text-gray-800 shadow-lg transition hover:scale-110 hover:bg-[#f59e50]`}
    >
      {title}
    </button>
  )
}

export default function App() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-6">
        <div className="flex min-h-[600px] w-full max-w-6xl flex-wrap rounded-3xl bg-white p-10 shadow-2xl">

          {/* 🔥 Лівий блок */}
          <div className="flex flex-[1.6] flex-col justify-between rounded-2xl bg-gradient-to-br from-[#ffc1ad] to-[#ffe7c8] p-10 text-center shadow-inner">

            <h2 className="mb-6 text-5xl font-extrabold text-[#2b2b2b]">
              Привіт!
            </h2>

            <p className="mb-8 text-3xl font-extrabold leading-snug text-[#2b2b2b]">
              Користуючись цим сервісом ви<br />
              запросто можете організувати збір<br />
              коштів або прийняти в них участь,<br />
              щоб мати шанс отримати неймовірні<br />
              призи.
            </p>

            <h3 className="mt-4 text-4xl font-extrabold text-[#2b2b2b]">
              Що тебе цікавить?
            </h3>

            {/* 🔥 Кнопки */}
          <div className="mt-10 flex flex-col justify-center gap-8 sm:flex-row">

            {/* Профіль */}
            <div className="flex-1 flex">
              <LoginModal
                triggerComp={
                  <button className="w-full h-full rounded-2xl bg-[#f7b267] px-12 py-6 text-2xl font-extrabold text-gray-800 shadow-lg transition hover:scale-110 hover:bg-[#f59e50]">
                    Профіль
                  </button>
                }
              />
            </div>

            {/* Розіграші */}
            <div className="flex-1 flex">
              <Link className="w-full" to="/raffles">
                <button className="w-full h-full rounded-2xl bg-[#f7b267] px-12 py-6 text-2xl font-extrabold text-gray-800 shadow-lg transition hover:scale-110 hover:bg-[#f59e50]">
                  Участь в розіграші
                </button>
              </Link>
            </div>

          </div>


          </div> 

          {/* 🔥 Правий блок з жабкою */}
          <div className="relative flex flex-1 flex-col items-center justify-center">

            <div className="mt-28 flex flex-col items-center justify-center">
              <img
                src={frogMascot}
                alt="FrogFund Mascot"
                className="my-8 w-64 drop-shadow-lg transition-transform hover:scale-110"
              />

              <h2 className="text-6xl font-extrabold tracking-tight text-gray-800 drop-shadow-sm">
                FrogFund
              </h2>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}
