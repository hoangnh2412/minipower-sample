import { calcInvoiceTotals, type LineCalcInput } from '../utils/invoiceCalc'
import { validateMstFormat } from '../utils/mstLookup'

export type InvoiceHeaderValues = {
  symbol: string
  invoiceDate: string
  currency: string
  exchangeRate: string
  paymentMethod: string
  sellerTaxCode: string
  sellerName: string
  sellerAddress: string
  buyerTaxCode: string
  buyerName: string
  buyerAddress: string
}

export type InvoiceLineValues = {
  productName: string
  qty: string
  unitPrice: string
  discountPercent: string
  vatRate: string
}

export type FieldErrors = Record<string, string>

function fieldError(code: string, message: string) {
  return `[${code}] ${message}`
}

export function validateInvoiceForm(
  header: InvoiceHeaderValues,
  lines: InvoiceLineValues[],
): FieldErrors {
  const errors: FieldErrors = {}

  if (!header.symbol.trim()) {
    errors.symbol = fieldError('INV-VAL-010', 'Ký hiệu hóa đơn là bắt buộc')
  }
  if (!header.invoiceDate) {
    errors.invoiceDate = fieldError('INV-VAL-011', 'Ngày hóa đơn là bắt buộc')
  }
  if (!header.currency) {
    errors.currency = fieldError('INV-VAL-012', 'Tiền tệ là bắt buộc')
  }
  const rate = Number(header.exchangeRate)
  if (!rate || rate <= 0) {
    errors.exchangeRate = fieldError('INV-VAL-013', 'Tỷ giá phải lớn hơn 0')
  }
  if (!header.paymentMethod) {
    errors.paymentMethod = fieldError('INV-VAL-014', 'Hình thức thanh toán là bắt buộc')
  }
  if (!header.sellerName.trim()) {
    errors.sellerName = fieldError('INV-VAL-015', 'Tên đơn vị bán là bắt buộc')
  }
  if (!header.buyerName.trim()) {
    errors.buyerName = fieldError('INV-VAL-016', 'Tên người mua là bắt buộc')
  }
  if (!header.buyerAddress.trim()) {
    errors.buyerAddress = fieldError('INV-VAL-017', 'Địa chỉ người mua là bắt buộc')
  }

  if (header.buyerTaxCode.trim()) {
    const mstErr = validateMstFormat(header.buyerTaxCode)
    if (mstErr && !mstErr.ok) {
      errors.buyerTaxCode = fieldError(mstErr.code, mstErr.message)
    }
  }

  if (lines.length === 0) {
    errors._form = fieldError('INV-VAL-020', 'Hóa đơn phải có ít nhất một dòng hàng hóa')
    return errors
  }

  lines.forEach((line, index) => {
    if (!line.productName.trim()) {
      errors[`line_${index}_productName`] = fieldError(
        'INV-VAL-021',
        `Dòng ${index + 1}: tên hàng là bắt buộc`,
      )
    }
    const qty = Number(line.qty)
    if (!qty || qty <= 0) {
      errors[`line_${index}_qty`] = fieldError('INV-VAL-022', `Dòng ${index + 1}: số lượng phải lớn hơn 0`)
    }
    const price = Number(line.unitPrice)
    if (Number.isNaN(price) || price < 0) {
      errors[`line_${index}_unitPrice`] = fieldError(
        'INV-VAL-023',
        `Dòng ${index + 1}: đơn giá không hợp lệ`,
      )
    }
  })

  const calcLines: LineCalcInput[] = lines.map((l) => ({
    qty: Number(l.qty) || 0,
    unitPrice: Number(l.unitPrice) || 0,
    discountPercent: Number(l.discountPercent) || 0,
    vatRate: Number(l.vatRate) || 0,
  }))
  const totals = calcInvoiceTotals(calcLines)
  if (totals.total < 0) {
    errors._form = fieldError('INV-VAL-024', 'Tổng thanh toán không được âm (HĐ gốc)')
  }

  return errors
}
