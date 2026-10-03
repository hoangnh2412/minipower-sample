import { FileStack, Package, Receipt, Settings } from 'lucide-react'
import type { AdminNavItem } from '@jarvis/core'

/** Cây menu MVP v1.0 — theo DOC-19-prototype-shell.md */
export const mainNav: AdminNavItem[] = [
  {
    id: 'register',
    label: 'Đăng ký phát hành',
    icon: FileStack,
    path: '/phat-hanh/mau-hoa-don',
    defaultExpanded: true,
    children: [
      { id: 'reg-templates', label: 'Mẫu hóa đơn', path: '/phat-hanh/mau-hoa-don' },
      { id: 'reg-nd70', label: 'Tờ khai NĐ70/2025', path: '/phat-hanh/to-khai-nd70' },
    ],
  },
  {
    id: 'invoices',
    label: 'Hóa đơn đầu ra',
    icon: Receipt,
    path: '/hoa-don',
  },
  {
    id: 'catalog',
    label: 'Danh mục',
    icon: Package,
    path: '/danh-muc/khach-hang',
    defaultExpanded: true,
    children: [
      { id: 'cat-customers', label: 'Khách hàng', path: '/danh-muc/khach-hang' },
      { id: 'cat-products', label: 'Hàng hóa, dịch vụ', path: '/danh-muc/hang-hoa' },
      { id: 'cat-uom', label: 'Đơn vị tính', path: '/danh-muc/don-vi-tinh' },
      { id: 'cat-currencies', label: 'Tiền tệ', path: '/danh-muc/tien-te' },
      { id: 'cat-payment', label: 'Hình thức thanh toán', path: '/danh-muc/hinh-thuc-thanh-toan' },
    ],
  },
  {
    id: 'system',
    label: 'Hệ thống',
    icon: Settings,
    path: '/he-thong/thong-tin-dn',
    children: [
      { id: 'sys-company', label: 'Thông tin DN', path: '/he-thong/thong-tin-dn' },
      { id: 'sys-roles', label: 'Nhóm quyền', path: '/he-thong/nhom-quyen' },
      { id: 'sys-users', label: 'Người dùng', path: '/he-thong/nguoi-dung' },
      { id: 'sys-cts', label: 'Đăng ký CTS', path: '/he-thong/dang-ky-cts' },
      { id: 'sys-params', label: 'Tham số hệ thống', path: '/he-thong/tham-so' },
    ],
  },
]

export const secondaryNav: AdminNavItem[] = []

/** Demo tenant info hiển thị trên header (wire theo DOC-19 shell) */
export const demoTenant = {
  fullName: 'CÔNG TY TNHH DEMO HĐĐT',
  email: 'MST: 0100000000',
}
