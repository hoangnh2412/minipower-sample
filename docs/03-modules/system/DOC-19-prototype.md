# DOC-19 — Prototype / Wireframe — system (SYS)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn UI:** [M-Invoice](https://hddt.minvoice.com.vn/) menu Hệ thống · 03/10/2026  
> **SRS:** [DOC-06-srs.md](DOC-06-srs.md) · **Shell:** [DOC-19-prototype-shell.md](../../04-platform/DOC-19-prototype-shell.md)

---

## 1. Phạm vi wireframe (MVP)

| Trang | FR | Pattern |
|-------|-----|---------|
| Thông tin doanh nghiệp | SYS-FR-01 | Form cấu hình |
| Nhóm quyền | SYS-FR-03 | CRUD list |
| Người sử dụng | SYS-FR-04 | CRUD list |
| Đăng ký chứng thư số | SYS-FR-05 | Form + wizard |
| Tham số hệ thống | SYS-FR-06 | Form cấu hình |

---

## 2. Menu Hệ thống (MVP)

```text
Hệ thống ▾
├── Quản lý doanh nghiệp
│   └── Thông tin doanh nghiệp ✅
├── Quản lý người dùng
│   ├── Nhóm quyền ✅
│   └── Người sử dụng ✅
├── Đăng ký chứng thư số ✅
├── Khai báo tham số hệ thống ✅
├── Bản quyền              (Phase 2)
├── Cấu hình email server  (Phase 2)
└── Giá trị thay thế/mặc định (Phase 2)
```

---

## 3. Layout — Thông tin doanh nghiệp (SYS-FR-01)

Form 1 cột hoặc 2 cột — dữ liệu pre-fill lên INV (bên bán).

```text
┌─ Thông tin doanh nghiệp ─────────────────────────────────────────────────────┐
│ Breadcrumb: Hệ thống > Thông tin doanh nghiệp                                 │
├─ Form ───────────────────────────────────────────────────────────────────────┤
│  Mã số thuế *     [________________]                                         │
│  Tên đơn vị *     [________________]                                         │
│  Địa chỉ *        [________________________________]                         │
│  Email            [________________]    SĐT       [________________]         │
│  Logo             [ Upload ]                                                 │
│  Số tài khoản     [________________]    Ngân hàng [________________]         │
│  Website / Fax    …                                                          │
│                                                                              │
│                                         [ Hủy ]  [ Lưu ]                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Layout — Nhóm quyền / Người dùng (CRUD)

Dùng [pattern CRUD platform DOC-19](../../04-platform/DOC-19-prototype-shell.md#4-pattern-trang-danh-sách-crud).

**Nhóm quyền — cột gợi ý:**

```text
│ # │ Mã nhóm │ Tên nhóm │ Mô tả │ Số user │ … │
```

**Form nhóm quyền — tree checkbox menu/chức năng:**

```text
┌─ Nhóm quyền ──────────────────────────────────────────────────────── [X] ─┐
│  Tên nhóm *   [________________]                                           │
│  ┌─ Quyền chức năng ─────────────────────────────────────────────────────┐ │
│  │ ☐ Đăng ký phát hành   ☐ Hóa đơn   ☐ Danh mục   ☐ Hệ thống   …          │ │
│  └───────────────────────────────────────────────────────────────────────┘ │
│                              [ Hủy ]  [ Lưu ]                              │
└────────────────────────────────────────────────────────────────────────────┘
```

**Người sử dụng — cột gợi ý:**

```text
│ # │ Tên đăng nhập │ Họ tên │ Email │ Nhóm quyền │ Trạng thái │ … │
```

---

## 5. Layout — Đăng ký chứng thư số (SYS-FR-05)

```text
┌─ Đăng ký chứng thư số ───────────────────────────────────────────────────────┐
│  Loại CTS:  ( ) USB Token   ( ) HSM                                        │
│  [ Quét / Chọn chứng thư ]                                                  │
│  Serial:    [________________]    Hết hạn: [dd/mm/yyyy]                      │
│  Trạng thái: [ Đã đăng ký / Chưa ]                                           │
│                                                                              │
│  ⚠ Cần plugin ký số (link Tải xuống — SUP Phase 2)                          │
│                                         [ Hủy ]  [ Lưu ]                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Layout — Tham số hệ thống (SYS-FR-06)

```text
┌─ Khai báo tham số hệ thống ─────────────────────────────────────────────────┐
│  Hình thức sinh số HĐ:  ( ) Sinh số khi lập   ( ) Sinh số khi ký             │
│  {Các tham số nghiệp vụ khác — TBD}                                          │
│                                         [ Hủy ]  [ Lưu ]                     │
└──────────────────────────────────────────────────────────────────────────────┘
```

> Ảnh hưởng INV-FR-08 (quy tắc xóa HĐ) qua INV-BR-02/03.
