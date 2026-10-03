/** Layout compact dùng chung cho mọi trang nghiệp vụ */
export const pageStackClass = 'flex min-h-0 flex-1 flex-col gap-2'

export const panelClass = 'rounded-lg border border-slate-200 bg-white shadow-sm'

export const tableWrapClass = `${panelClass} min-h-0 flex-1 overflow-auto`

export const footerBarClass = `${panelClass} flex w-full flex-wrap items-center gap-2 px-2 py-1.5`

/** Paginator full-width — summary trái, chọn trang phải (DOC-20 §4.1) */
export const footerPaginationClass = 'w-full'

export const compactSelectClass =
  'h-8 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700'

export const filterBarClass =
  `${panelClass} flex flex-wrap items-center gap-2 px-2 py-1.5`

export const compactInputClass =
  'h-8 w-full min-w-[7rem] max-w-[12rem] rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700 placeholder:text-slate-400'
