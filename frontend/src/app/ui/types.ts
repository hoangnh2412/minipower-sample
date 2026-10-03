import type { ReactNode } from 'react'

export type FieldOption = {
  label: string
  value: string
}

export type FormFieldDef = {
  name: string
  label: string
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'date' | 'password'
  required?: boolean
  placeholder?: string
  options?: FieldOption[]
  span?: 1 | 2
  hint?: string
}

export type ColumnDef<T extends Record<string, unknown>> = {
  key: keyof T & string
  header: string
  width?: string
  align?: 'left' | 'right' | 'center'
  render?: (row: T) => ReactNode
  filterable?: boolean
}

export type ToolbarAction = {
  id: string
  label: string
  severity?: 'primary' | 'secondary' | 'danger'
  outlined?: boolean
  icon?: string
  onClick?: () => void
  disabled?: boolean
}

export type CrudConfig<T extends Record<string, unknown>> = {
  title: string
  description?: string
  entityName: string
  columns: ColumnDef<T>[]
  formFields: FormFieldDef[]
  toolbarExtra?: ToolbarAction[]
  showCopy?: boolean
  showExcel?: boolean
  initialData: T[]
  getEmptyRow: () => T
  dialogSize?: 'md' | 'lg' | 'xl' | '2xl'
}

export type SettingsSection = {
  title?: string
  fields: FormFieldDef[]
}

export type SettingsFormConfig = {
  title: string
  description?: string
  sections: SettingsSection[]
  initialValues: Record<string, string | number | boolean>
}
