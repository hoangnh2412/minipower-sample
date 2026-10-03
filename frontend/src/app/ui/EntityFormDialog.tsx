import { useEffect, useState, type ReactNode } from 'react'
import { FeatureDialog } from '@jarvis/core'
import { FormFields } from './FormFields'
import type { FormFieldDef } from './types'

type EntityFormDialogProps = {
  open: boolean
  title: string
  fields: FormFieldDef[]
  initialValues: Record<string, string | number | boolean>
  size?: 'md' | 'lg' | 'xl' | '2xl'
  onClose: () => void
  onSave: (values: Record<string, string | number | boolean>) => void
  children?: ReactNode
}

function validateFields(
  fields: FormFieldDef[],
  values: Record<string, string | number | boolean>,
) {
  const errors: Record<string, string> = {}
  for (const field of fields) {
    if (!field.required) continue
    const value = values[field.name]
    if (value == null || String(value).trim() === '') {
      errors[field.name] = 'Trường bắt buộc'
    }
  }
  return errors
}

export function EntityFormDialog({
  open,
  title,
  fields,
  initialValues,
  size = 'lg',
  onClose,
  onSave,
  children,
}: EntityFormDialogProps) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (open) {
      setValues(initialValues)
      setErrors({})
    }
  }, [initialValues, open])

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validateFields(fields, values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    onSave(values)
  }

  return (
    <FeatureDialog
      open={open}
      onClose={onClose}
      title={title}
      size={size}
      onSubmit={handleSubmit}
    >
      {children}
      <FormFields fields={fields} values={values} errors={errors} onChange={handleChange} />
    </FeatureDialog>
  )
}
