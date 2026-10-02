# DOC-19 — Prototype / Wireframe — register (REG)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn UI:** [M-Invoice `#/phat-hanh/mau-hoa-don`](https://hddt.minvoice.com.vn/#/phat-hanh/mau-hoa-don) · 03/10/2026  
> **SRS:** [DOC-06-srs.md](DOC-06-srs.md) · **Shell:** [DOC-19-prototype-shell.md](../../04-platform/DOC-19-prototype-shell.md)

---

## 1. Phạm vi wireframe (MVP)

| Trang | Route (tham chiếu) | FR |
|-------|-------------------|-----|
| Mẫu hóa đơn | `#/phat-hanh/mau-hoa-don` | REG-FR-01 |
| Tờ khai NĐ70/2025 | `#/phat-hanh/to-khai-nd70` (TBD) | REG-FR-03 |

**Out MVP:** Tờ khai NĐ123/2020 (REG-FR-02) — không wire menu.

---

## 2. Menu Đăng ký phát hành (MVP)

```text
Đăng ký phát hành ▾
├── Mẫu hóa đơn ✅
├── Tờ khai NĐ123/2020     ❌ ẩn / out MVP
└── Tờ khai NĐ70/2025 ✅
```

---

## 3. Layout — Mẫu hóa đơn (danh sách)

```text
┌─ Shell ──────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Đăng ký phát hành > Mẫu hóa đơn                                   │
├─ Toolbar ──────────────────────────────────────────────────────────────────────┤
│ [Tải DL] [+ Tạo F4] [Sửa F3] [Xóa F8] [Xem mẫu HĐ] [Copy mẫu HĐ]               │
├─ Table + filter ───────────────────────────────────────────────────────────────┤
│ # │ Mã mẫu │ Tên mẫu │ Loại HĐ │ Trạng thái │ Ngày HL │ …                      │
│[_]│  [_]   │  [_]   │   ▼     │    ▼       │  [_]   │                         │
│   │        │        │         │            │        │  (empty state OK)       │
├─ Paginator ────────────────────────────────────────────────────────────────────┤
│ 0 bản ghi                                                                    │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Layout — Form mẫu hóa đơn

```text
┌─ Khai báo mẫu hóa đơn ──────────────────────────────────────────────── [X] ─┐
│  {Fields theo mẫu TCT — REG-BR-01}                                          │
│  Loại hóa đơn, Ký hiệu, Mẫu số, …                                            │
│                                                                              │
│  [ Xem trước mẫu ]              [ Hủy ]  [ Lưu ]                             │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Layout — Tờ khai NĐ70 (luồng)

```text
┌─ Tờ khai đăng ký/thay đổi NĐ70/2025 ─────────────────────────────────────────┐
│ Breadcrumb: Đăng ký phát hành > Tờ khai NĐ70                                  │
├─ Toolbar ────────────────────────────────────────────────────────────────────┤
│ [+ Tạo mới] [Sửa] [Xóa] [Xem] [Ký gửi CQT]                                    │
├─ Table danh sách tờ khai ──────────────────────────────────────────────────────┤
│ # │ Loại TK │ Ngày lập │ Trạng thái CQT │ Mã CQT │ …                           │
├─ Form tờ khai (dialog / full page) ───────────────────────────────────────────┤
│  Thông tin DN (pre-fill SYS-FR-01)                                            │
│  Nội dung tờ khai theo NĐ70 / NĐ254                                           │
│                                                                              │
│              [ Hủy ]  [ Lưu nháp ]  [ Ký ]  [ Ký & gửi CQT ]                  │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Luồng MVP:** Lập → Ký số (SYS-FR-05) → Gửi CQT → Chờ phê duyệt (AC-MVP-02).
