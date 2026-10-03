import type { ReactNode } from 'react'

type CompactPageHeaderProps = {
  title: string
  actions?: ReactNode
}

/** Title + toolbar cùng một hàng, không description — layout compact DOC-19 */
export function CompactPageHeader({ title, actions }: CompactPageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
      <h2 className="m-0 shrink-0 truncate text-lg font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      {actions ? (
        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-1.5">
          {actions}
        </div>
      ) : null}
    </div>
  )
}
