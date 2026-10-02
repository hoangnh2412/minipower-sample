# DOC-05 — Use Cases — catalog (CAT)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-CAT-01 | Quản trị / Kế toán | Primary |
| ACT-SYS-05 | Thiết bị POS / vòi bơm | System |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| CAT-UC-001 | Quản lý khách hàng | Must | CAT-FR-01 |
| CAT-UC-002 | Quản lý hàng hóa, dịch vụ | Must | CAT-FR-02 |
| CAT-UC-003 | Quản lý đơn vị tính | Must | CAT-FR-03 |
| CAT-UC-004 | Quản lý tiền tệ | Must | CAT-FR-04 |
| CAT-UC-005 | Quản lý mẫu email | Must | CAT-FR-05 |
| CAT-UC-006 | Quản lý hình thức thanh toán | Must | CAT-FR-06 |
| CAT-UC-007 | Quản lý ngân hàng | Must | CAT-FR-07 |
| CAT-UC-008 | Quản lý địa điểm kinh doanh | Should | CAT-FR-08 |
| CAT-UC-009 | Quản lý dữ liệu xăng dầu | Should | CAT-FR-09, 10 |
| CAT-UC-010 | Quản lý thiết bị tích hợp | Must | CAT-FR-11 |
| CAT-UC-011 | Xem giao dịch xăng dầu | Should | CAT-FR-12 |
| CAT-UC-012 | Cấu hình tạo HĐ xăng dầu | Should | CAT-FR-13 |

---

## 3. Use Case Specifications

### CAT-UC-001 — Quản lý khách hàng

| Mục | Nội dung |
|-----|----------|
| **Menu** | Danh mục → Khách hàng |
| **Luồng chính** | CRUD khách hàng: MST, tên, địa chỉ, email, SĐT; import template; gợi ý khi lập HĐ (CAT-BR-01) |

### CAT-UC-002 — Quản lý hàng hóa, dịch vụ

**Luồng chính:** CRUD HH/DV: mã, tên, ĐVT, đơn giá, %VAT theo kỳ (CAT-BR-02)

### CAT-UC-003 — Quản lý đơn vị tính

**Menu:** Danh mục → Đơn vị tính — CRUD UOM

### CAT-UC-004 — Quản lý tiền tệ

**Menu:** Danh mục → Tiền tệ — VND, USD... + tỷ giá

### CAT-UC-005 — Quản lý mẫu email

**Menu:** Danh mục → Mẫu email — template gửi HĐ

### CAT-UC-006 — Quản lý hình thức thanh toán

**Menu:** Danh mục → Hình thức thanh toán — TM, CK, TM/CK...

### CAT-UC-007 — Quản lý ngân hàng

**Menu:** Danh mục → Ngân hàng

### CAT-UC-008 — Quản lý địa điểm kinh doanh

**Menu:** Danh mục → Địa điểm kinh doanh — chi nhánh, điểm bán

### CAT-UC-009 — Quản lý dữ liệu xăng dầu

| Mục | Nội dung |
|-----|----------|
| **Menu** | Quản lý xăng dầu → Cửa hàng, Mặt hàng, Vòi bơm |
| **Luồng chính** | CRUD master trạm xăng: CH, mặt hàng xăng dầu, vòi bơm |

### CAT-UC-010 — Quản lý thiết bị tích hợp

**Menu:** Danh mục thiết bị tích hợp — đăng ký POS, máy tính tiền

### CAT-UC-011 — Xem giao dịch xăng dầu

**Menu:** Danh sách giao dịch xăng dầu — log giao dịch từ thiết bị

### CAT-UC-012 — Cấu hình tạo HĐ xăng dầu

**Menu:** Cấu hình tạo hóa đơn xăng dầu — rule auto tạo HĐ (CAT-BR-03)
