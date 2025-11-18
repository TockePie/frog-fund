import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import InputElement from './input-element'
import TextareaElement from './textarea-element'

export default function CreateBank() {
  const { control, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data, e) => {
    e.preventDefault()

    console.log(data)

    // navigate('/campaigns') // перенаправлення після створення
  }

  return (
    <div className="relative flex items-center justify-center bg-gradient-to-r from-rose-400 via-orange-300 to-amber-300">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-white transition hover:opacity-80"
      >
        <span className="text-2xl">←</span> Назад
      </button>

      <div className="my-20 flex w-full max-w-xl flex-col items-center gap-10 rounded-3xl bg-stone-100 p-10 px-5 text-center shadow-xl md:px-10">
        <h2 className="text-3xl font-bold">Нова банка</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-112 flex-col gap-6"
        >
          <InputElement
            label="На що збираємо?"
            name="title"
            control={control}
            placeholder="На психолога"
            rules={{ required: "Назва банки обов'язкова" }}
          />

          <TextareaElement
            label="Опис"
            name="description"
            control={control}
            placeholder="На психолога"
          />

          <InputElement
            label="Сума накопичення"
            name="target_amount"
            control={control}
            placeholder="0"
            rightIcon={<p className="text-lg">₴</p>}
          />

          <InputElement
            label="Мінімальний внесок"
            name="min_amount"
            control={control}
            placeholder="0"
            rightIcon={<p className="text-lg">₴</p>}
          />

          <button
            type="submit"
            className="mt-4 rounded-full bg-black py-3 text-lg font-bold text-white transition hover:opacity-80"
          >
            Створити
          </button>
        </form>
      </div>
    </div>
  )
}
