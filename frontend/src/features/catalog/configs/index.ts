import type { CrudConfig } from '../../../app/ui'
import {
  demoCurrencies,
  demoCustomers,
  demoPaymentMethods,
  demoProducts,
  demoUoms,
} from '../../../app/mock/seedData'

export type CustomerRow = {
  id: string
  name: string
  taxCode: string
  buyerName: string
  address: string
  email: string
  phone: string
  bankAccount: string
}

export type ProductRow = {
  id: string
  code: string
  name: string
  uom: string
  unitPrice: string
  vatRate: string
  status: string
}

export type UomRow = { id: string; code: string; name: string }
export type CurrencyRow = { id: string; code: string; name: string; rate: string }
export type PaymentMethodRow = { id: string; code: string; name: string }

export const customerConfig: CrudConfig<CustomerRow> = {
  title: 'Khách hàng',
  description: 'Danh mục khách hàng — DOC-19 CAT-FR-01',
  entityName: 'Khách hàng',
  initialData: demoCustomers,
  getEmptyRow: () => ({
    id: '',
    name: '',
    taxCode: '',
    buyerName: '',
    address: '',
    email: '',
    phone: '',
    bankAccount: '',
  }),
  columns: [
    { key: 'name', header: 'Tên KH/ĐV' },
    { key: 'taxCode', header: 'MST' },
    { key: 'buyerName', header: 'Tên người mua' },
    { key: 'address', header: 'Địa chỉ' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'SĐT' },
    { key: 'bankAccount', header: 'STK' },
  ],
  formFields: [
    { name: 'taxCode', label: 'Mã số thuế', type: 'text', hint: 'Tra CQT / gợi ý (CAT-BR-01)' },
    { name: 'name', label: 'Tên đơn vị', type: 'text', required: true, span: 2 },
    { name: 'buyerName', label: 'Tên người mua', type: 'text' },
    { name: 'address', label: 'Địa chỉ', type: 'textarea', span: 2 },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Số điện thoại', type: 'text' },
    { name: 'bankAccount', label: 'Số tài khoản', type: 'text' },
  ],
}

export const productConfig: CrudConfig<ProductRow> = {
  title: 'Hàng hóa, dịch vụ',
  description: 'Danh mục HH/DV — DOC-19 CAT-FR-02',
  entityName: 'Hàng hóa, dịch vụ',
  initialData: demoProducts,
  getEmptyRow: () => ({
    id: '',
    code: '',
    name: '',
    uom: '',
    unitPrice: '',
    vatRate: '10',
    status: 'Hoạt động',
  }),
  columns: [
    { key: 'code', header: 'Mã HH' },
    { key: 'name', header: 'Tên HH/DV' },
    { key: 'uom', header: 'UOM' },
    { key: 'unitPrice', header: 'Đơn giá', align: 'right' },
    { key: 'vatRate', header: '%VAT', align: 'right' },
    { key: 'status', header: 'Trạng thái' },
  ],
  formFields: [
    { name: 'code', label: 'Mã hàng hóa', type: 'text', required: true },
    { name: 'name', label: 'Tên hàng hóa / dịch vụ', type: 'text', required: true, span: 2 },
    {
      name: 'uom',
      label: 'Đơn vị tính',
      type: 'select',
      options: [
        { label: 'Cái', value: 'Cái' },
        { label: 'Gói', value: 'Gói' },
        { label: 'Kg', value: 'Kg' },
      ],
    },
    { name: 'unitPrice', label: 'Đơn giá', type: 'number' },
    {
      name: 'vatRate',
      label: 'Thuế suất VAT (%)',
      type: 'select',
      options: [
        { label: '0%', value: '0' },
        { label: '5%', value: '5' },
        { label: '8%', value: '8' },
        { label: '10%', value: '10' },
      ],
    },
    {
      name: 'status',
      label: 'Trạng thái',
      type: 'select',
      options: [
        { label: 'Hoạt động', value: 'Hoạt động' },
        { label: 'Ngừng', value: 'Ngừng' },
      ],
    },
  ],
}

export const uomConfig: CrudConfig<UomRow> = {
  title: 'Đơn vị tính',
  description: 'Danh mục đơn vị tính — DOC-19 CAT-FR-03',
  entityName: 'Đơn vị tính',
  initialData: demoUoms,
  getEmptyRow: () => ({ id: '', code: '', name: '' }),
  columns: [
    { key: 'code', header: 'Mã UOM' },
    { key: 'name', header: 'Tên UOM' },
  ],
  formFields: [
    { name: 'code', label: 'Mã', type: 'text', required: true },
    { name: 'name', label: 'Tên', type: 'text', required: true },
  ],
  showExcel: false,
}

export const currencyConfig: CrudConfig<CurrencyRow> = {
  title: 'Tiền tệ',
  description: 'Danh mục tiền tệ — DOC-19 CAT-FR-04',
  entityName: 'Tiền tệ',
  initialData: demoCurrencies,
  getEmptyRow: () => ({ id: '', code: '', name: '', rate: '1' }),
  columns: [
    { key: 'code', header: 'Mã' },
    { key: 'name', header: 'Tên tiền tệ' },
    { key: 'rate', header: 'Tỷ giá', align: 'right' },
  ],
  formFields: [
    { name: 'code', label: 'Mã tiền tệ', type: 'text', required: true },
    { name: 'name', label: 'Tên tiền tệ', type: 'text', required: true },
    { name: 'rate', label: 'Tỷ giá quy đổi', type: 'number', required: true },
  ],
  showExcel: false,
}

export const paymentMethodConfig: CrudConfig<PaymentMethodRow> = {
  title: 'Hình thức thanh toán',
  description: 'Danh mục HTTT — DOC-19 CAT-FR-06',
  entityName: 'Hình thức thanh toán',
  initialData: demoPaymentMethods,
  getEmptyRow: () => ({ id: '', code: '', name: '' }),
  columns: [
    { key: 'code', header: 'Mã' },
    { key: 'name', header: 'Tên HTTT' },
  ],
  formFields: [
    { name: 'code', label: 'Mã', type: 'text', required: true },
    { name: 'name', label: 'Tên hình thức thanh toán', type: 'text', required: true },
  ],
  showExcel: false,
}
