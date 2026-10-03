export const inputClass =
  'box-border h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70'

export const inputInvalidClass =
  `${inputClass} !border-red-500 focus:!border-red-500 focus:!ring-red-500/20`

export const labelClass = 'mb-1.5 block text-sm font-medium text-slate-700'

export const errorClass = 'mt-1.5 text-sm text-red-600'

/** PrimeReact 11 — dùng unstyled + class kit (không dùng prop label/severity cũ) */
export const btnPrimaryClass =
  'pr-btn-primary inline-flex items-center justify-center gap-2 rounded-xl border-0 font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600/30 disabled:cursor-not-allowed disabled:opacity-60'

export const btnOutlinedClass =
  'pr-btn-outlined inline-flex items-center justify-center gap-2 rounded-xl border font-medium shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 disabled:cursor-not-allowed disabled:opacity-60'

export const btnDangerClass =
  'pr-btn-danger inline-flex items-center justify-center gap-2 rounded-xl border-0 font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/30 disabled:cursor-not-allowed disabled:opacity-60'

export const btnDangerOutlinedClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white font-medium text-red-600 shadow-sm transition-colors hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/30 disabled:cursor-not-allowed disabled:opacity-60'

export const btnTextClass =
  'pr-btn-text inline-flex items-center justify-center gap-1.5 rounded-lg border-0 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/30 disabled:cursor-not-allowed disabled:opacity-60'

/** Ký gửi CQT / Lưu & ký — DOC-20 §8.4 purple-600 */
export const btnSpecialClass =
  'inline-flex items-center justify-center gap-2 rounded-xl border-0 bg-purple-600 font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600/30 disabled:cursor-not-allowed disabled:opacity-60'

export const btnSizeSm = 'h-8 px-3 text-xs'
export const btnSizeMd = 'h-10 px-4 text-sm'
