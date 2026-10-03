# DOC-19 — Prototype / Wireframe — register (REG)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

> **Nguồn UI:** [M-Invoice `#/phat-hanh/mau-hoa-don`](https://hddt.minvoice.com.vn/#/phat-hanh/mau-hoa-don) · 03/10/2026  
> **SRS chi tiết:** [DOC-06-srs.md §6](DOC-06-srs.md#6-đặc-tả-màn-hình--điều-khiển)  
> **UI governance:** [DOC-20-ui-design-principles.md](../../00-governance/DOC-20-ui-design-principles.md)  
> **Shell:** [DOC-19-prototype-shell.md](../../04-platform/DOC-19-prototype-shell.md)

---

## 1. Phạm vi wireframe (MVP)

| Trang | Route einvoice | Pattern | FR |
|-------|----------------|---------|-----|
| Mẫu hóa đơn — list | `/phat-hanh/mau-hoa-don` | L | REG-FR-01 |
| Chọn template | `/phat-hanh/mau-hoa-don/create` | G | REG-FR-01 |
| Customize template | `/phat-hanh/mau-hoa-don/create/:id` | E | REG-FR-01 |
| Tờ khai NĐ70 — list | `/phat-hanh/to-khai-nd70` | L | REG-FR-03 |
| Tờ khai NĐ70 — form | `/phat-hanh/to-khai-nd70/create` | F | REG-FR-03 |

**Out MVP:** Tờ khai NĐ123/2020 (REG-FR-02).

---

## 2. Layout — Danh sách mẫu HĐ (Pattern L)

```text
┌─ Shell ──────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Đăng ký phát hành > Mẫu hóa đơn                                   │
├─ Toolbar ────────────────────────────────────────────────────────────────────┤
│ [Tải DL] [+ Tạo F4] [Sửa F3] [Xóa F8] [Xem mẫu HĐ] [Copy mẫu HĐ]              │
├─ Table + filter inline ───────────────────────────────────────────────────────┤
│ # │ Loại HĐ ▼ │ Ký hiệu [_] │ Số dòng in │ Người tạo │ Ngày tạo │ Sử dụng ☐  │
│[_]│ GTGT      │ 1C26TLC     │ 6          │ admin     │ 01/10/26 │ ☑          │
├─ Paginator: 1–50 / 1128 ──────────────────────────────────────────────────────┤
└──────────────────────────────────────────────────────────────────────────────┘
```

**Tạo F4** → navigate gallery (không dialog).

---

## 3. Layout — Gallery chọn template (Pattern G)

```text
┌─ Breadcrumb: … > Mẫu hóa đơn > Tạo mới ──────────────────────────────────────┐
│ [Loại HĐ ▾] [Loại DN ▾] [Tên mẫu____] [Khổ giấy ▾]                            │
├─ Cards ──────────────────────────────────────────────────────────────────────┤
│ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                                   │
│ │ HOANVE │ │MẪU 01  │ │ IAM'22 │ │ IAM'21 │  ← click → customize route       │
│ │ preview│ │ GTGT   │ │ preview│ │ preview│                                   │
│ └────────┘ └────────┘ └────────┘ └────────┘                                   │
├─ [Quay lại]     paginator (4/trang)              Tổng số 72 bản ghi           │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Layout — Customize mẫu (Pattern E)

```text
┌─ (•) HĐ điện tử  ( ) HĐ chuyển đổi          [Lấy lại mặc định] ──────────────┐
│ [Thông tin chung | Logo-Hình nền | Tùy chỉnh chi tiết]  │  Live preview      │
│  Mẫu số, Ký hiệu (1-C-26-T-YY), màu, font, …            │  (scale slider)    │
├─ [Quay lại]                        [Xem in]  [Lưu thông tin] ─────────────────┤
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Layout — Tờ khai NĐ70 list (Pattern L)

```text
┌─ Breadcrumb: … > Tờ khai NĐ70/2025-NĐ254/2026 ────────────────────────────────┐
│ [Tải DL] [+ Tạo F4] [Sửa F3] [Xóa F8] [Ký và gửi CQT] [Chức năng ▾]          │
├─ Table ──────────────────────────────────────────────────────────────────────┤
│ # │ Loại TK ▼ │ Email [_] │ Ngày lập │ Tr.gửi CQT │ Phản hồi │ Bước tiếp theo │
│[_]│ Thay đổi  │           │ 01/10/26 │ [Đã gửi]   │[Chấp nhận]│ [Hoàn thành]  │
├─ Paginator ──────────────────────────────────────────────────────────────────┤
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Layout — Tờ khai NĐ70 form (Pattern F — **full page, không popup**)

```text
┌─ Breadcrumb: … > Tờ khai NĐ70 > Tạo mới ─────────────────────────────────────┐
│  ( ) Đăng ký mới  (•) Thay đổi thông tin                                      │
│  ── Thông tin DN (pre-fill) ──                                                │
│  ── Hình thức HĐ / chuyển dữ liệu ──                                          │
│  ── Grid chọn mẫu HĐ đã khai báo ──                                           │
│  ── Chọn CTS ──                                                               │
│                                                                              │
│  [Quay lại]           [Hủy] [Lưu nháp] [Ký] [Ký & gửi CQT]                   │
└──────────────────────────────────────────────────────────────────────────────┘
```

> **Delta einvoice:** Tạo mới (F4) **SHALL** navigate `/phat-hanh/to-khai-nd70/create` — không overlay/modal.
