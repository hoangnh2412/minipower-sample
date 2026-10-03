import { useCallback, useEffect, useMemo, useState } from 'react'
import { ListPagination, RowActions, useListPagination } from '@jarvis/core'
import type { RowActionItem } from '@jarvis/core'
import {
  AdvancedFilterBar,
  CompactPageHeader,
  FunctionMenuButton,
  KitButton,
  compactInputClass,
  compactSelectClass,
  footerBarClass,
  footerPaginationClass,
  notifyError,
  notifySuccess,
  pageStackClass,
  tableWrapClass,
} from '../../../app/ui'
import { invoicePaths } from '../routes/paths'
import { deleteDemoInvoices, loadDemoInvoices } from '../store/demoInvoiceStore'
import type { InvoiceAdvancedFilters, InvoiceRow } from '../types'

export type InvoiceListPageProps = {
  onNavigate: (path: string) => void
}

/** Demo: sinh số khi lập (SYS-FR-06) — bật BR-02 */
const DEMO_NUMBER_ON_CREATE = true

type ColumnFilterType = 'text' | 'select' | 'date'

type ColumnDef = {
  key: keyof InvoiceRow
  header: string
  align?: 'left' | 'right'
  filterType: ColumnFilterType
  filterOptions?: { label: string; value: string }[]
}

const compactFilterInputClass = `${compactInputClass} h-8 min-w-[5.5rem] max-w-none`

function defaultDateRange() {
  const now = new Date()
  const from = new Date(now.getFullYear(), now.getMonth(), 1)
  return {
    fromDate: from.toISOString().slice(0, 10),
    toDate: now.toISOString().slice(0, 10),
  }
}

function parseInvoiceDate(value: string): Date | null {
  if (!value) return null
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return new Date(value)
  const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
  return null
}

function formatAmount(value: number) {
  return new Intl.NumberFormat('vi-VN').format(value)
}

function statusClass(status: string) {
  if (status === 'Thành công') return 'bg-emerald-50 text-emerald-700'
  if (status === 'Chờ ký') return 'bg-amber-50 text-amber-700'
  if (status === 'Có lỗi') return 'bg-red-50 text-red-700'
  return 'bg-slate-100 text-slate-600'
}

function uniqueOptions(rows: InvoiceRow[], key: keyof InvoiceRow) {
  const values = new Set<string>()
  for (const row of rows) {
    const raw = String(row[key] ?? '').trim()
    if (raw) values.add(raw)
  }
  return [
    { label: 'Tất cả', value: '' },
    ...[...values].sort().map((v) => ({ label: v, value: v })),
  ]
}

function matchesAdvancedFilters(row: InvoiceRow, f: InvoiceAdvancedFilters): boolean {
  const rowDate = parseInvoiceDate(row.invoiceDate)
  const from = f.fromDate ? new Date(f.fromDate) : null
  const to = f.toDate ? new Date(f.toDate) : null
  if (from && rowDate && rowDate < from) return false
  if (to && rowDate) {
    const toEnd = new Date(to)
    toEnd.setHours(23, 59, 59, 999)
    if (rowDate > toEnd) return false
  }
  if (f.symbol && row.symbol !== f.symbol) return false
  if (f.status && row.status !== f.status) return false
  if (f.cqtCode && row.cqtCode !== f.cqtCode) return false
  if (f.buyerTaxCode && !row.buyerTaxCode.includes(f.buyerTaxCode)) return false
  if (f.buyerName && !row.buyerName.toLowerCase().includes(f.buyerName.toLowerCase())) return false
  return true
}

function matchesColumnFilters(row: InvoiceRow, filters: Record<string, string>): boolean {
  for (const [key, raw] of Object.entries(filters)) {
    const q = raw.trim()
    if (!q) continue
    const val = String(row[key as keyof InvoiceRow] ?? '')
    if (key === 'invoiceDate') {
      const rowIso = parseInvoiceDate(row.invoiceDate)?.toISOString().slice(0, 10) ?? row.invoiceDate
      if (rowIso !== q) return false
      continue
    }
    if (key === 'totalAmount') {
      if (String(row.totalAmount) !== q && !val.includes(q)) return false
      continue
    }
    if (val !== q && !val.toLowerCase().includes(q.toLowerCase())) return false
  }
  return true
}

