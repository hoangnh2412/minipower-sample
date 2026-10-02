# DOC-19 — Prototype / Wireframe — App Shell (Platform)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn UI tham chiếu:** [M-Invoice](https://hddt.minvoice.com.vn/) — khảo sát 03/10/2026  
> **Baseline:** [mvp-v1.0-in-scope.md](../01-project/mvp-v1.0-in-scope.md)  
> **Implement:** `@jarvis/core` layout shell — xem [jarvis-usage-principles.md](jarvis-usage-principles.md)

Module wireframe chi tiết: `docs/03-modules/{module-id}/DOC-19-prototype.md`

---

## 1. Mục đích

Mô tả layout ASCII **shell chung** sau đăng nhập — áp dụng cho mọi trang nghiệp vụ (INV, CAT, REG, SYS).

---

## 2. Shell chung (authenticated)

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ [Logo]  ĐK PH ▾  HĐ đầu ra  XL SS ▾  LS TN ▾  BC ▾  DM ▾  HT ▾   🎬 ⬇ 🔔 🌐 👤 │
│                                              {Tên DN tenant}    MST: {mst}   │
├──────────────────────────────────────────────────────────────────────────────┤
│ Breadcrumb:  Home  >  {Module}  >  {Trang con}                               │
├──────────────────────────────────────────────────────────────────────────────┤
│ [Toolbar: Tải DL | + Tạo F4 | Sửa F3 | Xóa F8 | … | ⚙]                        │
├──────────────────────────────────────────────────────────────────────────────┤
│                         NỘI DUNG CHÍNH (table / form)                         │
├──────────────────────────────────────────────────────────────────────────────┤
│ Paginator:  {from}–{to} / {total} bản ghi   |◀◀ ◀  {page}  ▶ ▶▶|  [{size} ▾]  │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Thành phần header phải:**

| Icon | Chức năng | MVP |
|------|-----------|-----|
| 🎬 | Hướng dẫn | Phase 2 (SUP) |
| ⬇ | Tải xuống plugin | Phase 2 |
| 🔔 | Thông báo | Phase 2 |
| 🌐 | Ngôn ngữ (VI) | ✅ AUTH-FR-04 |
| 👤 | Tài khoản / đăng xuất | ✅ |

---

## 3. Cây menu — MVP v1.0

```text
App
├── Đăng ký phát hành ✅
│   ├── Mẫu hóa đơn ✅
│   ├── Tờ khai NĐ123/2020          ❌ out MVP
│   └── Tờ khai NĐ70/2025 ✅
├── Hóa đơn đầu ra ✅
├── Xử lý sai sót                   ❌ out MVP
├── Lịch sử truyền nhận             ❌ out MVP
├── Báo cáo                         ❌ out MVP
├── Danh mục ✅
│   ├── Khách hàng ✅
│   ├── Hàng hóa, dịch vụ ✅
│   ├── Đơn vị tính ✅
│   ├── Tiền tệ ✅
│   ├── Hình thức thanh toán ✅
│   ├── Ngân hàng                   ❌ out MVP
│   └── (xăng dầu, thiết bị…)       ❌ out MVP
└── Hệ thống ✅
    ├── Thông tin DN ✅
    ├── Nhóm quyền / User ✅
    ├── Đăng ký CTS ✅
    ├── Tham số hệ thống ✅
    └── (license, email, theme…)    ❌ Phase 2
```

---

## 4. Pattern trang danh sách (CRUD)

Dùng chung cho CAT, REG (mẫu HĐ), SYS (user, quyền):

```text
┌─ {Tiêu đề trang} ────────────────────────────────────────────────────────────┐
│ [Tải DL] [+ Tạo F4] [Sửa F3] [Xóa F8] […actions module…]                      │
├─ Table + filter inline trên header cột ──────────────────────────────────────┤
│ # │ {Cột 1} │ {Cột 2} │ … │                                                  │
│[_]│   ▼     │  [_]    │   │   ← hàng filter                                  │
│ 1 │  …      │  …      │   │                                                  │
├─ Paginator ──────────────────────────────────────────────────────────────────┤
│ {from}–{to} / {total}                         |◀◀ ◀ 1 2 … ▶ ▶▶|  [50▾]       │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Phím tắt chuẩn:** F4 tạo · F3 sửa · F8 xóa

---

## 5. Traceability

| Artifact | Liên kết |
|----------|----------|
| BRD | [DOC-03-brd.md §12](../01-project/DOC-03-brd.md#12-phụ-lục--cây-menu-đầy-đủ-khảo-sát-01102026) |
| MVP scope | [mvp-v1.0-in-scope.md](../01-project/mvp-v1.0-in-scope.md) |
| Module wireframes | `03-modules/{id}/DOC-19-prototype.md` |
