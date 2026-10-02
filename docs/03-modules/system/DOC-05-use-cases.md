# DOC-05 — Use Cases — system (SYS)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-SYS-01 | Quản trị hệ thống DN | Primary |
| ACT-SYS-06 | USB Token / HSM | External |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| SYS-UC-001 | Quản lý thông tin doanh nghiệp | Must | SYS-FR-01 |
| SYS-UC-002 | Xem bản quyền | Must | SYS-FR-02 |
| SYS-UC-003 | Quản lý nhóm quyền | Must | SYS-FR-03 |
| SYS-UC-004 | Quản lý người sử dụng | Must | SYS-FR-04 |
| SYS-UC-005 | Đăng ký chứng thư số | Must | SYS-FR-05 |
| SYS-UC-006 | Khai báo tham số hệ thống | Must | SYS-FR-06 |
| SYS-UC-007 | Cấu hình email server | Must | SYS-FR-07 |
| SYS-UC-008 | Cấu hình giá trị mặc định | Should | SYS-FR-08 |
| SYS-UC-009 | Tùy chỉnh giao diện | Could | SYS-FR-09 |

---

## 3. Use Case Specifications

### SYS-UC-001 — Quản lý thông tin doanh nghiệp

| Mục | Nội dung |
|-----|----------|
| **Menu** | Hệ thống → Thông tin doanh nghiệp |
| **Luồng chính** | Cập nhật MST, tên DN, địa chỉ, điện thoại, email, logo — dùng mặc định khi lập HĐ |

### SYS-UC-002 — Xem bản quyền

| Mục | Nội dung |
|-----|----------|
| **Menu** | Hệ thống → Bản quyền |
| **Luồng chính** | Xem gói dịch vụ, hạn sử dụng, số HĐ còn lại (SYS-BR-04) |

### SYS-UC-003 — Quản lý nhóm quyền

| Mục | Nội dung |
|-----|----------|
| **Menu** | Hệ thống → Nhóm quyền |
| **Luồng chính** | Tạo nhóm quyền → gán chức năng (menu/action) → lưu (SYS-BR-01) |

### SYS-UC-004 — Quản lý người sử dụng

| Mục | Nội dung |
|-----|----------|
| **Menu** | Hệ thống → Người sử dụng |
| **Luồng chính** | CRUD user: tên đăng nhập, họ tên, email, gán nhóm quyền, trạng thái |

### SYS-UC-005 — Đăng ký chứng thư số

| Mục | Nội dung |
|-----|----------|
| **Menu** | Hệ thống → Đăng ký chứng thư số |
| **Luồng chính** | Kết nối USB Token → đọc serial → đăng ký CTS dùng ký HĐ (SYS-BR-02) |

### SYS-UC-006 — Khai báo tham số hệ thống

| Mục | Nội dung |
|-----|----------|
| **Menu** | Hệ thống → Khai báo tham số hệ thống |
| **Luồng chính** | Cấu hình: hình thức sinh số HĐ, quy tắc nghiệp vụ, tham số CQT (SYS-BR-03) |

### SYS-UC-007 — Cấu hình email server

| Mục | Nội dung |
|-----|----------|
| **Menu** | Hệ thống → Cấu hình email server |
| **Luồng chính** | Nhập SMTP host, port, user, password → test gửi mail |

### SYS-UC-008 — Cấu hình giá trị mặc định

| Mục | Nội dung |
|-----|----------|
| **Menu** | Giá trị thay thế / Giá trị mặc định |
| **Luồng chính** | Đặt placeholder và giá trị default cho trường lập HĐ |

### SYS-UC-009 — Tùy chỉnh giao diện

| Mục | Nội dung |
|-----|----------|
| **Luồng chính** | Chọn theme giao diện (v1/v2), kích thước hiển thị |
