import type { CrudConfig, SettingsFormConfig } from '../../../app/ui'
import { demoRoles, demoUsers } from '../../../app/mock/seedData'

export type RoleRow = {
  id: string
  code: string
  name: string
  description: string
  userCount: string
}

export type UserRow = {
  id: string
  username: string
  fullName: string
  email: string
  roleName: string
  status: string
}

export const companyInfoConfig: SettingsFormConfig = {
  title: 'Thông tin doanh nghiệp',
  description: 'Cấu hình DN — pre-fill lên HĐ bên bán (SYS-FR-01)',
  initialValues: {
    taxCode: '0106026495-001',
    companyName: 'CÔNG TY TNHH DEMO HÓA ĐƠN ĐIỆN TỬ MINIPOWER',
    address:
      'Tầng 12, Tòa nhà Landmark, Số 5 Đường Nguyễn Du, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh, Việt Nam',
    email: 'contact@demo-hddt.minipower.vn',
    phone: '02838234567',
    bankAccount: '0123456789012',
    bankName: 'Ngân hàng TMCP Ngoại Thương Việt Nam (Vietcombank) — Chi nhánh TP. Hồ Chí Minh',
    website: 'https://demo-hddt.minipower.vn',
    fax: '02838234568',
  },
  sections: [
    {
      fields: [
        { name: 'taxCode', label: 'Mã số thuế', type: 'text', required: true },
        { name: 'companyName', label: 'Tên đơn vị', type: 'text', required: true, span: 2 },
        { name: 'address', label: 'Địa chỉ', type: 'textarea', required: true, span: 2 },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Số điện thoại', type: 'text' },
        { name: 'bankAccount', label: 'Số tài khoản', type: 'text' },
        { name: 'bankName', label: 'Ngân hàng', type: 'text' },
        { name: 'website', label: 'Website', type: 'text' },
        { name: 'fax', label: 'Fax', type: 'text' },
      ],
    },
  ],
}

export const roleConfig: CrudConfig<RoleRow> = {
  title: 'Nhóm quyền',
  description: 'Quản lý nhóm quyền — SYS-FR-03',
  entityName: 'Nhóm quyền',
  showExcel: false,
  initialData: demoRoles,
  getEmptyRow: () => ({
    id: '',
    code: '',
    name: '',
    description: '',
    userCount: '0',
  }),
  columns: [
    { key: 'code', header: 'Mã nhóm' },
    { key: 'name', header: 'Tên nhóm' },
    { key: 'description', header: 'Mô tả' },
    { key: 'userCount', header: 'Số user', align: 'right' },
  ],
  formFields: [
    { name: 'code', label: 'Mã nhóm', type: 'text', required: true },
    { name: 'name', label: 'Tên nhóm', type: 'text', required: true, span: 2 },
    { name: 'description', label: 'Mô tả', type: 'textarea', span: 2 },
  ],
}

export const PERMISSION_GROUPS = [
  { id: 'reg', label: 'Đăng ký phát hành' },
  { id: 'inv', label: 'Hóa đơn' },
  { id: 'cat', label: 'Danh mục' },
  { id: 'sys', label: 'Hệ thống' },
]

export const userConfig: CrudConfig<UserRow> = {
  title: 'Người sử dụng',
  description: 'Quản lý user — SYS-FR-04',
  entityName: 'Người dùng',
  showExcel: false,
  initialData: demoUsers,
  getEmptyRow: () => ({
    id: '',
    username: '',
    fullName: '',
    email: '',
    roleName: '',
    status: 'Hoạt động',
  }),
  columns: [
    { key: 'username', header: 'Tên đăng nhập' },
    { key: 'fullName', header: 'Họ tên' },
    { key: 'email', header: 'Email' },
    { key: 'roleName', header: 'Nhóm quyền' },
    { key: 'status', header: 'Trạng thái' },
  ],
  formFields: [
    { name: 'username', label: 'Tên đăng nhập', type: 'text', required: true },
    { name: 'fullName', label: 'Họ tên', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    {
      name: 'roleName',
      label: 'Nhóm quyền',
      type: 'select',
      required: true,
      options: [
        { label: 'Quản trị hệ thống', value: 'Quản trị hệ thống' },
        { label: 'Kế toán', value: 'Kế toán' },
        { label: 'Nhân viên phát hành', value: 'Nhân viên phát hành' },
        { label: 'Tra cứu', value: 'Tra cứu' },
        { label: 'Quản lý đăng ký phát hành', value: 'Quản lý đăng ký phát hành' },
        { label: 'Quản lý danh mục', value: 'Quản lý danh mục' },
      ],
    },
    {
      name: 'status',
      label: 'Trạng thái',
      type: 'select',
      options: [
        { label: 'Hoạt động', value: 'Hoạt động' },
        { label: 'Khóa', value: 'Khóa' },
      ],
    },
    { name: 'password', label: 'Mật khẩu', type: 'password' },
  ],
}

export const ctsConfig: SettingsFormConfig = {
  title: 'Đăng ký chứng thư số',
  description: 'Cấu hình CTS — SYS-FR-05',
  initialValues: {
    ctsType: 'usb',
    serial: '540012345678901234567890ABCD',
    expiryDate: '2027-12-31',
    status: 'Đã đăng ký',
  },
  sections: [
    {
      fields: [
        {
          name: 'ctsType',
          label: 'Loại CTS',
          type: 'select',
          required: true,
          options: [
            { label: 'USB Token', value: 'usb' },
            { label: 'HSM', value: 'hsm' },
          ],
        },
        { name: 'serial', label: 'Serial', type: 'text' },
        { name: 'expiryDate', label: 'Hết hạn', type: 'date' },
        {
          name: 'status',
          label: 'Trạng thái',
          type: 'select',
          options: [
            { label: 'Chưa đăng ký', value: 'Chưa đăng ký' },
            { label: 'Đã đăng ký', value: 'Đã đăng ký' },
          ],
        },
      ],
    },
  ],
}

export const systemParamsConfig: SettingsFormConfig = {
  title: 'Khai báo tham số hệ thống',
  description: 'Tham số nghiệp vụ — SYS-FR-06',
  initialValues: {
    invoiceNumberMode: 'on-create',
    allowDeleteDraft: 'yes',
    allowDeleteSigned: 'no',
  },
  sections: [
    {
      fields: [
        {
          name: 'invoiceNumberMode',
          label: 'Hình thức sinh số HĐ',
          type: 'select',
          required: true,
          span: 2,
          options: [
            { label: 'Sinh số khi lập', value: 'on-create' },
            { label: 'Sinh số khi ký', value: 'on-sign' },
          ],
        },
        {
          name: 'allowDeleteDraft',
          label: 'Cho phép xóa HĐ nháp',
          type: 'select',
          options: [
            { label: 'Có', value: 'yes' },
            { label: 'Không', value: 'no' },
          ],
        },
        {
          name: 'allowDeleteSigned',
          label: 'Cho phép xóa HĐ đã ký',
          type: 'select',
          options: [
            { label: 'Có', value: 'yes' },
            { label: 'Không', value: 'no' },
          ],
        },
      ],
    },
  ],
}
