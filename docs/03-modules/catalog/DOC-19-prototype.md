# DOC-19 — Prototype / Wireframe — catalog (CAT)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn UI:** [M-Invoice `#/danh-muc/khach-hang`](https://hddt.minvoice.com.vn/#/danh-muc/khach-hang) · 03/10/2026  
> **SRS:** [DOC-06-srs.md](DOC-06-srs.md) · **Shell:** [DOC-19-prototype-shell.md](../../04-platform/DOC-19-prototype-shell.md)

---

## 1. Phạm vi wireframe (MVP)

| Trang | Route (tham chiếu) | FR |
|-------|-------------------|-----|
| Khách hàng | `#/danh-muc/khach-hang` | CAT-FR-01 |
| Hàng hóa, dịch vụ | `#/danh-muc/hang-hoa` | CAT-FR-02 |
| Đơn vị tính | `#/danh-muc/don-vi-tinh` | CAT-FR-03 |
| Tiền tệ | `#/danh-muc/tien-te` | CAT-FR-04 |
| Hình thức thanh toán | `#/danh-muc/hinh-thuc-thanh-toan` | CAT-FR-06 |

Các trang danh mục **dùng chung layout CRUD** — chỉ khác cột bảng và form dialog.

---

## 2. Layout — Danh sách (ví dụ: Khách hàng)

```text
┌─ Shell (xem platform DOC-19) ────────────────────────────────────────────────┐
│ Breadcrumb: Danh mục > Khách hàng                                              │
├─ Toolbar ──────────────────────────────────────────────────────────────────────┤
│ [Tải DL] [+ Tạo F4] [Sửa F3] [Xóa F8] [Sao chép] [Nhập Excel] [Xuất Excel]     │
│                              [Tạo User tra cứu]  ← Phase 2 nếu cần           │
├─ Table + filter inline ────────────────────────────────────────────────────────┤
│ # │ Tên KH/ĐV │ MST │ Tên người mua │ Địa chỉ │ Email │ SĐT │ STK │ …         │
│[_]│    ▼      │ [_] │     [_]       │  [_]    │ [_]  │[_] │[_] │             │
│ 1 │ M-invoice…│010..│ HĐ kiểm thử   │ Hà Nội  │     │    │    │             │
│ 2 │ …         │     │               │         │     │    │    │             │
├─ Paginator ────────────────────────────────────────────────────────────────────┤
│ 1–50 / N bản ghi                         |◀◀ ◀ 1 2 3 … ▶ ▶▶|  [50▾]           │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Out MVP:** cột Ngân hàng (CAT-FR-07) — không hiển thị trên form KH MVP.

---

## 3. Layout — Form tạo/sửa (dialog hoặc drawer)

```text
┌─ {Tạo mới / Sửa} Khách hàng ───────────────────────────────────────── [X] ─┐
│  Mã số thuế        [________________]  🔍  ← tra CQT / gợi ý (CAT-BR-01)   │
│  Tên đơn vị        [________________]                                      │
│  Tên người mua     [________________]                                      │
│  Địa chỉ           [________________]                                      │
│  Email             [________________]                                      │
│  Số điện thoại     [________________]                                      │
│  Số tài khoản      [________________]     ← không bắt buộc MVP             │
│                                                                          │
│                              [ Hủy ]  [ Lưu ]                             │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Layout — Hàng hóa / dịch vụ (delta)

```text
│ # │ Mã HH │ Tên HH/DV │ UOM │ Đơn giá │ %VAT │ Trạng thái │ …              │
```

Form thêm: Mã, Tên, UOM (lookup CAT-FR-03), Thuế suất theo kỳ (CAT-BR-02).

---

## 5. Menu Danh mục (MVP)

```text
Danh mục ▾
├── Khách hàng ✅
├── Hàng hóa, dịch vụ ✅
├── Đơn vị tính ✅
├── Tiền tệ ✅
├── Hình thức thanh toán ✅
├── Mẫu email          (Phase 2)
├── Ngân hàng          (out MVP)
└── …                  (out MVP)
```
