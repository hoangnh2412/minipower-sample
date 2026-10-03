import { useState } from 'react'
import { notify } from '@jarvis/core'
import { CompactPageHeader } from './CompactPageHeader'
import { KitButton } from './KitButton'
import { FormFields } from './FormFields'
import type { SettingsFormConfig } from './types'
import { pageStackClass, panelClass } from './layout'

type SettingsFormPageProps = {
  config: SettingsFormConfig
  headerPrefix?: React.ReactNode
  hideTitle?: boolean
}

export function SettingsFormPage({ config, headerPrefix, hideTitle = false }: SettingsFormPageProps) {
  const [values, setValues] = useState(config.initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (name: string, value: string | number | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors: Record<string, string> = {}
    for (const section of config.sections) {
      for (const field of section.fields) {
        if (!field.required) continue
        const value = values[field.name]
        if (value == null || String(value).trim() === '') {
          nextErrors[field.name] = 'Trường bắt buộc'
        }
      }
    }
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }
    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      notify.success('Lưu thành công')
    }, 400)
  }

  const handleReset = () => {
    setValues(config.initialValues)
    setErrors({})
  }

  const headerActions = (
    <>
      {headerPrefix}
      <KitButton type="button" label="Hủy" outlined size="md" disabled={submitting} onClick={handleReset} />
      <KitButton
        type="submit"
        form="settings-form"
        label="Lưu"
        variant="primary"
        size="md"
        loading={submitting}
        disabled={submitting}
      />
    </>
  )

  return (
    <div className={pageStackClass}>
      {!hideTitle && config.title ? (
        <CompactPageHeader title={config.title} actions={headerActions} />
      ) : null}

      <form id="settings-form" onSubmit={handleSubmit} className={`${panelClass} p-3`}>
        <div className="flex flex-col gap-3">
          {config.sections.map((section, idx) => (
            <section key={section.title ?? idx}>
              {section.title ? (
                <h3 className="mb-2 text-sm font-semibold text-slate-800">{section.title}</h3>
              ) : null}
              <FormFields
                fields={section.fields}
                values={values}
                errors={errors}
                onChange={handleChange}
              />
            </section>
          ))}
        </div>
      </form>
    </div>
  )
}
