import { useEffect, useState } from 'react'

import frogMascot from '../../res/frog.png'

const AuthModal = ({ isOpen, onClose }) => {
  const [view, setView] = useState('login')

  useEffect(() => {
    if (isOpen) {
      setView('login')
    }
  }, [isOpen])

  if (!isOpen) {
    return null
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => setView('login'), 300)
  }

  const LoginView = () => (
    <>
      <img
        src={frogMascot}
        alt="Frog"
        className="absolute -top-10 right-8 h-20 w-20"
      />
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Увійти
      </h2>
      <form>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Пошта"
            className="w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Пароль"
            className="w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>
        <button
          type="submit"
          className="mb-4 w-full rounded-lg bg-gray-800 p-3 text-lg font-bold text-white hover:bg-gray-700"
        >
          Увійти
        </button>
      </form>
      <button
        type="button"
        onClick={() => setView('register')}
        className="w-full text-center font-semibold text-gray-600 hover:underline"
      >
        Зареєструватися
      </button>
    </>
  )

  const RegisterView = () => (
    <>
      <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Реєстрація
      </h2>

      <p className="mb-6 text-center text-gray-700">
        Щоб організувати збір або взяти участь у розіграші, просимо вас
        зареєструватися.
      </p>

      <form>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Пошта"
            className="w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            placeholder="Пароль"
            className="w-full rounded-lg border border-gray-300 p-3 text-lg"
          />
        </div>
        <button
          type="submit"
          className="hover:bg-opacity-90 mb-4 w-full rounded-lg bg-[#f9a870] p-3 text-lg font-bold text-gray-800 shadow"
        >
          Реєстрація
        </button>
      </form>
      <button
        type="button"
        onClick={() => setView('login')}
        className="w-full text-center font-semibold text-gray-600 hover:underline"
      >
        Вже маєте акаунт? Увійти
      </button>
    </>
  )

  return (
    <div
      onClick={handleClose}
      className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-xl p-8 shadow-xl ${view === 'login' ? 'bg-white' : 'bg-gray-200'}`}
      >
        {view === 'login' ? <LoginView /> : <RegisterView />}
      </div>
    </div>
  )
}

export default AuthModal
