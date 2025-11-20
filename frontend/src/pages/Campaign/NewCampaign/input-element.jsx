import { useController } from 'react-hook-form'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from '@/components/ui/input-group'

export default function InputElement({
  label,
  rightIcon,
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
      {label && (
        <label className="flex gap-2 font-medium text-stone-600 min-md:text-lg">
          {label}
          {rules && Object.prototype.hasOwnProperty.call(rules, 'required') && (
            <span className="text-red-600">*</span>
          )}
        </label>
      )}
      <InputGroup className="h-14 rounded-lg border-stone-400 bg-white shadow-none">
        <InputGroupInput {...field} {...props} className="min-md:text-lg" />
        {rightIcon && (
          <InputGroupAddon align="inline-end">{rightIcon}</InputGroupAddon>
        )}
      </InputGroup>
      {error && <span className="text-red-600">{error.message}</span>}
    </div>
  )
}
