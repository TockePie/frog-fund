import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import z from 'zod'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { logIn } from '@/lib/api/auth'
import InputElement from '@/pages/Campaign/NewCampaign/input-element'

const loginSchema = z.object({
  email: z.email('Неправильна пошта'),
  password: z.string().min(8, 'Пароль має бути щонайменше 8 символів')
})

export default function LoginModal({ triggerComp }) {
  const closeRef = useRef(null)
  const { data, isPending, isSuccess, mutate, error } = useMutation({
    mutationFn: logIn
  })
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema)
  })
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
    reset()
  }

  const onSubmit = (data) => {
    mutate(data)
  }

  useEffect(() => {
    if (isSuccess) {
      Cookies.set('jwt', data.data.token, { expires: 7 })

      const timer = setTimeout(() => closeRef.current?.click(), 2000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, data])

  return (
    <Dialog
      open
      onOpenChange={handleClose}
      className="justify-cente flex items-center"
    >
      <DialogTrigger>{triggerComp}</DialogTrigger>

      <DialogContent
        className="flex w-full max-w-lg flex-col items-center gap-10 rounded-3xl bg-stone-100 p-10 px-5 text-center shadow-xl md:px-10"
        aria-describedby="login modal"
      >
        <DialogTitle className="text-3xl font-bold">Увійти</DialogTitle>

        <div className="flex w-full max-w-96 flex-col gap-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-8"
          >
            <div className="flex w-full flex-col gap-4">
              <InputElement
                name="email"
                control={control}
                placeholder="Пошта"
                rules={{ required: "Це поле є обов'язковим" }}
              />
              <InputElement
                name="password"
                type="password"
                control={control}
                placeholder="Пароль"
                rules={{ required: "Це поле є обов'язковим" }}
              />
            </div>

            {error && <span className="text-red-600">{error.message}</span>}

            <Button
              type="submit"
              className="h-14"
              disabled={isPending || isSuccess}
            >
              {isSuccess ? 'Успішно!' : 'Увійти'}
            </Button>
          </form>

          <Button
            variant="ghost"
            className="font-semibold"
            disabled={isPending || isSuccess}
            onClick={() =>
              alert('Поки що не працює. Необхідно додати компонент')
            }
          >
            Зареєструватися
          </Button>
        </div>
      </DialogContent>

      <DialogClose ref={closeRef} className="hidden" />
    </Dialog>
  )
}
