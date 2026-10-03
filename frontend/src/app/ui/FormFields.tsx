import { InputText } from 'primereact/inputtext'
import { Label } from 'primereact/label'
import { Select } from 'primereact/select'
import { Textarea } from 'primereact/textarea'
import { PasswordInput } from '@jarvis/core'
import type { FormFieldDef } from './types'
import { errorClass, inputClass, inputInvalidClass, labelClass } from './fieldStyles'

type FormFieldsProps = {
  fields: FormFieldDef[]
  values: Record<string, string | number | boolean>
  errors?: Record<string, string>
  onChange: (name: string, value: string | number | boolean) => void
}

export function FormFields({ fields, values, errors = {}, onChange }: FormFieldsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {fields.map((field) => {
        const value = values[field.name]
        const invalid = Boolean(errors[field.name])
        const spanClass = field.span === 2 ? 'md:col-span-2' : ''

        return (
          <div key={field.name} className={spanClass}>
            <Label htmlFor={field.name} className={labelClass}>
              {field.label}
              {field.required ? <span className="text-red-500"> *</span> : null}
            </Label>

            {field.type === 'textarea' ? (
              <Textarea
                id={field.name}
                unstyled
                rows={3}
                value={String(value ?? '')}
                placeholder={field.placeholder}
                className={`${invalid ? inputInvalidClass : inputClass} min-h-[88px] py-2.5`}
                onChange={(e: { target: { value: string } }) => onChange(field.name, e.target.value)}
              />
            ) : field.type === 'select' ? (
              <Select.Root
                value={String(value ?? '')}
                options={field.options ?? []}
                optionLabel="label"
                optionValue="value"
                onValueChange={(e: { value?: unknown }) =>
                  onChange(field.name, String(e.value ?? ''))
                }
              >
                <Select.Trigger
                  type="button"
                  className={`${invalid ? inputInvalidClass : inputClass} flex items-center justify-between`}
                >
                  <Select.Value placeholder={field.placeholder ?? 'Chọn…'} />
                  <Select.Indicator className="text-slate-400">▾</Select.Indicator>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Positioner className="z-[300]">
                    <Select.Popup className="min-w-[var(--px-positioner-anchor-width)] overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg">
                      <Select.List className="m-0 list-none p-0 outline-none">
                        {(field.options ?? []).map((opt, index) => (
                          <Select.Option
                            key={opt.value}
                            index={index}
                            className="cursor-pointer px-3 py-2 text-sm text-slate-800 outline-none data-[focused]:bg-slate-50 data-[selected]:bg-teal-50 data-[selected]:font-medium data-[selected]:text-teal-800"
                          >
                            {opt.label}
                          </Select.Option>
                        ))}
                      </Select.List>
                    </Select.Popup>
                  </Select.Positioner>
                </Select.Portal>
              </Select.Root>
            ) : field.type === 'password' ? (
              <PasswordInput
                id={field.name}
                value={String(value ?? '')}
                invalid={invalid}
                placeholder={field.placeholder}
                onValueChange={(e: { value?: string | null }) =>
                  onChange(field.name, e.value ?? '')
                }
              />
            ) : (
              <InputText
                id={field.name}
                type={field.type === 'email' ? 'email' : field.type === 'number' ? 'number' : 'text'}
                unstyled
                value={String(value ?? '')}
                placeholder={field.placeholder}
                className={invalid ? inputInvalidClass : inputClass}
                onChange={(e: { target: { value: string } }) => onChange(field.name, e.target.value)}
              />
            )}

            {field.hint ? <p className="mt-1 text-xs text-slate-500">{field.hint}</p> : null}
            {errors[field.name] ? (
              <p className={errorClass}>{errors[field.name]}</p>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
