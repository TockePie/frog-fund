import { useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
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
import { signUp } from "@/lib/api/auth"
import InputElement from "@/pages/Campaign/NewCampaign/input-element"

const registerSchema = z
  .object({
    name: z.string().min(2, "Введіть ім’я"),
    email: z.email("Неправильна пошта"),
    password: z.string().min(8, "Пароль має мінімум 8 символів"),
    confirmPassword: z.string().min(8, "Підтвердження обов’язкове"),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Паролі не співпадають",
    path: ["confirmPassword"],
  })

export default function RegisterModal({ triggerComp }) {
  const closeRef = useRef(null)

  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const { mutate, data, isSuccess, error, isPending } = useMutation({
    mutationFn: signUp,
  })

  const onSubmit = (form) => {
    mutate({
      name: form.name,
      email: form.email,
      password: form.password,
    })
  }

  useEffect(() => {
    if (isSuccess) {
      Cookies.set("jwt", data.data.token, { expires: 7 })
      const timer = setTimeout(() => closeRef.current?.click(), 1500)
      return () => clearTimeout(timer)
    }
  }, [isSuccess])

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) reset()
      }}
    >
      <DialogTrigger asChild>{triggerComp}</DialogTrigger>

      <DialogContent className="flex w-full max-w-lg flex-col items-center gap-10 rounded-3xl bg-stone-100 p-10 text-center shadow-xl">
        <DialogTitle className="text-3xl font-bold">Реєстрація</DialogTitle>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full max-w-96 flex-col gap-8"
        >
          <InputElement name="name" placeholder="Ваше ім’я" control={control} />
          <InputElement name="email" placeholder="Пошта" control={control} />
          <InputElement
            name="password"
            type="password"
            placeholder="Пароль"
            control={control}
          />
          <InputElement
            name="confirmPassword"
            type="password"
            placeholder="Підтвердження пароля"
            control={control}
          />

          {error && <p className="text-red-600">{error.message}</p>}

          <Button disabled={isPending || isSuccess} className="h-14">
            {isSuccess ? "Успішно!" : "Зареєструватися"}
          </Button>
        </form>
      </DialogContent>

      <DialogClose ref={closeRef} className="hidden" />
    </Dialog>
  )
}
