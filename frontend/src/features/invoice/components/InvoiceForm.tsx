import { useEffect, useMemo, useState } from 'react'
import { CompactPageHeader, KitButton, notifyError, notifySuccess, pageStackClass, panelClass } from '../../../app/ui'
import { FormFields } from '../../../app/ui/FormFields'
import type { FormFieldDef } from '../../../app/ui/types'
import { inputClass, errorClass } from '../../../app/ui/fieldStyles'
import type { InvoiceRow } from '../types'
import {
  calcInvoiceTotals,
  calcLineItem,
  numberToVietnameseWords,
} from '../utils/invoiceCalc'
import { lookupBuyerByMst } from '../utils/mstLookup'
import { validateInvoiceForm, type FieldErrors } from '../validation/invoiceForm'

/** Demo CTS — đặt false để kiểm INV-BR-08 */
const DEMO_HAS_CTS = true

type LineItem = {
  id: string
  selected: boolean
  productCode: string
  productName: string
  uom: string
  qty: string
  unitPrice: string
  discountPercent: string
  vatRate: string
}

export type InvoiceFormProps = {
  editing?: InvoiceRow | null
  copySource?: InvoiceRow | null
  onCancel: () => void
  onSaved: (row: InvoiceRow, isEdit: boolean) => void
}

const SYMBOL_OPTIONS = [{ label: '1C26TAH — Hóa đơn GTGT', value: '1C26TAH' }]

const headerFieldsLeft: FormFieldDef[] = [
  {
    name: 'symbol',
    label: 'Ký hiệu',
    type: 'select',
    required: true,
    options: SYMBOL_OPTIONS,
  },
  { name: 'invoiceDate', label: 'Ngày HĐ', type: 'date', required: true },
  { name: 'invoiceNo', label: 'Số HĐ', type: 'text', placeholder: 'Sinh khi lưu' },
  {
    name: 'currency',
    label: 'Tiền tệ',
    type: 'select',
    required: true,
    options: [
      { label: 'VND', value: 'VND' },
      { label: 'USD', value: 'USD' },
    ],
  },
  { name: 'exchangeRate', label: 'Tỷ giá', type: 'number', required: true },
  {
    name: 'paymentMethod',
    label: 'HTTT',
    type: 'select',
    required: true,
    options: [
      { label: 'Tiền mặt', value: 'TM' },
      { label: 'Chuyển khoản', value: 'CK' },
    ],
  },
  { name: 'orderNo', label: 'Số ĐH/BK CK', type: 'text' },
]

const sellerFields: FormFieldDef[] = [
  { name: 'sellerTaxCode', label: 'MST', type: 'text', required: true },
  { name: 'sellerName', label: 'Tên ĐV', type: 'text', required: true, span: 2 },
  { name: 'sellerAddress', label: 'Địa chỉ', type: 'textarea', required: true, span: 2 },
  { name: 'sellerEmail', label: 'Email', type: 'email' },
  { name: 'sellerPhone', label: 'SĐT', type: 'text' },
]

const buyerFields: FormFieldDef[] = [
  { name: 'buyerTaxCode', label: 'MST', type: 'text' },
  { name: 'buyerCode', label: 'Mã KH', type: 'text' },
  { name: 'buyerName', label: 'Tên ĐV', type: 'text', required: true },
  { name: 'buyerPersonName', label: 'Tên người mua', type: 'text' },
  { name: 'buyerAddress', label: 'Địa chỉ', type: 'textarea', required: true, span: 2 },
  { name: 'buyerEmail', label: 'Email', type: 'email' },
]

