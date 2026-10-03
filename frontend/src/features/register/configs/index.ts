import type { CrudConfig } from '../../../app/ui'
import { demoInvoiceTemplates, demoNd70Declarations } from '../../../app/mock/seedData'

export type InvoiceTemplateRow = {
  id: string
  code: string
  name: string
  invoiceType: string
  status: string
  effectiveDate: string
}

export type Nd70Row = {
  id: string
  declarationType: string
  createdDate: string
  cqtStatus: string
  cqtCode: string
}

export const invoiceTemplateConfig: CrudConfig<InvoiceTemplateRow> = {
  title: 'Mẫu hóa đơn',
  description: 'Đăng ký phát hành — mẫu hóa đơn (REG-FR-01)',
  entityName: 'Mẫu hóa đơn',
  showExcel: false,
  initialData: demoInvoiceTemplates,
  getEmptyRow: () => ({
    id: '',
    code: '',
    name: '',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Nháp',
    effectiveDate: '',
  }),
  columns: [
    { key: 'code', header: 'Mã mẫu' },
    { key: 'name', header: 'Tên mẫu' },
    { key: 'invoiceType', header: 'Loại HĐ' },
    { key: 'status', header: 'Trạng thái' },
    { key: 'effectiveDate', header: 'Ngày HL' },
  ],
  formFields: [
    { name: 'code', label: 'Mã mẫu', type: 'text', required: true },
    { name: 'name', label: 'Tên mẫu', type: 'text', required: true, span: 2 },
    {
      name: 'invoiceType',
      label: 'Loại hóa đơn',
      type: 'select',
      required: true,
      options: [
        { label: 'Hóa đơn GTGT', value: 'Hóa đơn GTGT' },
        { label: 'Hóa đơn bán hàng', value: 'Hóa đơn bán hàng' },
      ],
    },
    {
      name: 'status',
      label: 'Trạng thái',
      type: 'select',
      options: [
        { label: 'Nháp', value: 'Nháp' },
        { label: 'Hiệu lực', value: 'Hiệu lực' },
      ],
    },
    { name: 'effectiveDate', label: 'Ngày hiệu lực', type: 'date' },
  ],
  toolbarExtra: [
    { id: 'preview', label: 'Xem mẫu HĐ', outlined: true },
    { id: 'copy-template', label: 'Copy mẫu HĐ', outlined: true },
  ],
}

export const nd70Config: CrudConfig<Nd70Row> = {
  title: 'Tờ khai NĐ70/2025',
  description: 'Đăng ký / thay đổi theo NĐ70 — REG-FR-03',
  entityName: 'Tờ khai NĐ70',
  showCopy: false,
  showExcel: false,
  dialogSize: 'xl',
  initialData: demoNd70Declarations,
  getEmptyRow: () => ({
    id: '',
    declarationType: 'Đăng ký mới',
    createdDate: '',
    cqtStatus: 'Nháp',
    cqtCode: '',
  }),
  columns: [
    { key: 'declarationType', header: 'Loại TK' },
    { key: 'createdDate', header: 'Ngày lập' },
    { key: 'cqtStatus', header: 'Trạng thái CQT' },
    { key: 'cqtCode', header: 'Mã CQT' },
  ],
  formFields: [
    {
      name: 'declarationType',
      label: 'Loại tờ khai',
      type: 'select',
      required: true,
      options: [
        { label: 'Đăng ký mới', value: 'Đăng ký mới' },
        { label: 'Thay đổi thông tin', value: 'Thay đổi thông tin' },
      ],
    },
    { name: 'createdDate', label: 'Ngày lập', type: 'date', required: true },
    {
      name: 'taxCode',
      label: 'Mã số thuế (pre-fill SYS)',
      type: 'text',
      required: true,
    },
    {
      name: 'companyName',
      label: 'Tên doanh nghiệp',
      type: 'text',
      required: true,
      span: 2,
    },
    {
      name: 'content',
      label: 'Nội dung tờ khai NĐ70 / NĐ254',
      type: 'textarea',
      span: 2,
    },
  ],
  toolbarExtra: [
    { id: 'view', label: 'Xem', outlined: true },
    { id: 'sign', label: 'Ký gửi CQT', severity: 'primary' },
  ],
}
