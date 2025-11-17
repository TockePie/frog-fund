import { useState } from 'react'
import { Link } from 'react-router'

import AuthModal from './components/AuthModal'

import frogMascot from '/frog.png'

function PageButton({ link, title, className }) {
  return (
    <Link to={link} className={className}>
      <button className="w-full rounded-2xl bg-[#f7b267] px-12 py-6 text-2xl font-extrabold text-gray-800 shadow-lg transition hover:scale-110 hover:bg-[#f59e50]">
        {title}
      </button>
    </Link>
  )
}

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#ff7b7b] via-[#ff985f] to-[#ffd86f] p-6">
        <div className="flex min-h-[600px] w-full max-w-6xl flex-wrap rounded-3xl bg-white p-10 shadow-2xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.15)] md:p-12">
          {/* Ліва частина */}
          <div className="flex flex-[1.6] flex-col justify-between rounded-2xl bg-gradient-to-br from-[#ffc1ad] to-[#ffe7c8] p-10 text-center shadow-inner">
            <div>
              <h2 className="mb-6 text-5xl font-extrabold text-[#2b2b2b] drop-shadow-sm">
                Привіт!
              </h2>
              <p className="mb-8 text-lg leading-relaxed font-medium text-[#3d3d3d]">
                Користуючись цим сервісом, ви можете організувати збір коштів
                або взяти участь у розіграшах, щоб мати шанс отримати неймовірні
                призи.
              </p>
              <h3 className="mb-4 text-3xl font-semibold text-[#2b2b2b]">
                Що тебе цікавить?
              </h3>
            </div>

            {/* Кнопки */}
            <div className="mt-10 flex flex-col justify-center gap-8 sm:flex-row">
              <PageButton
                link="/campaigns"
                className="flex-1"
                title="Організація збору"
              />
              <PageButton
                link="/raffles"
                className="flex-1"
                title="Участь в розіграші"
              />
            </div>
          </div>

          {/* Права частина */}
          <div className="relative flex flex-1 flex-col items-center justify-center md:pl-8">
            <div className="absolute top-10 left-1/2 -translate-x-1/2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-2xl bg-[#f7a072] px-12 py-6 text-2xl font-extrabold text-gray-800 shadow-md transition hover:scale-105 hover:bg-[#f68a58]"
              >
                Профіль
              </button>
            </div>

            {/*жабка + назва */}
            <div className="mt-28 flex flex-col items-center justify-center">
              <img
                src={frogMascot}
                alt="FrogFund Mascot"
                className="my-8 w-64 max-w-full drop-shadow-lg transition-transform hover:scale-110"
              />
              <h2 className="text-6xl font-extrabold tracking-tight text-gray-800 drop-shadow-sm">
                FrogFund
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/*вікно авторизації */}
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