const defaultHeader = {
  symbol: '1C26TAH',
  invoiceDate: new Date().toISOString().slice(0, 10),
  invoiceNo: '',
  currency: 'VND',
  exchangeRate: '1',
  paymentMethod: 'CK',
  orderNo: 'PO-2026-10-0042 / BK-987654321',
  sellerTaxCode: '0106026495',
  sellerName: 'CÔNG TY TNHH DEMO HÓA ĐƠN ĐIỆN TỬ MINIPOWER',
  sellerAddress:
    'Tầng 12, Tòa nhà Landmark, Số 5 Đường Nguyễn Du, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  sellerEmail: 'contact@demo-hddt.minipower.vn',
  sellerPhone: '02838234567',
  buyerTaxCode: '0102345678',
  buyerCode: 'KH-0015',
  buyerName: 'CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ DỊCH VỤ KỸ THUẬT CÔNG NGHỆ THÔNG MINH VIỆT NAM',
  buyerPersonName: 'Nguyễn Văn An',
  buyerAddress: '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  buyerEmail: 'contact15@khachhang-demo.vn',
}

const demoCreateLines: Omit<LineItem, 'id' | 'selected'>[] = [
  {
    productCode: 'SP001',
    productName: 'Dịch vụ phần mềm HĐĐT theo tháng — gói 50 user',
    uom: 'Tháng',
    qty: '12',
    unitPrice: '850000',
    discountPercent: '5',
    vatRate: '10',
  },
  {
    productCode: 'SP002',
    productName: 'Gói triển khai và đào tạo hóa đơn điện tử tại doanh nghiệp',
    uom: 'Gói',
    qty: '1',
    unitPrice: '15000000',
    discountPercent: '0',
    vatRate: '10',
  },
  {
    productCode: 'SP003',
    productName: 'Phí duy trì chứng thư số USB Token — năm 2026',
    uom: 'Cái',
    qty: '3',
    unitPrice: '1200000',
    discountPercent: '0',
    vatRate: '8',
  },
  {
    productCode: 'SP004',
    productName: 'Dịch vụ tích hợp API phát hành hóa đơn với ERP nội bộ',
    uom: 'Lượt',
    qty: '1',
    unitPrice: '25000000',
    discountPercent: '10',
    vatRate: '10',
  },
]

function emptyLine(): LineItem {
  return {
    id: crypto.randomUUID(),
    selected: false,
    productCode: '',
    productName: '',
    uom: '',
    qty: '1',
    unitPrice: '0',
    discountPercent: '0',
    vatRate: '10',
  }
}

function rowToHeader(row: InvoiceRow) {
  return {
    ...defaultHeader,
    symbol: row.symbol,
    invoiceDate: row.invoiceDate.includes('/')
      ? row.invoiceDate
      : row.invoiceDate || defaultHeader.invoiceDate,
    invoiceNo: row.invoiceNo,
    currency: row.currency,
    exchangeRate: row.exchangeRate,
    paymentMethod: row.paymentMethod,
    sellerTaxCode: row.sellerTaxCode,
    sellerName: row.sellerName,
    sellerAddress: row.sellerAddress,
    buyerTaxCode: row.buyerTaxCode,
    buyerName: row.buyerName,
    buyerAddress: row.buyerAddress,
  }
}

function SectionCard({
  title,
  fields,
  values,
  errors,
  onChange,
  extra,
}: {
  title: string
  fields: FormFieldDef[]
  values: Record<string, string | number | boolean>
  errors: FieldErrors
  onChange: (name: string, value: string | number | boolean) => void
  extra?: React.ReactNode
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
      <h3 className="mb-3 text-sm font-semibold text-slate-800">{title}</h3>
      {extra}
      <FormFields fields={fields} values={values} errors={errors} onChange={onChange} />
    </section>
  )
}

function buildInitialState(editing: InvoiceRow | null | undefined, copySource: InvoiceRow | null | undefined) {
  const seed = editing ?? copySource
  if (seed) {
    const header = rowToHeader(seed)
    if (copySource && !editing) {
      header.invoiceNo = ''
    }
    return {
      values: header,
      lines: [
        {
          ...emptyLine(),
          productName: 'Hàng hóa demo',
          unitPrice: String(Math.max(0, Math.round(seed.totalAmount / 1.1))),
        },
      ],
    }
  }
  return {
    values: defaultHeader,
    lines: demoCreateLines.map((line) => ({
      ...emptyLine(),
      ...line,
      id: crypto.randomUUID(),
    })),
  }
}

