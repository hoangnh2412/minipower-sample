/** Tăng version khi đổi seed — buộc reload dữ liệu demo (sessionStorage). */
export const DEMO_SEED_VERSION = 2

type DemoInvoiceRow = {
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

type DemoCustomerRow = {
  id: string
  name: string
  taxCode: string
  buyerName: string
  address: string
  email: string
  phone: string
  bankAccount: string
}

type DemoProductRow = {
  id: string
  code: string
  name: string
  uom: string
  unitPrice: string
  vatRate: string
  status: string
}

type DemoUomRow = { id: string; code: string; name: string }
type DemoCurrencyRow = { id: string; code: string; name: string; rate: string }
type DemoPaymentMethodRow = { id: string; code: string; name: string }

type DemoRoleRow = {
  id: string
  code: string
  name: string
  description: string
  userCount: string
}

type DemoUserRow = {
  id: string
  username: string
  fullName: string
  email: string
  roleName: string
  status: string
}

type DemoInvoiceTemplateRow = {
  id: string
  code: string
  name: string
  invoiceType: string
  status: string
  effectiveDate: string
}

type DemoNd70Row = {
  id: string
  declarationType: string
  createdDate: string
  cqtStatus: string
  cqtCode: string
}

const SELLER = {
  sellerTaxCode: '0106026495',
  sellerName: 'CÔNG TY TNHH DEMO HÓA ĐƠN ĐIỆN TỬ MINIPOWER',
  sellerAddress:
    'Tầng 12, Tòa nhà Landmark, Số 5 Đường Nguyễn Du, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
}

const BUYER_NAMES = [
  'CÔNG TY TNHH M-INVOICE DEMO',
  'CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ DỊCH VỤ KỸ THUẬT CÔNG NGHỆ THÔNG MINH VIỆT NAM',
  'CÔNG TY TNHH XÂY DỰNG VÀ ĐẦU TƯ BẤT ĐỘNG SẢN HOÀNG GIA',
  'CÔNG TY CỔ PHẦN LOGISTICS VÀ VẬN TẢI ĐÔNG DƯƠNG',
  'CÔNG TY TNHH DỊCH VỤ TƯ VẤN THUẾ VÀ KẾ TOÁN AN PHÁT',
  'CÔNG TY CỔ PHẦN SẢN XUẤT THIẾT BỊ Y TẾ MEDICARE',
  'CÔNG TY TNHH THƯƠNG MẠI ĐIỆN TỬ FPT RETAIL',
  'CÔNG TY CỔ PHẦN GIẢI PHÁP PHẦN MỀM DOANH NGHIỆP',
  'CÔNG TY TNHH KHÁCH SẠN VÀ DU LỊCH SÀI GÒN PEARL',
  'CÔNG TY CỔ PHẦN NÔNG NGHIỆP CÔNG NGHỆ CAO MIỀN BẮC',
  'KHÁCH HÀNG CÁ NHÂN — NGUYỄN VĂN AN',
  'KHÁCH HÀNG CÁ NHÂN — TRẦN THỊ BÍCH HẰNG',
  'CÔNG TY TNHH VẬT LIỆU XÂY DỰNG THÀNH CÔNG',
  'CÔNG TY CỔ PHẦN DỆT MAY XUẤT KHẨU VIỆT THẮNG',
  'CÔNG TY TNHH CUNG CẤP GIẢI PHÁP CLOUD VÀ HOSTING',
]

const ADDRESSES = [
  'Số 10 Phố Huế, Phường Phạm Đình Hổ, Quận Hai Bà Trưng, Hà Nội',
  'Lô B2-3 KCN VSIP, Thuận An, Bình Dương',
  '123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
  'Khu đô thị mới Phú Mỹ Hưng, Quận 7, TP. Hồ Chí Minh',
  '45 Lê Lợi, Phường Hải Châu, Quận Hải Châu, Đà Nẵng',
  '88 Trần Phú, Phường Lộc Thọ, Nha Trang, Khánh Hòa',
]

const INVOICE_TYPES = ['Gốc', 'Gốc', 'Gốc', 'Thay thế', 'Điều chỉnh']
const STATUSES = ['Thành công', 'Thành công', 'Chờ ký', 'Nháp', 'Có lỗi']
const SYMBOLS = ['1C26TAH', '1C26TCH', '2C26MGH', '1K26TAA']
const PAYMENTS = ['TM', 'CK', 'TMCK']

function pad2(n: number) {
  return String(n).padStart(2, '0')
}

function isoDate(y: number, m: number, d: number) {
  return `${y}-${pad2(m)}-${pad2(d)}`
}

/** ~60 hóa đơn demo — đủ test paginator 50 và filter. */
export function createDemoInvoiceRows(): DemoInvoiceRow[] {
  const rows: DemoInvoiceRow[] = []
  const baseNo = 128

  for (let i = 0; i < 58; i++) {
    const day = (i % 28) + 1
    const month = 8 + Math.floor(i / 28)
    const year = 2026
    const status = STATUSES[i % STATUSES.length]
    const signed = status === 'Thành công' || status === 'Có lỗi'
    const cqtOk = status === 'Thành công'
    const cqtErr = status === 'Có lỗi'

    rows.push({
      id: String(i + 1),
      invoiceType: INVOICE_TYPES[i % INVOICE_TYPES.length],
      status,
      cqtStatus: cqtOk ? `0000A${pad2((i % 20) + 1)}` : cqtErr ? 'ERR-CQT-102' : '',
      cqtCode: cqtOk ? `M${pad2((i % 12) + 1)}` : '',
      symbol: SYMBOLS[i % SYMBOLS.length],
      invoiceDate: isoDate(year, month, day),
      invoiceNo: String(baseNo - i),
      buyerTaxCode: `010${String(1000000 + i).slice(-7)}`,
      buyerName: BUYER_NAMES[i % BUYER_NAMES.length],
      buyerAddress: ADDRESSES[i % ADDRESSES.length],
      totalAmount: 120_000 + (i % 17) * 550_000 + (i % 5) * 1_250_000,
      signed,
      currency: i % 11 === 0 ? 'USD' : 'VND',
      exchangeRate: i % 11 === 0 ? '25420' : '1',
      paymentMethod: PAYMENTS[i % PAYMENTS.length],
      ...SELLER,
    })
  }

  return rows
}

export const demoCustomers: DemoCustomerRow[] = BUYER_NAMES.map((name, i) => ({
  id: String(i + 1),
  name,
  taxCode: `010${String(2000000 + i).slice(-7)}`,
  buyerName: i % 3 === 0 ? 'Nguyễn Văn A' : i % 3 === 1 ? 'Trần Thị B' : 'Lê Văn C',
  address: ADDRESSES[i % ADDRESSES.length],
  email: i % 4 === 0 ? '' : `contact${i + 1}@khachhang-demo.vn`,
  phone: i % 5 === 0 ? '' : `0${9}${String(10000000 + i).slice(-8)}`,
  bankAccount: i % 3 === 0 ? '' : `${String(1000000000 + i * 12345)}`,
}))

const PRODUCT_NAMES = [
  'Dịch vụ phần mềm HĐĐT theo tháng',
  'Gói triển khai và đào tạo hóa đơn điện tử',
  'Phí duy trì chứng thư số USB Token',
  'Dịch vụ tích hợp API phát hành hóa đơn',
  'Máy in nhiệt hóa đơn 80mm',
  'Thiết bị đọc thẻ căn cước công dân',
  'Dịch vụ tra cứu MST và thông tin doanh nghiệp',
  'Gói lưu trữ XML hóa đơn 5 năm',
  'Phí ký số và gửi CQT theo lượt',
  'Tư vấn quy trình chuyển đổi NĐ 70/2025',
  'Hosting và bảo mật hệ thống SaaS',
  'Module quản lý danh mục hàng hóa nâng cao',
  'Báo cáo thuế GTGT tự động từ dữ liệu HĐ',
  'Dịch vụ nhập liệu hóa đơn hàng loạt từ Excel',
  'Phí hỗ trợ kỹ thuật 24/7 (Premium)',
]

export const demoProducts: DemoProductRow[] = PRODUCT_NAMES.map((name, i) => ({
  id: String(i + 1),
  code: `SP${String(i + 1).padStart(3, '0')}`,
  name,
  uom: ['Gói', 'Cái', 'Tháng', 'Lượt', 'Kg'][i % 5],
  unitPrice: String(150_000 + (i + 1) * 85_000),
  vatRate: ['0', '5', '8', '10'][i % 4],
  status: i % 9 === 0 ? 'Ngừng' : 'Hoạt động',
}))

export const demoUoms: DemoUomRow[] = [
  { id: '1', code: 'CAI', name: 'Cái' },
  { id: '2', code: 'GOI', name: 'Gói' },
  { id: '3', code: 'KG', name: 'Kilogram' },
  { id: '4', code: 'THANG', name: 'Tháng' },
  { id: '5', code: 'LUOT', name: 'Lượt' },
  { id: '6', code: 'HOP', name: 'Hộp' },
  { id: '7', code: 'THUNG', name: 'Thùng' },
  { id: '8', code: 'MET', name: 'Mét' },
  { id: '9', code: 'M2', name: 'Mét vuông' },
  { id: '10', code: 'M3', name: 'Mét khối' },
  { id: '11', code: 'LIT', name: 'Lít' },
  { id: '12', code: 'TO', name: 'Tờ' },
  { id: '13', code: 'BO', name: 'Bộ' },
  { id: '14', code: 'CHIEC', name: 'Chiếc' },
  { id: '15', code: 'TAN', name: 'Tấn' },
]

export const demoCurrencies: DemoCurrencyRow[] = [
  { id: '1', code: 'VND', name: 'Việt Nam Đồng', rate: '1' },
  { id: '2', code: 'USD', name: 'Đô la Mỹ', rate: '25420' },
  { id: '3', code: 'EUR', name: 'Euro', rate: '27650' },
  { id: '4', code: 'JPY', name: 'Yên Nhật', rate: '168.5' },
  { id: '5', code: 'CNY', name: 'Nhân dân tệ', rate: '3520' },
  { id: '6', code: 'SGD', name: 'Đô la Singapore', rate: '18900' },
  { id: '7', code: 'THB', name: 'Baht Thái', rate: '720' },
  { id: '8', code: 'KRW', name: 'Won Hàn Quốc', rate: '18.6' },
]

export const demoPaymentMethods: DemoPaymentMethodRow[] = [
  { id: '1', code: 'TM', name: 'Tiền mặt' },
  { id: '2', code: 'CK', name: 'Chuyển khoản' },
  { id: '3', code: 'TMCK', name: 'Tiền mặt/Chuyển khoản' },
  { id: '4', code: 'TTD', name: 'Thẻ tín dụng' },
  { id: '5', code: 'TTT', name: 'Thẻ trả trước' },
  { id: '6', code: 'SEC', name: 'Séc' },
  { id: '7', code: 'DL', name: 'Điện tín liên' },
  { id: '8', code: 'KHAC', name: 'Hình thức khác (ghi rõ)' },
]

export const demoRoles: DemoRoleRow[] = [
  {
    id: '1',
    code: 'ADMIN',
    name: 'Quản trị hệ thống',
    description: 'Toàn quyền cấu hình DN, user, nhóm quyền và tham số hệ thống',
    userCount: '2',
  },
  {
    id: '2',
    code: 'ACCOUNTANT',
    name: 'Kế toán',
    description: 'Lập, sửa, ký và gửi hóa đơn; tra cứu danh mục',
    userCount: '8',
  },
  {
    id: '3',
    code: 'INVOICE_ISSUER',
    name: 'Nhân viên phát hành',
    description: 'Lập và gửi hóa đơn; không được xóa HĐ đã ký',
    userCount: '5',
  },
  {
    id: '4',
    code: 'VIEWER',
    name: 'Tra cứu',
    description: 'Chỉ xem danh sách và báo cáo; không thao tác ghi',
    userCount: '12',
  },
  {
    id: '5',
    code: 'REG_MANAGER',
    name: 'Quản lý đăng ký phát hành',
    description: 'Quản lý mẫu HĐ, tờ khai NĐ70 và đăng ký CTS',
    userCount: '3',
  },
  {
    id: '6',
    code: 'CAT_MANAGER',
    name: 'Quản lý danh mục',
    description: 'CRUD khách hàng, hàng hóa, UOM, tiền tệ',
    userCount: '4',
  },
  {
    id: '7',
    code: 'AUDITOR',
    name: 'Kiểm toán nội bộ',
    description: 'Xem log và xuất báo cáo; không sửa nghiệp vụ',
    userCount: '2',
  },
  {
    id: '8',
    code: 'SUPPORT',
    name: 'Hỗ trợ kỹ thuật',
    description: 'Hỗ trợ user; giới hạn quyền cấu hình nhạy cảm',
    userCount: '1',
  },
]

const USER_FIRST = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ', 'Đặng', 'Bùi']
const USER_MID = ['Văn', 'Thị', 'Hữu', 'Minh', 'Quốc', 'Thanh', 'Ngọc', 'Anh']
const USER_LAST = ['An', 'Bình', 'Cường', 'Dung', 'Em', 'Giang', 'Hà', 'Khánh', 'Linh', 'Mai']

export const demoUsers: DemoUserRow[] = Array.from({ length: 22 }, (_, i) => {
  const fullName = `${USER_FIRST[i % USER_FIRST.length]} ${USER_MID[i % USER_MID.length]} ${USER_LAST[i % USER_LAST.length]}`
  const roles = ['Quản trị hệ thống', 'Kế toán', 'Tra cứu', 'Quản lý danh mục']
  return {
    id: String(i + 1),
    username: i === 0 ? 'admin' : `user${String(i + 1).padStart(2, '0')}`,
    fullName,
    email: `${i === 0 ? 'admin' : `user${i + 1}`}@demo.vn`,
    roleName: roles[i % roles.length],
    status: i % 9 === 0 ? 'Khóa' : 'Hoạt động',
  }
})

export const demoInvoiceTemplates: DemoInvoiceTemplateRow[] = [
  {
    id: '1',
    code: 'MAU-GTGT-01',
    name: 'Mẫu hóa đơn GTGT A4 dọc — logo trái',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Hiệu lực',
    effectiveDate: '2026-01-01',
  },
  {
    id: '2',
    code: 'MAU-GTGT-02',
    name: 'Mẫu hóa đơn GTGT A4 ngang — bảng kê chi tiết mở rộng',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Hiệu lực',
    effectiveDate: '2026-01-15',
  },
  {
    id: '3',
    code: 'MAU-BH-01',
    name: 'Mẫu hóa đơn bán hàng — khách hàng cá nhân',
    invoiceType: 'Hóa đơn bán hàng',
    status: 'Hiệu lực',
    effectiveDate: '2026-02-01',
  },
  {
    id: '4',
    code: 'MAU-GTGT-03',
    name: 'Mẫu GTGT song ngữ Việt-Anh cho xuất khẩu',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Nháp',
    effectiveDate: '',
  },
  {
    id: '5',
    code: 'MAU-GTGT-04',
    name: 'Mẫu GTGT khổ A5 — tiết kiệm giấy in',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Hiệu lực',
    effectiveDate: '2026-03-10',
  },
  {
    id: '6',
    code: 'MAU-BH-02',
    name: 'Mẫu bán hàng siêu thị — QR thanh toán',
    invoiceType: 'Hóa đơn bán hàng',
    status: 'Hiệu lực',
    effectiveDate: '2026-04-01',
  },
  {
    id: '7',
    code: 'MAU-GTGT-05',
    name: 'Mẫu GTGT dịch vụ phần mềm — nhiều dòng mô tả dài',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Hiệu lực',
    effectiveDate: '2026-05-20',
  },
  {
    id: '8',
    code: 'MAU-GTGT-06',
    name: 'Mẫu GTGT điều chỉnh — header đỏ cảnh báo',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Nháp',
    effectiveDate: '',
  },
  {
    id: '9',
    code: 'MAU-BH-03',
    name: 'Mẫu bán hàng F&B — in nhiệt 80mm',
    invoiceType: 'Hóa đơn bán hàng',
    status: 'Hiệu lực',
    effectiveDate: '2026-06-01',
  },
  {
    id: '10',
    code: 'MAU-GTGT-07',
    name: 'Mẫu GTGT thay thế — hiển thị số HĐ gốc',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Hiệu lực',
    effectiveDate: '2026-07-01',
  },
  {
    id: '11',
    code: 'MAU-GTGT-08',
    name: 'Mẫu GTGT NĐ 70 — layout mới theo quy định',
    invoiceType: 'Hóa đơn GTGT',
    status: 'Nháp',
    effectiveDate: '',
  },
  {
    id: '12',
    code: 'MAU-BH-04',
    name: 'Mẫu bán hàng xe máy — thông tin khung số máy',
    invoiceType: 'Hóa đơn bán hàng',
    status: 'Hiệu lực',
    effectiveDate: '2026-08-15',
  },
]

const ND70_TYPES = ['Đăng ký mới', 'Thay đổi thông tin', 'Ngừng sử dụng']
const ND70_STATUSES = ['Nháp', 'Chờ ký', 'Đã gửi', 'Chấp nhận', 'Không chấp nhận']

export const demoNd70Declarations: DemoNd70Row[] = Array.from({ length: 18 }, (_, i) => {
  const status = ND70_STATUSES[i % ND70_STATUSES.length]
  const accepted = status === 'Chấp nhận'
  return {
    id: String(i + 1),
    declarationType: ND70_TYPES[i % ND70_TYPES.length],
    createdDate: `${pad2((i % 28) + 1)}/${pad2(9 + Math.floor(i / 6))}/2026`,
    cqtStatus: status,
    cqtCode: accepted ? `TK70-${String(1000 + i)}` : '',
  }
})
