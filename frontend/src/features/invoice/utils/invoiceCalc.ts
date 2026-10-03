/** INV-BR-07 — tính tiền dòng HHDV */

export type LineCalcInput = {
  qty: number
  unitPrice: number
  discountPercent: number
  vatRate: number
}

export type LineCalcResult = {
  lineAmount: number
  discountAmount: number
  beforeTax: number
  taxAmount: number
  afterTax: number
}

export function calcLineItem(input: LineCalcInput): LineCalcResult {
  const lineAmount = input.qty * input.unitPrice
  const discountAmount = (lineAmount * input.discountPercent) / 100
  const beforeTax = lineAmount - discountAmount
  const taxAmount = input.vatRate <= 0 ? 0 : (beforeTax * input.vatRate) / 100
  const afterTax = beforeTax + taxAmount
  return { lineAmount, discountAmount, beforeTax, taxAmount, afterTax }
}

export type InvoiceTotals = {
  lineAmount: number
  discountAmount: number
  beforeTax: number
  taxAmount: number
  total: number
}

export function calcInvoiceTotals(lines: LineCalcInput[]): InvoiceTotals {
  let lineAmount = 0
  let discountAmount = 0
  let beforeTax = 0
  let taxAmount = 0
  for (const line of lines) {
    const r = calcLineItem(line)
    lineAmount += r.lineAmount
    discountAmount += r.discountAmount
    beforeTax += r.beforeTax
    taxAmount += r.taxAmount
  }
  return { lineAmount, discountAmount, beforeTax, taxAmount, total: beforeTax + taxAmount }
}

const UNITS = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín']
const TEENS = [
  'mười',
  'mười một',
  'mười hai',
  'mười ba',
  'mười bốn',
  'mười lăm',
  'mười sáu',
  'mười bảy',
  'mười tám',
  'mười chín',
]

function readTriple(n: number): string {
  const hundred = Math.floor(n / 100)
  const rest = n % 100
  const parts: string[] = []
  if (hundred > 0) parts.push(`${UNITS[hundred]} trăm`)
  if (rest > 0) {
    if (rest < 10) parts.push(UNITS[rest])
    else if (rest < 20) parts.push(TEENS[rest - 10])
    else {
      const ten = Math.floor(rest / 10)
      const unit = rest % 10
      parts.push(`${UNITS[ten]} mươi${unit > 0 ? ` ${UNITS[unit]}` : ''}`)
    }
  }
  return parts.join(' ')
}

/** Đọc số VND nguyên (demo MVP) */
export function numberToVietnameseWords(amount: number): string {
  const n = Math.round(Math.abs(amount))
  if (n === 0) return 'Không đồng'
  if (n >= 1_000_000_000) return `${n.toLocaleString('vi-VN')} đồng`

  const billion = Math.floor(n / 1_000_000_000)
  const million = Math.floor((n % 1_000_000_000) / 1_000_000)
  const thousand = Math.floor((n % 1_000_000) / 1_000)
  const unit = n % 1_000
  const parts: string[] = []
  if (billion > 0) parts.push(`${readTriple(billion)} tỷ`)
  if (million > 0) parts.push(`${readTriple(million)} triệu`)
  if (thousand > 0) parts.push(`${readTriple(thousand)} nghìn`)
  if (unit > 0) parts.push(readTriple(unit))
  const prefix = amount < 0 ? 'Âm ' : ''
  return `${prefix}${parts.join(' ').trim()} đồng`
}
