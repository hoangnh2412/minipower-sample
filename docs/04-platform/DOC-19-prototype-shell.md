# DOC-19 — Prototype / Wireframe — App Shell (Platform)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

> **UI governance:** [DOC-20-ui-design-principles.md](../00-governance/DOC-20-ui-design-principles.md)  
> **Baseline:** [mvp-v1.0-in-scope.md](../01-project/mvp-v1.0-in-scope.md)  
> **Implement:** `@jarvis/core` `AdminLayout` (sidebar) — xem [jarvis-usage-principles.md](jarvis-usage-principles.md)

Module wireframe chi tiết: `docs/03-modules/{module-id}/DOC-19-prototype.md`

---

## 1. Mục đích

Mô tả layout ASCII **shell chung** sau đăng nhập — áp dụng cho mọi trang nghiệp vụ (INV, CAT, REG, SYS).

---

## 2. Shell chung (authenticated)

```text
┌─ Navbar ─────────────────────────────────────────────────────────────────────┐
│ [≡] [Logo]                              🌐 VI  🔔  👤   {Tên DN}  MST:{mst}  │
├ Sidebar ─┬─ Main ─────────────────────────────────────────────────────────────┤
│ Menu     │ ┌─ Page header ──────────────────────────────────────────────────┐│
│ trái     │ │ {Tiêu đề trang}         [Tải DL][+Tạo F4][Sửa F3][Xóa F8][▾]  ││
│          │ ├─ Bộ lọc nâng cao (list) ───────────────────────────────────────┤│
│          │ │ Từ ngày [__]  Đến ngày [__]  {filters…}  [Tìm]  [Xóa lọc]      ││
│          │ ├─ Nội dung (table / form) ──────────────────────────────────────┤│
│          │ │ …                                                              ││
│          │ ├─ Paginator ────────────────────────────────────────────────────┤│
│          │ │ {from}–{to} / {total}              |◀ 1 2 ▶|  [50▾]             ││
│          │ └────────────────────────────────────────────────────────────────┘│
└──────────┴───────────────────────────────────────────────────────────────────┘
```

**Thành phần navbar phải:**

| Icon | Chức năng | MVP |
|------|-----------|-----|
| ≡ | Thu gọn / mở sidebar | ✅ |
| 🌐 | Ngôn ngữ (VI) | ✅ AUTH-FR-04 |
| 🔔 | Thông báo | Phase 2 |
| 👤 | Tài khoản / đăng xuất | ✅ |

---

## 3. Cây menu sidebar — MVP v1.0

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

Dùng chung cho CAT, REG, INV, SYS:

```text
┌─ {Tiêu đề trang} ──────────────── [Tải DL][+Tạo F4][Sửa F3][Xóa F8][Chức năng ▾] ─┐
├─ Bộ lọc nâng cao ───────────────────────────────────────────────────────────────────┤
│ Từ ngày [__]  Đến ngày [__]  {tiêu chí theo module}              [Tìm]  [Xóa lọc]  │
├─ Table + filter inline header cột ───────────────────────────────────────────────────┤
│ # │ {Cột 1} ▼ │ {Cột 2} [_] │ …                                                     │
│[_]│   …       │   …        │                                                        │
├─ Paginator ──────────────────────────────────────────────────────────────────────────┤
│ {from}–{to} / {total}                              |◀◀ ◀ 1 2 … ▶ ▶▶|  [50▾]       │
└──────────────────────────────────────────────────────────────────────────────────────┘
```

**Phím tắt chuẩn:** F4 tạo · F3 sửa · F8 xóa

---

## 5. Traceability

| Artifact | Liên kết |
|----------|----------|
| UI governance | [DOC-20-ui-design-principles.md](../00-governance/DOC-20-ui-design-principles.md) |
| BRD | [DOC-03-brd.md §12](../01-project/DOC-03-brd.md#12-phụ-lục--cây-menu-đầy-đủ-khảo-sát-01102026) |
| MVP scope | [mvp-v1.0-in-scope.md](../01-project/mvp-v1.0-in-scope.md) |
| Module wireframes | `03-modules/{id}/DOC-19-prototype.md` |
