import { Link } from 'react-router'

export default function App() {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <div className="flex flex-col items-center gap-4">
        <span>
          FrogFund покликаний спростити спосіб збору коштів та створенню
          розіграшів.
        </span>

        <div className="flex gap-4">
          <Link to="/campaigns">
            <button
              className="rounded-sm bg-stone-900 px-4 py-2 text-white hover:bg-stone-800 active:bg-stone-700"
              type="button"
            >
              Мої збори
            </button>
          </Link>

          <Link to="/raffles">
            <button
              className="rounded-sm bg-stone-900 px-4 py-2 text-white hover:bg-stone-800 active:bg-stone-700"
              type="button"
            >
              Розіграші
            </button>
          </Link>
        </div>
      </div>
    </main>
  )
}
