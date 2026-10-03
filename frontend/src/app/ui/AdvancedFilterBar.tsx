import type { ReactNode } from 'react'
import { KitButton } from './KitButton'
import { labelClass } from './fieldStyles'
import { compactInputClass } from './layout'

const filterRowClass = 'flex flex-wrap items-end gap-2 py-1'

type AdvancedFilterBarProps = {
  fromDate: string
  toDate: string
  onFromDateChange: (value: string) => void
  onToDateChange: (value: string) => void
  advancedOpen: boolean
  onAdvancedToggle: () => void
  advancedPanel?: ReactNode
}

const dateFieldClass = 'flex shrink-0 flex-col gap-1 min-w-[9.5rem]'
const dateInputClass = `${compactInputClass} w-[9.5rem] max-w-none`

/** Bộ lọc nâng cao — trái: Từ/Đến ngày; phải: mở panel (DOC-20 §4.1) */
export function AdvancedFilterBar({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  advancedOpen,
  onAdvancedToggle,
  advancedPanel,
}: AdvancedFilterBarProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`${filterRowClass} justify-between gap-4`}>
        <div className="flex flex-wrap items-end gap-x-4 gap-y-2">
          <label className={dateFieldClass}>
            <span className={`${labelClass} mb-0 text-xs`}>
              Từ ngày <span className="text-red-500">*</span>
            </span>
            <input
              type="date"
              className={dateInputClass}
              value={fromDate}
              aria-label="Từ ngày"
              onChange={(e) => onFromDateChange(e.target.value)}
            />
          </label>
          <span className="hidden pb-2 text-slate-400 sm:inline" aria-hidden>
            —
          </span>
          <label className={dateFieldClass}>
            <span className={`${labelClass} mb-0 text-xs`}>
              Đến ngày <span className="text-red-500">*</span>
            </span>
            <input
              type="date"
              className={dateInputClass}
              value={toDate}
              aria-label="Đến ngày"
              onChange={(e) => onToDateChange(e.target.value)}
            />
          </label>
        </div>

        <KitButton
          label={`Tìm kiếm nâng cao ${advancedOpen ? '▴' : '▾'}`}
          outlined
          onClick={onAdvancedToggle}
        />
      </div>

      {advancedOpen && advancedPanel ? (
        <div className={filterRowClass}>{advancedPanel}</div>
      ) : null}
    </div>
  )
}
