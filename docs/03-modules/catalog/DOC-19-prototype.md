# DOC-19 — Prototype / Wireframe — catalog (CAT)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

> **Nguồn UI:** [M-Invoice `#/danh-muc/khach-hang`](https://hddt.minvoice.com.vn/#/danh-muc/khach-hang) · 03/10/2026  
> **SRS chi tiết:** [DOC-06-srs.md §6](DOC-06-srs.md#6-đặc-tả-màn-hình--điều-khiển)  
> **UI governance:** [DOC-20-ui-design-principles.md](../../00-governance/DOC-20-ui-design-principles.md)  
> **Shell:** [DOC-19-prototype-shell.md](../../04-platform/DOC-19-prototype-shell.md)

---

## 1. Phạm vi wireframe (MVP)

| Trang | Route | FR |
|-------|-------|-----|
| Khách hàng | `/danh-muc/khach-hang` | CAT-FR-01 |
| Hàng hóa, dịch vụ | `/danh-muc/hang-hoa-dich-vu` | CAT-FR-02 |
| Đơn vị tính | `/danh-muc/don-vi-tinh` | CAT-FR-03 |
| Tiền tệ | `/danh-muc/tien-te` | CAT-FR-04 |
| Hình thức thanh toán | `/danh-muc/hinh-thuc-thanh-toan` | CAT-FR-06 |

Tất cả dùng **Pattern L + Dialog D** — xem [DOC-20 §4.1, §4.5](../../00-governance/DOC-20-ui-design-principles.md).

---

## 2. Layout chung — Danh sách (Pattern L)

```text
┌─ Shell ──────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Danh mục > {Tên danh mục}                                        │
├─ Toolbar ────────────────────────────────────────────────────────────────────┤
│ [Tải DL] [+ Tạo F4] [Sửa F3] [Xóa F8] [Chức năng ▾]                           │
│   Chức năng ▾: Sao chép | Nhập Excel | Xuất Excel | (module-specific)        │
├─ Table + filter inline ──────────────────────────────────────────────────────┤
│ # │ {Cột 1} ▼ │ {Cột 2} [_] │ …                                               │
│[_]│ …         │ …           │                                                 │
├─ Paginator: 1–50 / N ────────────────────────────────────────────────────────┤
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Delta theo trang

### 3.1 Khách hàng

```text
│ # │ Mã KH │ Tên ĐV ▼ │ MST [_] │ Người mua │ CCCD │ Địa chỉ │ Email │ SĐT │ … │
```

**Chức năng ▾ P2:** Tạo User tra cứu · **ẩn MVP**

### 3.2 Hàng hóa, dịch vụ

```text
│ # │ Mã HH [_] │ Tên HH/DV ▼ │ Thuế suất ▼ │ Đơn giá │ UOM │
```

**Chức năng ▾ thêm:** Thay đổi thuế suất hàng loạt

### 3.3 Đơn vị tính

```text
│ # │ Mã UOM [_] │ Tên UOM ▼ │
```

### 3.4 Tiền tệ

```text
│ # │ Mã │ Tên │ Tỷ giá │ Lẻ SL │ Lẻ ĐG │ Lẻ TT │ Lẻ thuế │ Tên đọc │ … │
```

---

## 4. Dialog Tạo/Sửa (Pattern D)

```text
┌─ {Tạo mới / Sửa} {Entity} ─────────────────────────────────────────── [X] ─┐
│  {fields theo entity — xem DOC-06 §6}                                      │
│                              [ Hủy ]  [ Lưu ]                              │
└────────────────────────────────────────────────────────────────────────────┘
```

**F4** mở dialog · **F3** mở dialog với dòng chọn · URL list không đổi.

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
