# DOC-20 — UI Design Principles (Governance)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

> **Nguồn tham chiếu:** [M-Invoice](https://hddt.minvoice.com.vn/) — khảo sát 03/10/2026  
> **Shell:** [DOC-19-prototype-shell.md](../04-platform/DOC-19-prototype-shell.md)  
> **Implement:** `@jarvis/core` + `frontend/src/app/ui/` — xem [jarvis-usage-principles.md](../04-platform/jarvis-usage-principles.md)

---

## 1. Mục đích

Chuẩn hóa nguyên tắc thiết kế giao diện cho **toàn bộ einvoice-sample**, dựa trên khảo sát M-Invoice. Mọi DOC-19 module và SRS (DOC-06) phải tuân thủ tài liệu này; delta có chủ đích ghi rõ trong DOC-19 module.

---

## 2. Nguyên tắc tổng quát

| # | Nguyên tắc | Mô tả |
|---|------------|-------|
| P-01 | **Jarvis-first** | Dùng layout, table, form, pagination từ `@jarvis/core`; chỉ custom khi M-Invoice/reference yêu cầu pattern không có sẵn. |
| P-02 | **Một luồng — một pattern** | Cùng loại màn hình (list CRUD, gallery, editor, full-page form) dùng cùng cấu trúc layout và hành vi nút. |
| P-03 | **Toolbar gọn** | Hàng 1: **nút chính** + **Chức năng ▾** cho thao tác phụ; không nhồi >6 nút cùng hàng. |
| P-04 | **Filter đúng chỗ** | Trang **danh sách**: hàng **Bộ lọc nâng cao** (Từ ngày–Đến ngày + tiêu chí module) **trên** bảng; filter **inline** dưới header cột là bổ sung. Trang không phải list: filter ngữ cảnh trên **FilterBar** riêng (nếu cần). |
| P-05 | **Route vs Dialog** | Form phức tạp / nhiều bước → **navigate sang route mới**. CRUD đơn giản → **dialog**. Không popup full-page form. |
| P-06 | **Phím tắt chuẩn** | F4 Tạo · F3 Sửa · F8 Xóa — hiển thị trên label nút. |
| P-07 | **Trạng thái rõ ràng** | Badge màu cho trạng thái CQT/nghiệp vụ; nút phụ thuộc selection phải **disabled** khi chưa chọn dòng. |
| P-08 | **Tenant context** | Tên DN + MST trên **navbar** hàng trên cùng (góc phải). |
| P-09 | **Compact density** | Padding/gap nhỏ; bảng `text-sm`; toolbar `gap-1.5` — tối đa diện tích dữ liệu. |
| P-10 | **Traceability** | Mỗi nút/field trong SRS có ID `UI-{MOD}-{SCREEN}-{NNN}` trace về FR. |
| P-11 | **Màu có semantics** | Mỗi màu gắn **một vai trò** (primary, danger, status…); không dùng màu trang trí ngoài bảng token §8. |
| P-12 | **Lỗi có mã** | Mọi thông báo lỗi hiển thị **`[code] message`** — code trace được về BR/API/SRS. |
| P-13 | **Desktop-first, responsive** | Layout tối ưu desktop ≥1024px; co gọn sidebar/table trên tablet/mobile — xem §10. |

---

## 3. Shell (authenticated)

> **Delta einvoice:** Sidebar trái + navbar trên cùng — khác M-Invoice (menu ngang). Implement: `@jarvis/core` `AdminLayout` sidebar.

```text
┌─ Navbar (hàng trên cùng, full width) ───────────────────────────────────────┐
│ [≡] [Logo]                              🌐 VI  🔔  👤   {Tên DN}  MST:{mst}   │
├ Sidebar ─┬─ Main content ────────────────────────────────────────────────────┤
│ (menu    │ ┌─ Page header ──────────────────────────────────────────────────┐│
│  trái,   │ │ {Tiêu đề trang}          [Tải DL][+Tạo F4][Sửa F3][Xóa F8][▾]││
│  collaps)│ ├─ Bộ lọc nâng cao (chỉ trang danh sách) ────────────────────────┤│
│          │ │ Từ ngày [__]  Đến ngày [__]  {tiêu chí module…}  [Tìm][Xóa]  ││
│ ĐK PH    │ ├─ Body (table / form / gallery) ───────────────────────────────┤│
│  Mẫu HĐ  │ │ …                                                              ││
│ HĐ đầu ra│ ├─ Paginator (list) ─────────────────────────────────────────────┤│
│ Danh mục │ │ {from}–{to} / {total}                        |◀ 1 2 ▶|  [50▾]  ││
│ Hệ thống │ └────────────────────────────────────────────────────────────────┘│
└──────────┴───────────────────────────────────────────────────────────────────┘
```

| Thành phần | Quy tắc |
|------------|---------|
| **Navbar** | Hàng trên cùng: toggle sidebar, logo, utility (ngôn ngữ, thông báo, tài khoản), tenant info |
| **Sidebar** | Menu cây bên **trái**; nhóm có thể expand/collapse; highlight route active |
| **Page header** | Hàng đầu vùng content: **tiêu đề trang** (trái) + **nút chính** (phải); không breadcrumb riêng nếu title đủ rõ |
| **Bộ lọc nâng cao** | Chỉ **trang danh sách**; luôn có **Từ ngày** + **Đến ngày**; thêm field theo module; nút **Tìm** / **Xóa lọc** |
| **Tenant info** | Navbar góc phải: Tên DN (truncate) + MST monospace |
| **Utility** | Ngôn ngữ (VI) MVP; Hướng dẫn/Tải/Thông báo Phase 2 |

---

## 4. Pattern layout

### 4.1 Pattern L — List CRUD

Áp dụng: Danh mục (CAT), Mẫu HĐ (REG), Tờ khai NĐ70 danh sách, Hóa đơn đầu ra.

```text
┌─ Page header ────────────────────────────────────────────────────────────────┐
│ {Tiêu đề trang}              [Tải DL][+Tạo F4][Sửa F3][Xóa F8][Chức năng ▾] │
├─ Bộ lọc nâng cao ────────────────────────────────────────────────────────────┤
│ Từ ngày [dd/mm/yyyy]  Đến ngày [dd/mm/yyyy]  {filter module…}  [Tìm][Xóa lọc]│
├─ Table ────────────────────────────────────────────────────────────────────────┤
│ # │ Cột 1 ▲▼ │ Cột 2 ▲▼ │ … │                                                 │
│[_]│  [filter]│  [filter]│   │  ← filter inline cột (AND với bộ lọc nâng cao) │
│ 1 │  …       │  …       │   │                                                 │
├─ Paginator ────────────────────────────────────────────────────────────────────┤
│ {from}–{to} trong {total} bản ghi    |◀◀ ◀ 1 2 … ▶ ▶▶|  [50▾]                 │
└──────────────────────────────────────────────────────────────────────────────┘
```

| Quy tắc | Chi tiết |
|---------|----------|
| Page header | Tiêu đề + toolbar cùng hàng — xem §3 |
| Bộ lọc nâng cao | **Bắt buộc** Từ ngày / Đến ngày; mặc định tháng hiện tại hoặc trống (theo module SRS) |
| Apply filter | **Tìm** = gọi API với query; **Xóa lọc** = reset về default |
| Filter inline | Lọc nhanh trên cột; kết hợp AND với bộ lọc nâng cao |
| Selection | Cột `#` = checkbox chọn 1/nhiều dòng |
| Sort | Icon ▲▼ trên header cột |
| Empty | Text đỏ giữa bảng: *"Không tìm thấy kết quả"* |
| Paginator | Mặc định page size **50** |
| Sửa/Xóa | Disabled khi `selectedCount === 0` |

#### Bộ lọc nâng cao — field theo module (ví dụ)

| Module | Field bổ sung (ngoài Từ/Đến ngày) |
|--------|-----------------------------------|
| INV | Ký hiệu HĐ, Trạng thái, Mã CQT, MST, Tên KH |
| REG mẫu HĐ | Loại HĐ, Ký hiệu, Đang sử dụng |
| REG NĐ70 | Loại tờ khai, Trạng thái gửi CQT, Phản hồi CQT |
| CAT | Theo cột chính entity (MST, Mã HH, …) — tối đa 3 field |

### 4.2 Pattern G — Gallery chọn mẫu

Áp dụng: REG — chọn template mẫu HĐ (`/phat-hanh/mau-hoa-don/create`).

```text
┌─ Filter bar ─────────────────────────────────────────────────────────────────┐
│ [Loại HĐ ▾] [Loại DN ▾] [Tên mẫu____] [Khổ giấy ▾]                           │
├─ Card grid ──────────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                              │
│ │ preview │ │ preview │ │ preview │ │ preview │  ← click → customize route  │
│ │ title   │ │ title   │ │ title   │ │ title   │                              │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘                              │
├─ Footer ─────────────────────────────────────────────────────────────────────┤
│ [Quay lại]          paginator + "Tổng số N bản ghi"                          │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Pattern E — Editor split (preview)

Áp dụng: REG — customize mẫu HĐ.

```text
┌─ Toggle + actions ───────────────────────────────────────────────────────────┐
│ (•) HĐ điện tử  ( ) HĐ chuyển đổi     [Lấy lại mặc định]                      │
├─ Tabs ────────────────────────────────┬─ Live preview ─────────────────────────┤
│ [Thông tin chung|Logo|Tùy chỉnh]      │  Mẫu HĐ scale theo "Kích thước hiển thị"│
│  form fields…                         │                                        │
├─ Footer ──────────────────────────────┴────────────────────────────────────────┤
│ [Quay lại]                              [Xem in]  [Lưu thông tin]              │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 4.4 Pattern F — Full-page form

Áp dụng: REG — tạo/sửa tờ khai NĐ70 (`/phat-hanh/to-khai-dang-ky-nd70/create`).

```text
┌─ Breadcrumb … > Tạo mới ─────────────────────────────────────────────────────┐
│  Form sections (DN, loại TK, mẫu HĐ, CTS, …)                                 │
│                                                                              │
│  [Quay lại]              [Hủy] [Lưu nháp] [Ký] [Ký & gửi CQT]                │
└──────────────────────────────────────────────────────────────────────────────┘
```

> **Delta einvoice:** Tờ khai NĐ70 **không** mở popup — **navigate** sang route `/create` hoặc `/create/:id`.

### 4.5 Pattern D — Dialog CRUD

Áp dụng: CAT — tạo/sửa KH, HH/DV, UOM, tiền tệ (entity đơn giản).

```text
┌─ {Tạo mới / Sửa} {Entity} ─────────────────────────────────────────── [X] ─┐
│  fields…                                                                    │
│                              [ Hủy ]  [ Lưu ]                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Hệ thống nút (Button taxonomy)

### 5.1 Nhóm nút

| Nhóm | Nút | Shortcut | Style | Vị trí |
|------|-----|----------|-------|--------|
| **Primary CRUD** | Tải dữ liệu | — | Outlined neutral | Toolbar |
| | Tạo mới | F4 | Primary / blue | Toolbar |
| | Chỉnh sửa | F3 | Outlined teal | Toolbar |
| | Xóa | F8 | Outlined danger | Toolbar |
| **Secondary** | Sao chép, Nhập Excel, Xuất Excel, … | — | Outlined | **Chức năng ▾** |
| **Module-specific** | Xem mẫu HĐ, Ký gửi CQT, … | — | Outlined purple | Toolbar hoặc ▾ |
| **Form** | Hủy / Quay lại | — | Outlined | Footer trái/phải |
| | Lưu / Lưu thông tin | — | Primary | Footer phải |
| | Ký / Ký & gửi CQT | — | Primary purple | Footer phải |

### 5.2 Menu **Chức năng ▾**

Gom các thao tác **không dùng hàng ngày** hoặc **theo lô**:

- Nhập/Kết xuất Excel
- Sao chép (nếu toolbar đầy)
- Thay đổi thuế suất hàng loạt (HH/DV)
- Tạo User tra cứu (KH — Phase 2)
- Tải lên file chấp nhận (NĐ70)

Separator (`---`) trước nhóm Phase 2 / out MVP.

### 5.3 Trạng thái nút

| Điều kiện | Hành vi |
|-----------|---------|
| Chưa chọn dòng | Sửa F3, Xóa F8, Sao chép → **disabled** |
| Chọn >1 dòng | Sửa F3 → disabled (chỉ sửa 1) |
| Trạng thái CQT đã gửi | Xóa → disabled hoặc confirm mạnh |
| Không quyền RBAC | Ẩn hoặc disabled + tooltip |

---

## 6. Bảng dữ liệu

| Quy tắc | Giá trị |
|---------|---------|
| Font | `text-sm` body, `text-xs` header |
| Row hover | `bg-teal-50/30` hoặc tương đương |
| Zebra | Xen kẽ `white` / `slate-50/50` (optional) |
| Status badge | Pill rounded: xanh=OK, cam=chờ, đỏ=lỗi, xanh dương=đã gửi |
| Horizontal scroll | `min-w-*` trên table khi nhiều cột |
| Column filter | Input text hoặc dropdown ngay dưới header |

---

## 7. Badge trạng thái (tham chiếu M-Invoice)

| Ngữ cảnh | Giá trị | Màu |
|----------|---------|-----|
| Trạng thái gửi CQT | Chưa gửi | Cam |
| | Đã gửi | Xanh dương |
| Phản hồi CQT | Chấp nhận | Xanh |
| | Không tiếp nhận / Không chấp nhận | Đỏ |
| Bước tiếp theo | Hoàn thành | Xanh |
| | Tạo tờ khai mới | Xanh dương outline |
| | Vui lòng ký & gửi CQT | Tím |

---

## 8. Typography & hệ màu (Color system)

### 8.1 Typography

| Token | Giá trị | Dùng cho |
|-------|---------|----------|
| `--font-sans` | Inter + system stack | Toàn app |
| `text-lg font-semibold` | 18px / 600 | Tiêu đề trang |
| `text-sm` | 14px | Body, input, bảng |
| `text-xs` | 12px | Header cột, hint, paginator |
| `font-mono` | monospace | MST, mã CQT, error code |

### 8.2 Nguyên tắc màu

| # | Quy tắc |
|---|---------|
| C-01 | **Neutrals (slate)** cho nền, border, text phụ — không dùng pure black `#000`. |
| C-02 | **Một hành động primary** mỗi vùng (toolbar / footer form) — màu `primary`. |
| C-03 | **Danger** chỉ cho Xóa, lỗi, trạng thái từ chối CQT — không dùng cho cảnh báo nhẹ. |
| C-04 | **Status badge** dùng nền `-50` + chữ `-700` cùng hue (không nền đặc saturation cao). |
| C-05 | **Focus ring** thống nhất `teal-600/20` (input) hoặc hue nút tương ứng. |
| C-06 | Implement qua Tailwind + `@jarvis/core/theme.css`; product **không** hard-code hex ngoài token. |

### 8.3 Bảng token màu (MVP)

#### Neutrals & surface

| Token | Hex | Tailwind | Dùng cho |
|-------|-----|----------|----------|
| `--color-surface-page` | `#f8fafc` | `slate-50` | Nền app (`#root`, main) |
| `--color-surface-panel` | `#ffffff` | `white` | Panel, dialog, filter bar |
| `--color-border` | `#e2e8f0` | `slate-200` | Border input, table, panel |
| `--color-border-hover` | `#cbd5e1` | `slate-300` | Input hover |
| `--color-ink` | `#18181b` | `zinc-900` | Text chính (Jarvis default) |
| `--color-ink-secondary` | `#475569` | `slate-600` | Header cột, label phụ |
| `--color-ink-muted` | `#94a3b8` | `slate-400` | Placeholder, disabled |
| `--color-ink-heading` | `#0f172a` | `slate-900` | Tiêu đề trang |

#### Brand & actions

| Token | Hex | Tailwind | Dùng cho |
|-------|-----|----------|----------|
| `--color-primary` | `#2563eb` | `blue-600` | Nút **Tạo mới**, Lưu (filled) |
| `--color-primary-hover` | `#1d4ed8` | `blue-700` | Hover primary |
| `--color-accent` | `#0d9488` | `teal-600` | Focus input, row hover, menu active |
| `--color-accent-subtle` | `#f0fdfa` | `teal-50` | Row hover, selected menu |
| `--color-edit` | `#0d9488` | `teal-600` | Nút **Chỉnh sửa** (outlined) |
| `--color-edit-border` | `#99f6e4` | `teal-200` | Border outlined edit |
| `--color-special` | `#9333ea` | `purple-600` | Ký gửi CQT, Copy mẫu |
| `--color-special-subtle` | `#faf5ff` | `purple-50` | Nền badge bước tiếp theo |

#### Semantic (feedback)

| Token | Hex | Tailwind | Dùng cho |
|-------|-----|----------|----------|
| `--color-danger` | `#dc2626` | `red-600` | Xóa, lỗi text, toast error |
| `--color-danger-subtle` | `#fef2f2` | `red-50` | Nền badge lỗi / invalid field |
| `--color-danger-border` | `#fecaca` | `red-200` | Border nút Xóa outlined |
| `--color-success` | `#059669` | `emerald-600` | Toast success, Chấp nhận CQT |
| `--color-success-subtle` | `#ecfdf5` | `emerald-50` | Badge thành công |
| `--color-warning` | `#d97706` | `amber-600` | Chưa gửi, Chờ ký |
| `--color-warning-subtle` | `#fffbeb` | `amber-50` | Badge chờ |
| `--color-info` | `#2563eb` | `blue-600` | Đã gửi CQT, toast info |

#### Status badge mapping (ôn lại §7)

| Trạng thái | Nền | Chữ |
|------------|-----|-----|
| Thành công / Chấp nhận | `#ecfdf5` | `#047857` |
| Chờ / Chưa gửi | `#fffbeb` | `#b45309` |
| Lỗi / Từ chối | `#fef2f2` | `#b91c1c` |
| Đã gửi / Info | `#eff6ff` | `#1d4ed8` |
| Neutral | `#f1f5f9` | `#475569` |

### 8.4 Nút — map màu

| Nút | Style | Màu chính |
|-----|-------|-----------|
| Tạo mới / Lưu | Filled primary | `blue-600` / white text |
| Chỉnh sửa | Outlined | border `teal-200`, text `teal-700` |
| Xóa | Outlined danger | border `red-200`, text `red-600` |
| Tải DL / Hủy | Outlined neutral | border `slate-200`, text `slate-700` |
| Ký / Ký & gửi CQT | Filled/outlined special | `purple-600` |

Implement tham chiếu: `frontend/src/app/ui/fieldStyles.ts`, `KitButton.tsx`.

---

## 9. Thông báo & hiển thị lỗi

### 9.1 Định dạng bắt buộc

Mọi thông báo **lỗi** (validation, nghiệp vụ, API, CQT) SHALL hiển thị:

```text
[code] message
```

| Thành phần | Quy tắc | Ví dụ |
|------------|---------|-------|
| **code** | UPPER_SNAKE hoặc `{MOD}-{TYPE}-{NNN}`; bọc `[]`; `font-mono text-xs` | `[INV-VAL-001]` |
| **message** | Tiếng Việt, câu đầy đủ, không jargon kỹ thuật với end-user | `Không thể xóa hóa đơn đã ký` |
| Khoảng cách | Một space sau `]` | `[REG-BR-01] Ký hiệu không hợp lệ` |

**Không** hiển thị stack trace, raw JSON, hoặc HTTP status cho user cuối.

### 9.2 Quy ước mã lỗi

| Prefix | Nguồn | Ví dụ |
|--------|-------|-------|
| `{MOD}-VAL-{NNN}` | Validation form FE | `CAT-VAL-001` — MST không đúng định dạng |
| `{MOD}-BR-{NN}` | Business rule (map DOC-04) | `INV-BR-01` — HĐ đã ký không được sửa |
| `{MOD}-API-{NNN}` | API envelope backend | `REG-API-003` — Mẫu HĐ đang được sử dụng |
| `CQT-{code}` | Phản hồi CQT | `CQT-ERR-102` — MST không tồn tại |
| `SYS-{NNN}` | Hệ thống / network | `SYS-001` — Mất kết nối máy chủ |

Backend SHOULD trả `{ code, message }` trong error envelope Jarvis; FE format lại thành `[code] message` nếu API chưa bọc sẵn.

### 9.3 Kênh hiển thị

| Kênh | Khi dùng | Vị trí / component | Thời gian |
|------|----------|-------------------|-----------|
| **Toast error** | Lỗi API, lỗi lưu/xóa, lỗi không gắn 1 field | `@jarvis/core` `notify.error()` — góc trên phải | 5s; sticky nếu `severity=critical` |
| **Toast success** | Lưu/xóa/ký thành công | `notify.success()` | 3s |
| **Inline field** | Validation form (Zod / field-level) | Dưới input — `[CAT-VAL-001] …` hoặc message ngắn nếu code trùng field | Đến khi sửa |
| **Banner form** | Lỗi nhiều field / lỗi submit tổng | Đầu dialog hoặc đầu form full-page | Đến khi submit lại |
| **Empty table** | Không có kết quả (không phải lỗi) | Giữa bảng — text `#dc2626` *"Không tìm thấy kết quả"* | — |
| **Badge / cell** | Trạng thái CQT trên dòng | Cột trạng thái — kèm tooltip `[CQT-xxx] message` nếu hover | — |

### 9.4 Quy tắc UX lỗi

| # | Quy tắc |
|---|---------|
| E-01 | **Một toast** cho cùng một thao tác; không spam N toast khi batch fail. |
| E-02 | Lỗi **401/403** → redirect login hoặc toast `[SYS-403] Không có quyền thực hiện`. |
| E-03 | Lỗi **network** → `[SYS-001] Không thể kết nối máy chủ. Thử lại sau.` + nút Tải DL. |
| E-04 | Confirm trước Xóa — nếu fail vẫn toast `[code] message`. |
| E-05 | Dialog/form: focus field lỗi **đầu tiên** sau submit invalid. |
| E-06 | Copy code: user có thể copy `[code]` từ toast (optional Phase 2). |

### 9.5 Ví dụ

```text
Toast:     [INV-API-012] Không thể ký hóa đơn — chưa cấu hình chứng thư số
Inline:    [CAT-VAL-002] Mã số thuế phải có 10 hoặc 13 chữ số
Banner:    [REG-BR-01] Ký hiệu không tuân cấu trúc TCT — kiểm tra lại mục Ký hiệu
```

---

## 10. Responsive

### 10.1 Triết lý

| # | Quy tắc |
|---|---------|
| R-01 | **Desktop-first** — kế toán dùng màn hình ≥1280px là chính; mobile hỗ trợ tra cứu, không yêu cầu parity đầy đủ. |
| R-02 | **Không ẩn chức năng** — co layout / scroll / collapse; chỉ ẩn cột bảng không critical. |
| R-03 | Breakpoint theo **Tailwind v4** mặc định. |

### 10.2 Breakpoints

| Token | Min width | Layout |
|-------|-----------|--------|
| default | `< 640px` | Sidebar **overlay**; toolbar wrap; filter stack dọc |
| `sm` | `640px` | Toolbar 2 hàng max; table scroll ngang |
| `md` | `768px` | Sidebar **icon-only** (collapsed); content rộng hơn |
| `lg` | `1024px` | Sidebar mở rộng; page header 1 hàng |
| `xl` | `1280px` | Full column set; bộ lọc nâng cao 1 hàng |
| `2xl` | `1536px` | Editor split 40/60 (Pattern E) thoải mái |

### 10.3 Thành phần theo breakpoint

| Thành phần | `< md` | `md – lg` | `≥ lg` |
|------------|--------|-----------|--------|
| **Sidebar** | Drawer overlay, đóng sau navigate | Collapsed (icon) | Expanded + label |
| **Navbar** | Ẩn tenant name dài; giữ MST rút gọn | Hiện Tên DN truncate | Full tenant info |
| **Page header** | Title full width; toolbar hàng dưới | Cùng hàng, wrap | Cùng hàng, no wrap |
| **Bộ lọc nâng cao** | Stack: Từ ngày / Đến ngày / filters / nút | 2 hàng | 1 hàng |
| **Table** | `overflow-x-auto`; ẩn cột phụ (≥3 cột cuối) | Scroll ngang | Full columns |
| **Dialog** | Full-screen (`100vw`) | `max-w-lg` centered | `max-w-lg` / `max-w-2xl` |
| **Gallery cards** | 1 cột | 2 cột | 4 cột |
| **Editor split (E)** | Tab + preview **stack** dọc | 50/50 | 40/60 |

### 10.4 Touch & accessibility

| Quy tắc | Giá trị |
|---------|---------|
| Hit target tối thiểu | 44×44px trên `< md` |
| Table row | Tap mở row actions (thay hover-only) |
| Phím tắt F3/F4/F8 | Chỉ desktop — ẩn label shortcut trên `< md` nếu chật |

### 10.5 CSS gợi ý (product host)

```css
/* Đã áp dụng — index.css */
#root main { padding: 0.375rem; }
@media (min-width: 1024px) { #root main { padding: 0.5rem; } }
```

Sidebar/table responsive do `@jarvis/core` `AdminLayout` + Tailwind utilities (`flex-wrap`, `overflow-x-auto`, `hidden lg:table-cell`).

---

## 11. Routing convention

| Loại | Pattern route einvoice |
|------|------------------------|
| List | `/phat-hanh/mau-hoa-don`, `/danh-muc/khach-hang` |
| Create gallery | `/phat-hanh/mau-hoa-don/create` |
| Create/edit editor | `/phat-hanh/mau-hoa-don/create/:templateId?invoiceType=` |
| ND70 list | `/phat-hanh/to-khai-nd70` |
| ND70 form | `/phat-hanh/to-khai-nd70/create`, `/phat-hanh/to-khai-nd70/:id` |
| Dialog CRUD | Không đổi URL — `?` query optional |

---

## 12. MVP scope UI

| Có MVP | Không MVP (ẩn/Phase 2) |
|--------|----------------------|
| Shell sidebar + navbar, bộ lọc nâng cao, paginator | Hỗ trợ chat FAB |
| CRUD + Excel import/export label | Tạo User tra cứu (KH) |
| Gallery + editor mẫu HĐ | Tờ khai NĐ123 menu |
| Tờ khai NĐ70 full-page | Ngân hàng (CAT) |

---

## 13. Traceability

| Artifact | Liên kết |
|----------|----------|
| Shell wireframe | [DOC-19-prototype-shell.md](../04-platform/DOC-19-prototype-shell.md) |
| REG screens | [register/DOC-06-srs.md](../03-modules/register/DOC-06-srs.md) §6 |
| CAT screens | [catalog/DOC-06-srs.md](../03-modules/catalog/DOC-06-srs.md) §6 |
| Component implement | `frontend/src/app/ui/` |
