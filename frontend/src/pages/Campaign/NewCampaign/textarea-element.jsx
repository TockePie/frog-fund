import { useController } from 'react-hook-form'

import { Textarea } from '@/components/ui/textarea'

export default function TextareaElement({
  label,
  name,
  control,
  rules,
  ...props
}) {
  const {
    field,
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue: ''
  })

  return (
    <div className="flex flex-col items-start gap-2 md:gap-3">
      <label className="font-medium text-stone-600 min-md:text-lg">
        {label}
      </label>
      <Textarea
        {...field}
        {...props}
        className="min-h-28 rounded-lg border-stone-400 bg-white shadow-none min-md:text-lg"
      />
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  )
}
