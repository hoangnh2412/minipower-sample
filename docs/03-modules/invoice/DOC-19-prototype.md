# DOC-19 — Prototype / Wireframe — invoice (INV)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn UI:** [M-Invoice `#/hoa-don`](https://hddt.minvoice.com.vn/#/hoa-don) · 03/10/2026  
> **SRS:** [DOC-06-srs.md](DOC-06-srs.md) · **Shell:** [DOC-19-prototype-shell.md](../../04-platform/DOC-19-prototype-shell.md)

---

## 1. Phạm vi wireframe (MVP)

| Màn hình | Route | FR |
|----------|-------|-----|
| Danh sách HĐ | `#/hoa-don` | INV-FR-01, 20 |
| Lập HĐ (modal F4) | modal on `#/hoa-don` | INV-FR-02 … 06 |
| Ký gửi CQT | row action / Lưu & ký | INV-FR-11 |
| Tải XML | Chức năng ▾ | INV-FR-16 |

---

## 2. Layout — Danh sách hóa đơn

```text
┌─ Shell ──────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Hóa đơn đầu ra                                                    │
├─ Toolbar ────────────────────────────────────────────────────────────────────┤
│ [{Ký hiệu HĐ - Loại HĐ ▾}]  ví dụ: 1C26TAH - Hóa đơn GTGT                     │
│ [Tải DL] [+ Tạo F4] [Xóa F8] [Chức năng ▾] [Ký hàng loạt] [Lấy lại mã CQT]    │
│ [Nghiệp vụ ▾] [Xem toàn bộ HĐ] [+ HĐ chiết khấu]                         [⚙] │
│   Chức năng ▾ MVP:  Tải XML ✅ | Cập nhật TT CQT ✅                           │
│   Chức năng ▾ P2:   Nhận Excel | Chuyển ký hiệu | …                           │
│   Nghiệp vụ ▾:     Thay thế/Điều chỉnh…  ❌ out MVP (ERR)                    │
├─ Filter row ─────────────────────────────────────────────────────────────────┤
│ # │TT│Tr.thái│Tr.CQT │Mã CQT│Ký hiệu│Ngày HĐ│Số HĐ│MST│Tên KH│Tổng tiền│Email│…│Act│
│[_]│▼ │  ▼    │  ▼    │ [_]  │ [_]   │ [_]  │ [_]│[_]│ [_]  │  [_]   │ ☐  │   │
├─ Data ─────────────────────────────────────────────────────────────────────────┤
│ 1 │Gốc│Chờ ký │       │1C26..│       │      │   │010..│M-invoice…│120,000│   │🖊👁⚡✉📋│
│ 3 │Gốc│Thành công│0000A15…│1C26│01/10│ 4 │010..│…     │-2,200,000│   │  👁⚡📋│
│ 4 │Gốc│Có lỗi │       │1C26..│01/10│ 3 │010..│…     │-660M    │   │  👁⚡📋│
│   │CK │       │       │      │       │     │   │     │          │       │   │
├─ Footer ───────────────────────────────────────────────────────────────────────┤
│ 1–6 / 6 bản ghi                    |◀◀ ◀ [1] ▶ ▶▶|  [50▾]  Tổng: -662,027,000│
└──────────────────────────────────────────────────────────────────────────────┘

Row actions: 🖊 Chỉnh sửa | 👁 Xem in | ⚡ Ký gửi CQT | ✉ Gửi email (P2) | 📋 Sao chép | ⋯ Khác
  • HĐ đã ký: Sửa/Ký disabled (INV-BR-01)
  • Trạng thái CQT: Chờ ký | Thành công | Có lỗi (INV-BR-06)
```

---

## 3. Layout — Lập hóa đơn (modal F4)

Full-width dialog: **"Tạo mới Hóa đơn giá trị gia tăng"**

```text
┌─ Tạo mới Hóa đơn giá trị gia tăng ───────────────────────────────────── [X] ┐
│ ┌─ Thông tin chung ────┐ ┌─ Thông tin bên bán ────┐ ┌─ Thông tin bên mua ──┐ │
│ │ Ký hiệu*    [1C26TAH]│ │ MST*     [0106026495] │ │ MST      [____] 🔍  │ │
│ │ Ngày HĐ*    [dd/mm/yy]│ │ Tên ĐV*  [………………]     │ │ Mã KH    [____] [+] │ │
│ │ Số HĐ       [____]   │ │ Địa chỉ* [………………]     │ │ Tên ĐV   [________] │ │
│ │ Tiền tệ*    [VND ▾]  │ │ Email/SĐT/STK…        │ │ Tên NM   [________] │ │
│ │ Tỷ giá*     [1.00]   │ │ (pre-fill SYS-FR-01)  │ │ Địa chỉ  [________] │ │
│ │ HTTT*       [TM ▾]   │ │ cho sửa trên form     │ │ Email…   [________] │ │
│ │ Số ĐH/BK CK [____]   │ │                       │ │ (tra MST CQT)       │ │
│ └──────────────────────┘ └───────────────────────┘ └─────────────────────┘ │
│ [+ Thêm dòng F9] [Xóa dòng F8] [Sao chép F7] [Chèn Ins] [Excel — P2]        │
│ ┌─ Chi tiết HHDV (grid) ────────────────────────────────────────────────────┐ │
│ │☐│STT│Mã HH│ Tên hàng │UOM│SL│Đơn giá│Cộng TH│%CK│Tiền CK│Trước thuế│%VAT│Thuế││
│ │☐│ 1 │ [+] │          │[+]│  │       │       │   │       │          │10% │    ││
│ └───────────────────────────────────────────────────────────────────────────┘ │
│ ┌─ Tổng cộng ───────────────────────────────────────────────────────────────┐ │
│ │ Tổng TH │ Tổng CK │ Chưa thuế │ Tổng thuế │ Tổng TT │ Bằng chữ: … đồng   │ │
│ └───────────────────────────────────────────────────────────────────────────┘ │
│                              [Đóng]  [Xem trước]  [Lưu]  [Lưu & ký]          │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Luồng MVP:**

```text
F4 → Lưu (Chờ ký) → Ký gửi CQT / Lưu & ký → Thành công → Tải XML (Chức năng ▾)
```

---

## 4. Trạng thái & màu (UI)

| Trạng thái gửi CQT | Badge | Hành vi |
|--------------------|-------|---------|
| Chờ ký | Vàng | Sửa/xóa/ký được |
| Thành công | Xanh | Không sửa; tải XML |
| Có lỗi | Đỏ | Xem lỗi; lấy lại mã |

---

## 5. Phím tắt

| Phím | Hành động | FR |
|------|-----------|-----|
| F4 | Tạo HĐ mới | INV-FR-02 |
| F8 | Xóa HĐ / xóa dòng | INV-FR-08 |
| F9 | Thêm dòng HHDV | INV-FR-05 |
