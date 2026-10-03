import { InvoiceForm } from '../components/InvoiceForm'
import { getDemoInvoiceById, upsertDemoInvoice } from '../store/demoInvoiceStore'
import type { InvoiceRow } from '../types'

export type InvoiceFormPageMode = 'create' | 'edit' | 'copy'

export type InvoiceFormPageProps = {
  mode: InvoiceFormPageMode
  invoiceId?: string
  onCancel: () => void
  onSaved: () => void
}

export function InvoiceFormPage({ mode, invoiceId, onCancel, onSaved }: InvoiceFormPageProps) {
  const source = invoiceId ? getDemoInvoiceById(invoiceId) : undefined

  if ((mode === 'edit' || mode === 'copy') && invoiceId && !source) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        [INV-API-404] Không tìm thấy hóa đơn.{' '}
        <button type="button" className="underline" onClick={onCancel}>
          Quay lại danh sách
        </button>
      </div>
    )
  }

  if (mode === 'edit' && source?.signed) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        [INV-BR-01] Hóa đơn đã ký không được chỉnh sửa.{' '}
        <button type="button" className="underline" onClick={onCancel}>
          Quay lại danh sách
        </button>
      </div>
    )
  }

  const handleSaved = (row: InvoiceRow, isEdit: boolean) => {
    upsertDemoInvoice(row, isEdit)
    onSaved()
  }

  return (
    <InvoiceForm
      editing={mode === 'edit' ? source : null}
      copySource={mode === 'copy' ? source : null}
      onCancel={onCancel}
      onSaved={handleSaved}
    />
  )
}
