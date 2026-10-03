export type InvoiceRow = {
  id: string
  invoiceType: string
  status: string
  cqtStatus: string
  cqtCode: string
  symbol: string
  invoiceDate: string
  invoiceNo: string
  buyerTaxCode: string
  buyerName: string
  buyerAddress: string
  totalAmount: number
  signed: boolean
  currency: string
  exchangeRate: string
  paymentMethod: string
  sellerTaxCode: string
  sellerName: string
  sellerAddress: string
}

export type InvoiceAdvancedFilters = {
  fromDate: string
  toDate: string
  symbol: string
  status: string
  cqtCode: string
  buyerTaxCode: string
  buyerName: string
}
