import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { logIn } from "@/lib/api/auth"
import InputElement from "@/pages/Campaign/NewCampaign/input-element"

import RegisterModal from "./signup"

// 📌 Валідація полів
const loginSchema = z.object({
  email: z.email("Неправильна пошта"),
  password: z.string().min(8, "Пароль має мінімум 8 символів"),
})

export default function LoginModal({ triggerComp, open, onOpenChange }) {
  const closeRef = useRef(null)
  const navigate = useNavigate()

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const { mutate, data, isSuccess, error, isPending } = useMutation({
    mutationFn: logIn,
  })

  const isControlled = typeof open === "boolean"

  // 📌 Запит на бекенд
  const handleSubmitForm = (form) => {
    mutate(form)
  }

  // ⭐ УСПІШНИЙ ЛОГІН → ЗБЕРЕГТИ JWT + ПЕРЕЙТИ В КАБІНЕТ
  useEffect(() => {
    if (!isSuccess || !data?.data?.token) return

    // Зберігаємо JWT на 7 днів
    Cookies.set("jwt", data.data.token, { expires: 7 })

    // 🔥 АВТОМАТИЧНИЙ ПЕРЕХІД В КАБІНЕТ
    navigate("/campaigns")

    // Закриваємо модалку (керований або стандартний режим)
    if (onOpenChange) {
      onOpenChange(false)
    } else {
      const timer = setTimeout(() => closeRef.current?.click(), 1500)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, data, navigate, onOpenChange])

  // 📌 Очищення форми при закритті модалки
  const handleDialogChange = (isOpen) => {
    if (!isOpen) {
      reset()
    }

    if (onOpenChange) {
      onOpenChange(isOpen)
    }
  }

  return (
    <Dialog
      open={isControlled ? open : undefined}
      onOpenChange={handleDialogChange}
    >
      {triggerComp && <DialogTrigger asChild>{triggerComp}</DialogTrigger>}

      <DialogContent className="flex w-full max-w-lg flex-col items-center gap-10 rounded-3xl bg-stone-100 p-10 text-center shadow-xl">
        <DialogTitle className="text-3xl font-bold">Увійти</DialogTitle>

        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex w-full max-w-96 flex-col gap-8"
        >
          <InputElement name="email" placeholder="Пошта" control={control} />
          <InputElement
            name="password"
            type="password"
            placeholder="Пароль"
            control={control}
          />

          {error && <p className="text-red-600">{error.message}</p>}

          <Button disabled={isPending || isSuccess} className="h-14">
            {isSuccess ? "Успішно!" : "Увійти"}
          </Button>
        </form>

        {/* Кнопка → відкриває модалку реєстрації */}
        <RegisterModal
          triggerComp={
            <Button variant="ghost" className="font-semibold">
              Зареєструватися
            </Button>
          }
        />
      </DialogContent>

      <DialogClose ref={closeRef} className="hidden" />
    </Dialog>
  )
}