function ColumnFilterControl({
  col,
  value,
  onChange,
}: {
  col: ColumnDef
  value: string
  onChange: (value: string) => void
}) {
  if (col.filterType === 'select') {
    return (
      <select
        className={`${compactSelectClass} h-8 w-full min-w-[5.5rem]`}
        value={value}
        aria-label={`Lọc ${col.header}`}
        onChange={(e) => onChange(e.target.value)}
      >
        {(col.filterOptions ?? [{ label: 'Tất cả', value: '' }]).map((opt) => (
          <option key={opt.value || '__all'} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }
  if (col.filterType === 'date') {
    return (
      <input
        type="date"
        className={compactFilterInputClass}
        value={value}
        aria-label={`Lọc ${col.header}`}
        onChange={(e) => onChange(e.target.value)}
      />
    )
  }
  return (
    <input
      className={compactFilterInputClass}
      placeholder="Lọc…"
      value={value}
      aria-label={`Lọc ${col.header}`}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

export function InvoiceListPage({ onNavigate }: InvoiceListPageProps) {
  const [rows, setRows] = useState(() => loadDemoInvoices())
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [draftFilters, setDraftFilters] = useState<InvoiceAdvancedFilters>(() => ({
    ...defaultDateRange(),
    symbol: '',
    status: '',
    cqtCode: '',
    buyerTaxCode: '',
    buyerName: '',
  }))
  const [appliedFilters, setAppliedFilters] = useState(draftFilters)
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({})
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  useEffect(() => {
    setRows(loadDemoInvoices())
  }, [])

  const filterColumns: ColumnDef[] = useMemo(
    () => [
      {
        key: 'invoiceType',
        header: 'Loại hóa đơn',
        filterType: 'select',
        filterOptions: uniqueOptions(rows, 'invoiceType'),
      },
      {
        key: 'status',
        header: 'Trạng thái',
        filterType: 'select',
        filterOptions: [
          { label: 'Tất cả', value: '' },
          { label: 'Chờ ký', value: 'Chờ ký' },
          { label: 'Thành công', value: 'Thành công' },
          { label: 'Có lỗi', value: 'Có lỗi' },
        ],
      },
      {
        key: 'cqtStatus',
        header: 'Trạng thái CQT',
        filterType: 'select',
        filterOptions: uniqueOptions(rows, 'cqtStatus'),
      },
      {
        key: 'cqtCode',
        header: 'Mã CQT',
        filterType: 'select',
        filterOptions: uniqueOptions(rows, 'cqtCode'),
      },
      {
        key: 'symbol',
        header: 'Ký hiệu',
        filterType: 'select',
        filterOptions: uniqueOptions(rows, 'symbol'),
      },
      {
        key: 'invoiceDate',
        header: 'Ngày hóa đơn',
        filterType: 'date',
      },
      {
        key: 'invoiceNo',
        header: 'Số hóa đơn',
        filterType: 'text',
      },
      {
        key: 'buyerTaxCode',
        header: 'Mã số thuế',
        filterType: 'text',
      },
      {
        key: 'buyerName',
        header: 'Tên khách hàng',
        filterType: 'text',
      },
      {
        key: 'totalAmount',
        header: 'Tổng tiền',
        align: 'right',
        filterType: 'text',
      },
    ],
    [rows],
  )

  const filteredRows = useMemo(
    () => rows.filter((r) => matchesAdvancedFilters(r, appliedFilters) && matchesColumnFilters(r, columnFilters)),
    [rows, appliedFilters, columnFilters],
  )

  const pagination = useListPagination({ total: filteredRows.length, initialSize: 50 })

  const pagedRows = useMemo(() => {
    const start = (pagination.page - 1) * pagination.size
    return filteredRows.slice(start, start + pagination.size)
  }, [filteredRows, pagination.page, pagination.size])

  const pageIds = pagedRows.map((r) => r.id)
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id))

  const selectedRows = useMemo(
    () => rows.filter((r) => selectedIds.includes(r.id)),
    [rows, selectedIds],
  )

  const canEdit =
    selectedIds.length === 1 &&
    selectedRows[0]?.status === 'Chờ ký' &&
    !selectedRows[0]?.signed

  const canDelete =
    selectedIds.length > 0 &&
    selectedRows.every((r) => r.status === 'Chờ ký' && !r.signed)

  const canRefreshCqt = selectedRows.some((r) => r.status === 'Có lỗi' || (r.signed && !r.cqtCode))

  const canDownloadXml = selectedRows.some((r) => r.status === 'Thành công')

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const toggleSelectAll = () => {
    if (allPageSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)))
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageIds])])
    }
  }

  const openCreate = useCallback(() => {
    onNavigate(invoicePaths.create)
  }, [onNavigate])

  const openEdit = useCallback(() => {
    if (!canEdit) return
    const row = selectedRows[0]
    if (row.signed || row.status !== 'Chờ ký') {
      notifyError('INV-BR-01', 'Hóa đơn đã ký không được chỉnh sửa')
      return
    }
    onNavigate(invoicePaths.edit(row.id))
  }, [canEdit, onNavigate, selectedRows])

  const handleDelete = useCallback(() => {
    if (!canDelete) {
      if (selectedRows.some((r) => r.signed)) {
        notifyError('INV-BR-01', 'Hóa đơn đã ký không được xóa')
      }
      return
    }
    if (!window.confirm(`Xóa ${selectedIds.length} hóa đơn đã chọn?`)) return

    if (DEMO_NUMBER_ON_CREATE) {
      for (const row of selectedRows) {
        if (!row.invoiceNo) continue
        const sameSymbol = rows.filter(
          (r) => r.symbol === row.symbol && r.status === 'Chờ ký' && r.invoiceNo,
        )
        const maxNo = Math.max(...sameSymbol.map((r) => Number(r.invoiceNo) || 0))
        if (Number(row.invoiceNo) < maxNo) {
          notifyError(
            'INV-BR-02',
            'Phải xóa hóa đơn có số lớn nhất trước (sinh số khi lập).',
          )
          return
        }
      }
    }

    deleteDemoInvoices(selectedIds)
    setRows(loadDemoInvoices())
    setSelectedIds([])
    notifySuccess('INV-API-200', 'Đã xóa hóa đơn đã chọn')
  }, [canDelete, rows, selectedIds, selectedRows])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F4') {
        e.preventDefault()
        openCreate()
      }
      if (e.key === 'F3') {
        e.preventDefault()
        openEdit()
      }
      if (e.key === 'F8') {
        e.preventDefault()
        handleDelete()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [openCreate, openEdit, handleDelete])

  const setDraft = (key: keyof InvoiceAdvancedFilters, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }))
  }

  const applyDateFilters = (next: InvoiceAdvancedFilters) => {
    setAppliedFilters((prev) => ({
      ...prev,
      fromDate: next.fromDate,
      toDate: next.toDate,
    }))
  }

  const applyAdvancedSearch = () => {
    setAppliedFilters({ ...draftFilters })
  }

  const resetAllFilters = () => {
    const defaults = {
      ...defaultDateRange(),
      symbol: '',
      status: '',
      cqtCode: '',
      buyerTaxCode: '',
      buyerName: '',
    }
    setDraftFilters(defaults)
    setAppliedFilters(defaults)
    setColumnFilters({})
  }

  const rowActions = (row: InvoiceRow): RowActionItem[] => {
    const actions: RowActionItem[] = [
      {
        id: 'view',
        label: 'Xem in',
        onClick: () => notifySuccess('INV-API-200', 'Mở xem in (demo)'),
      },
      {
        id: 'copy',
        label: 'Sao chép',
        onClick: () => onNavigate(invoicePaths.copy(row.id)),
      },
    ]
    if (!row.signed && row.status === 'Chờ ký') {
      actions.unshift(
        {
          id: 'edit',
          label: 'Sửa',
          onClick: () => onNavigate(invoicePaths.edit(row.id)),
        },
        {
          id: 'sign',
          label: 'Ký gửi CQT',
          onClick: () => notifySuccess('INV-API-200', 'Ký gửi CQT (demo)'),
        },
      )
    }
    return actions
  }

  const primaryToolbar = (
    <>
      <KitButton
        label="Tải DL"
        outlined
        onClick={() => {
          setRows(loadDemoInvoices())
          notifySuccess('INV-API-200', 'Đã tải lại dữ liệu')
        }}
      />
      <KitButton label="Tạo F4" icon="pi pi-plus" variant="primary" onClick={openCreate} />
      <KitButton
        label="Sửa F3"
        icon="pi pi-pencil"
        outlined
        disabled={!canEdit}
        onClick={openEdit}
      />
      <KitButton label="Xóa F8" variant="danger" outlined disabled={!canDelete} onClick={handleDelete} />
      <KitButton
        label="Lấy lại mã CQT"
        variant="special"
        disabled={!canRefreshCqt}
        onClick={() => notifySuccess('INV-API-200', 'Đã lấy lại mã CQT (demo)')}
      />
      <FunctionMenuButton
        items={[
          {
            id: 'download-xml',
            label: 'Tải XML',
            disabled: !canDownloadXml,
            onClick: () => {
              if (!canDownloadXml) {
                notifyError('INV-VAL-010', 'Chỉ tải XML hóa đơn đã ký thành công')
                return
              }
              notifySuccess('INV-API-200', 'Tải XML (demo)')
            },
          },
          {
            id: 'update-cqt',
            label: 'Cập nhật TT CQT',
            onClick: () => notifySuccess('INV-API-200', 'Đã cập nhật trạng thái CQT (demo)'),
          },
          { id: 'batch-sign', label: 'Ký hàng loạt', disabled: true },
          { id: 'business', label: 'Nghiệp vụ…', disabled: true, separatorBefore: true },
          { id: 'columns', label: 'Cài đặt cột', onClick: () => undefined },
        ]}
      />
    </>
  )

  const advancedPanel = (
    <>
      <select
        className={compactSelectClass}
        value={draftFilters.symbol}
        aria-label="Ký hiệu hóa đơn"
        onChange={(e) => setDraft('symbol', e.target.value)}
      >
        <option value="">Tất cả ký hiệu</option>
        <option value="1C26TAH">1C26TAH</option>
      </select>
      <select
        className={compactSelectClass}
        value={draftFilters.status}
        aria-label="Trạng thái"
        onChange={(e) => setDraft('status', e.target.value)}
      >
        <option value="">Tất cả trạng thái</option>
        <option value="Chờ ký">Chờ ký</option>
        <option value="Thành công">Thành công</option>
        <option value="Có lỗi">Có lỗi</option>
      </select>
      <select
        className={compactSelectClass}
        value={draftFilters.cqtCode}
        aria-label="Mã CQT"
        onChange={(e) => setDraft('cqtCode', e.target.value)}
      >
        {uniqueOptions(rows, 'cqtCode').map((opt) => (
          <option key={opt.value || '__all'} value={opt.value}>
            {opt.value ? opt.label : 'Tất cả mã CQT'}
          </option>
        ))}
      </select>
      <input
        className={compactInputClass}
        placeholder="Mã số thuế người mua"
        value={draftFilters.buyerTaxCode}
        aria-label="Mã số thuế người mua"
        onChange={(e) => setDraft('buyerTaxCode', e.target.value)}
      />
      <input
        className={compactInputClass}
        placeholder="Tên khách hàng"
        value={draftFilters.buyerName}
        aria-label="Tên khách hàng"
        onChange={(e) => setDraft('buyerName', e.target.value)}
      />
      <KitButton label="Tìm" variant="primary" onClick={applyAdvancedSearch} />
      <KitButton label="Xóa lọc" outlined onClick={resetAllFilters} />
    </>
  )

  return (
    <div className={pageStackClass}>
      <CompactPageHeader title="Hóa đơn đầu ra" actions={primaryToolbar} />

      <AdvancedFilterBar
        fromDate={draftFilters.fromDate}
        toDate={draftFilters.toDate}
        advancedOpen={advancedOpen}
        onAdvancedToggle={() => setAdvancedOpen((v) => !v)}
        advancedPanel={advancedPanel}
        onFromDateChange={(v) => {
          const next = { ...draftFilters, fromDate: v }
          setDraftFilters(next)
          applyDateFilters(next)
        }}
        onToDateChange={(v) => {
          const next = { ...draftFilters, toDate: v }
          setDraftFilters(next)
          applyDateFilters(next)
        }}
      />

      <div className={tableWrapClass}>
        <table className="w-full min-w-[1200px] border-collapse text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/90">
            <tr>
              <th className="w-8 px-2 py-1.5">
                <input
                  type="checkbox"
                  className="size-3.5 rounded border-slate-300"
                  checked={allPageSelected}
                  aria-label="Chọn tất cả"
                  onChange={toggleSelectAll}
                />
              </th>
              {filterColumns.map((col) => (
                <th
                  key={col.key}
                  className={`whitespace-nowrap px-2 py-1.5 text-xs font-medium text-slate-600 ${col.align === 'right' ? 'text-right' : ''}`}
                >
                  {col.header}
                </th>
              ))}
              <th className="px-2 py-1.5 text-xs font-medium text-slate-600">Thao tác</th>
            </tr>
            <tr className="border-b border-slate-100 bg-white">
              <th className="px-2 py-1" />
              {filterColumns.map((col) => (
                <th key={`f-${col.key}`} className="px-2 py-1">
                  <ColumnFilterControl
                    col={col}
                    value={columnFilters[col.key] ?? ''}
                    onChange={(value) =>
                      setColumnFilters((prev) => ({ ...prev, [col.key]: value }))
                    }
                  />
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100 hover:bg-teal-50/30">
                <td className="px-2 py-1.5">
                  <input
                    type="checkbox"
                    className="size-3.5 rounded border-slate-300"
                    checked={selectedIds.includes(row.id)}
                    aria-label={`Chọn ${row.invoiceNo || row.id}`}
                    onChange={() => toggleSelect(row.id)}
                  />
                </td>
                <td className="px-2 py-1.5">{row.invoiceType}</td>
                <td className="px-2 py-1.5">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusClass(row.status)}`}
                    title={row.cqtStatus ? `[CQT] ${row.cqtStatus}` : undefined}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-2 py-1.5">{row.cqtStatus || '—'}</td>
                <td className="px-2 py-1.5 font-mono text-xs">{row.cqtCode || '—'}</td>
                <td className="px-2 py-1.5">{row.symbol || '—'}</td>
                <td className="px-2 py-1.5">
                  {(parseInvoiceDate(row.invoiceDate)?.toLocaleDateString('vi-VN') ??
                    row.invoiceDate) ||
                    '—'}
                </td>
                <td className="px-2 py-1.5">{row.invoiceNo || '—'}</td>
                <td className="px-2 py-1.5 font-mono text-xs">{row.buyerTaxCode}</td>
                <td className="px-2 py-1.5">{row.buyerName}</td>
                <td className="px-2 py-1.5 text-right tabular-nums">{formatAmount(row.totalAmount)}</td>
                <td className="px-2 py-1.5">
                  <RowActions actions={rowActions(row)} />
                </td>
              </tr>
            ))}
            {pagedRows.length === 0 ? (
              <tr>
                <td colSpan={filterColumns.length + 2} className="px-2 py-8 text-center text-sm text-red-600">
                  Không tìm thấy kết quả
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className={footerBarClass}>
        <ListPagination
          className={footerPaginationClass}
          total={filteredRows.length}
          page={pagination.page}
          size={pagination.size}
          pageInput={pagination.pageInput}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setPage}
          onSizeChange={pagination.setSize}
          onPageInputChange={pagination.setPageInput}
          onCommitPageInput={pagination.commitPageInput}
        />
      </div>
    </div>
  )
}
