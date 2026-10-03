import type { ReactNode } from 'react'
import { filterBarClass } from './layout'

type FilterBarProps = {
  children: ReactNode
}

/** Hàng filter / tìm kiếm — tách khỏi toolbar nút chính */
export function FilterBar({ children }: FilterBarProps) {
  return <div className={filterBarClass}>{children}</div>
}
