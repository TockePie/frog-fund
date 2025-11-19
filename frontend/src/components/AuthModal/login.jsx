import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import InputElement from '@/pages/Campaign/NewCampaign/input-element'

export default function LoginModal({ triggerComp }) {
  const { control, handleSubmit, reset } = useForm()
  const navigate = useNavigate()

  const handleClose = () => {
    navigate(-1)
    reset()
  }

  const onSubmit = () => {}

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
              />
              <InputElement
                name="password"
                control={control}
                placeholder="Пароль"
              />
            </div>

            <Button type="submit" className="h-14">
              Увійти
            </Button>
          </form>

          <Button variant="ghost" className="font-semibold">
            Зареєструватися
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