export function InvoiceForm({ editing, copySource, onCancel, onSaved }: InvoiceFormProps) {
  const isEdit = Boolean(editing?.id)
  const initial = useMemo(() => buildInitialState(editing, copySource), [editing, copySource])

  const [values, setValues] = useState(initial.values)
  const [lines, setLines] = useState<LineItem[]>(initial.lines)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formBanner, setFormBanner] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [mstSearching, setMstSearching] = useState(false)
  const [dirty, setDirty] = useState(false)

  const totals = useMemo(() => {
    return calcInvoiceTotals(
      lines.map((l) => ({
        qty: Number(l.qty) || 0,
        unitPrice: Number(l.unitPrice) || 0,
        discountPercent: Number(l.discountPercent) || 0,
        vatRate: Number(l.vatRate) || 0,
      })),
    )
  }, [lines])

  const amountInWords = useMemo(() => numberToVietnameseWords(totals.total), [totals.total])

  const handleChange = (name: string, value: string | number | boolean) => {
    setDirty(true)
    setValues((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  const updateLine = (id: string, patch: Partial<LineItem>) => {
    setDirty(true)
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)))
  }

  const addLine = () => setLines((prev) => [...prev, emptyLine()])

  const removeSelectedLines = () => {
    setDirty(true)
    setLines((prev) => {
      const selected = prev.filter((l) => l.selected)
      if (selected.length === 0) return prev.length > 1 ? prev.slice(0, -1) : prev
      const next = prev.filter((l) => !l.selected)
      return next.length === 0 ? [emptyLine()] : next
    })
  }

  const handleMstSearch = async () => {
    setMstSearching(true)
    try {
      const result = await lookupBuyerByMst(String(values.buyerTaxCode))
      if (result.ok) {
        setValues((prev) => ({
          ...prev,
          buyerName: result.name,
          buyerAddress: result.address,
        }))
        notifySuccess('INV-API-200', 'Đã tra cứu MST thành công')
      } else if (result.allowManual) {
        notifyError(result.code, result.message)
      } else {
        setErrors((prev) => ({
          ...prev,
          buyerTaxCode: `[${result.code}] ${result.message}`,
        }))
      }
    } catch {
      notifyError('SYS-001', 'Không thể tra cứu MST. Thử lại sau.')
    } finally {
      setMstSearching(false)
    }
  }

  const requestCancel = () => {
    if (dirty && !window.confirm('Bỏ thay đổi chưa lưu?')) return
    onCancel()
  }

  const buildSavedRow = (): InvoiceRow => ({
    id: editing?.id ?? '',
    invoiceType: 'Gốc',
    status: 'Chờ ký',
    cqtStatus: '',
    cqtCode: '',
    symbol: String(values.symbol),
    invoiceDate: String(values.invoiceDate),
    invoiceNo: String(values.invoiceNo || editing?.invoiceNo || ''),
    buyerTaxCode: String(values.buyerTaxCode),
    buyerName: String(values.buyerName),
    buyerAddress: String(values.buyerAddress),
    totalAmount: totals.total,
    signed: false,
    currency: String(values.currency),
    exchangeRate: String(values.exchangeRate),
    paymentMethod: String(values.paymentMethod),
    sellerTaxCode: String(values.sellerTaxCode),
    sellerName: String(values.sellerName),
    sellerAddress: String(values.sellerAddress),
  })

  const handleSave = (signAfter = false) => {
    if (isEdit && editing?.signed) {
      notifyError(
        'INV-BR-01',
        'Hóa đơn đã ký không được chỉnh sửa. Vui lòng dùng nghiệp vụ thay thế/điều chỉnh (Phase 2).',
      )
      return
    }

    const fieldErrors = validateInvoiceForm(
      {
        symbol: String(values.symbol),
        invoiceDate: String(values.invoiceDate),
        currency: String(values.currency),
        exchangeRate: String(values.exchangeRate),
        paymentMethod: String(values.paymentMethod),
        sellerTaxCode: String(values.sellerTaxCode),
        sellerName: String(values.sellerName),
        sellerAddress: String(values.sellerAddress),
        buyerTaxCode: String(values.buyerTaxCode),
        buyerName: String(values.buyerName),
        buyerAddress: String(values.buyerAddress),
      },
      lines.map((l) => ({
        productName: l.productName,
        qty: l.qty,
        unitPrice: l.unitPrice,
        discountPercent: l.discountPercent,
        vatRate: l.vatRate,
      })),
    )

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      setFormBanner(fieldErrors._form ?? null)
      return
    }

    if (signAfter && !DEMO_HAS_CTS) {
      notifyError(
        'INV-BR-08',
        'Chưa cấu hình chứng thư số. Vui lòng đăng ký CTS tại Hệ thống.',
      )
      return
    }

    setSubmitting(true)
    window.setTimeout(() => {
      setSubmitting(false)
      const saved = buildSavedRow()
      if (!saved.invoiceNo && !isEdit) {
        saved.invoiceNo = String(Math.floor(Math.random() * 900) + 100)
      }
      onSaved(saved, isEdit)
      notifySuccess(
        'INV-API-200',
        signAfter
          ? 'Lưu & ký gửi CQT thành công'
          : isEdit
            ? 'Cập nhật hóa đơn thành công'
            : 'Lưu hóa đơn thành công',
      )
    }, 400)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F9') {
        e.preventDefault()
        addLine()
      }
      if (e.key === 'F8') {
        e.preventDefault()
        removeSelectedLines()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const title = isEdit
    ? 'Chỉnh sửa hóa đơn'
    : copySource
      ? 'Sao chép — Tạo hóa đơn mới'
      : 'Tạo mới Hóa đơn giá trị gia tăng'

  const buyerMstExtra = (
    <div className="mb-3 flex flex-wrap items-end gap-2 md:col-span-2">
      <KitButton
        label="Tìm kiếm MST"
        icon="pi pi-search"
        outlined
        size="md"
        loading={mstSearching}
        onClick={handleMstSearch}
      />
    </div>
  )

  return (
    <div className={pageStackClass}>
      <CompactPageHeader
        title={title}
        actions={
          <KitButton label="Quay lại" outlined icon="pi pi-arrow-left" onClick={requestCancel} />
        }
      />

      <div className={`${panelClass} flex flex-col gap-4 p-4`}>
        {formBanner ? (
          <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {formBanner}
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <SectionCard
            title="Thông tin chung"
            fields={headerFieldsLeft}
            values={values}
            errors={errors}
            onChange={handleChange}
          />
          <SectionCard
            title="Thông tin bên bán"
            fields={sellerFields}
            values={values}
            errors={errors}
            onChange={handleChange}
          />
          <SectionCard
            title="Thông tin bên mua"
            fields={buyerFields}
            values={values}
            errors={errors}
            onChange={handleChange}
            extra={buyerMstExtra}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <KitButton label="Thêm dòng F9" icon="pi pi-plus" variant="primary" onClick={addLine} />
          <KitButton
            label="Xóa dòng F8"
            icon="pi pi-trash"
            variant="danger"
            outlined
            onClick={removeSelectedLines}
          />
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full min-w-[1050px] border-collapse text-sm">
            <thead className="bg-slate-50 text-xs text-slate-600">
              <tr>
                <th className="px-2 py-2">#</th>
                <th className="px-2 py-2">STT</th>
                <th className="px-2 py-2">Mã HH</th>
                <th className="px-2 py-2">Tên hàng</th>
                <th className="px-2 py-2">UOM</th>
                <th className="px-2 py-2">SL</th>
                <th className="px-2 py-2">Đơn giá</th>
                <th className="px-2 py-2">%CK</th>
                <th className="px-2 py-2">Trước thuế</th>
                <th className="px-2 py-2">%VAT</th>
                <th className="px-2 py-2">Tiền thuế</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => {
                const calc = calcLineItem({
                  qty: Number(line.qty) || 0,
                  unitPrice: Number(line.unitPrice) || 0,
                  discountPercent: Number(line.discountPercent) || 0,
                  vatRate: Number(line.vatRate) || 0,
                })
                return (
                  <tr key={line.id} className="border-t border-slate-100">
                    <td className="px-2 py-1.5">
                      <input
                        type="checkbox"
                        className="size-3.5 rounded border-slate-300"
                        checked={line.selected}
                        onChange={(e) => updateLine(line.id, { selected: e.target.checked })}
                      />
                    </td>
                    <td className="px-2 py-1.5 text-center">{index + 1}</td>
                    <td className="px-2 py-1.5">
                      <input
                        className={`${inputClass} h-9`}
                        value={line.productCode}
                        onChange={(e) => updateLine(line.id, { productCode: e.target.value })}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        className={`${inputClass} h-9`}
                        value={line.productName}
                        onChange={(e) => updateLine(line.id, { productName: e.target.value })}
                      />
                      {errors[`line_${index}_productName`] ? (
                        <p className={`${errorClass} text-xs`}>{errors[`line_${index}_productName`]}</p>
                      ) : null}
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        className={`${inputClass} h-9`}
                        value={line.uom}
                        onChange={(e) => updateLine(line.id, { uom: e.target.value })}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        className={`${inputClass} h-9`}
                        value={line.qty}
                        onChange={(e) => updateLine(line.id, { qty: e.target.value })}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        className={`${inputClass} h-9`}
                        value={line.unitPrice}
                        onChange={(e) => updateLine(line.id, { unitPrice: e.target.value })}
                      />
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        className={`${inputClass} h-9`}
                        value={line.discountPercent}
                        onChange={(e) => updateLine(line.id, { discountPercent: e.target.value })}
                      />
                    </td>
                    <td className="px-2 py-1.5 tabular-nums text-right">
                      {calc.beforeTax.toLocaleString('vi-VN')}
                    </td>
                    <td className="px-2 py-1.5">
                      <input
                        className={`${inputClass} h-9`}
                        value={line.vatRate}
                        onChange={(e) => updateLine(line.id, { vatRate: e.target.value })}
                      />
                    </td>
                    <td className="px-2 py-1.5 tabular-nums text-right">
                      {calc.taxAmount.toLocaleString('vi-VN')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-sm md:grid-cols-4">
          <div>
            <span className="text-slate-500">Tổng CK:</span>{' '}
            <strong>{totals.discountAmount.toLocaleString('vi-VN')}</strong>
          </div>
          <div>
            <span className="text-slate-500">Chưa thuế:</span>{' '}
            <strong>{totals.beforeTax.toLocaleString('vi-VN')}</strong>
          </div>
          <div>
            <span className="text-slate-500">Tổng thuế:</span>{' '}
            <strong>{totals.taxAmount.toLocaleString('vi-VN')}</strong>
          </div>
          <div>
            <span className="text-slate-500">Tổng TT:</span>{' '}
            <strong>{totals.total.toLocaleString('vi-VN')}</strong>
          </div>
          <div className="md:col-span-4">
            <span className="text-slate-500">Bằng chữ:</span>{' '}
            <strong className="text-slate-800">{amountInWords}</strong>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-4">
          <KitButton label="Quay lại" outlined size="md" onClick={requestCancel} disabled={submitting} />
          <KitButton label="Xem trước" outlined size="md" disabled={submitting} />
          <KitButton
            label="Lưu"
            variant="primary"
            size="md"
            onClick={() => handleSave(false)}
            loading={submitting}
          />
          <KitButton
            label="Lưu & ký"
            variant="special"
            size="md"
            onClick={() => handleSave(true)}
            loading={submitting}
          />
        </div>
      </div>
    </div>
  )
}
