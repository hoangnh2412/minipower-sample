# DOC-06 — SRS — invoice (INV)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · **UI governance:** [DOC-20-ui-design-principles.md](../../00-governance/DOC-20-ui-design-principles.md)  
**Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module **Hóa đơn đầu ra**: tra cứu, lập, sửa, xóa, ký số, gửi CQT, tải XML, đồng bộ trạng thái.

| Mục | Giá trị |
|-----|---------|
| **Route** | `/hoa-don` |
| **MVP FR** | 15 (INV-FR-01 … 11, 14, 16, 18, 20) |
| **Core flow MVP** | Lập → Lưu (Chờ ký) → Ký gửi CQT → Thành công → Tải XML |

### 1.1 Trạng thái gửi CQT (MVP)

| Trạng thái | Ý nghĩa | BR |
|------------|---------|-----|
| Chờ ký | Nháp, chưa ký/gửi CQT | INV-BR-06 |
| Thành công | CQT chấp nhận; có mã CQT | INV-BR-06 |
| Có lỗi | Gửi/validate lỗi — xem chi tiết | INV-BR-06 |

---

## 2. Functional Requirements (MVP v1.0)

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| INV-FR-01 | Hệ thống SHALL hiển thị danh sách HĐ với bộ lọc nâng cao (Từ/Đến ngày, trạng thái, MST, ký hiệu…) và filter inline cột; phân trang | Must | INV-UC-001 | INV-BR-06 |
| INV-FR-02 | Hệ thống SHALL cho phép lập HĐ mới (F4) modal: ký hiệu, ngày, tiền tệ, tỷ giá, HTTT | Must | INV-UC-002 | — |
| INV-FR-03 | Hệ thống SHALL pre-fill thông tin bên bán từ SYS-FR-01; cho phép sửa trên form | Must | INV-UC-002 | — |
| INV-FR-04 | Hệ thống SHALL tra cứu người mua theo MST (CQT + danh mục KH) | Must | INV-UC-002 | INV-BR-04 |
| INV-FR-05 | Hệ thống SHALL grid nhiều dòng HHDV; tính tiền, thuế, tổng tự động | Must | INV-UC-002 | INV-BR-07 |
| INV-FR-06 | Hệ thống SHALL lưu HĐ trạng thái **Chờ ký** trước ký gửi | Must | INV-UC-002 | INV-BR-06 |
| INV-FR-07 | Hệ thống SHALL sửa HĐ Chờ ký; SHALL NOT sửa HĐ đã ký | Must | INV-UC-003 | INV-BR-01 |
| INV-FR-08 | Hệ thống SHALL xóa HĐ Chờ ký (F8) theo quy tắc sinh số SYS-FR-06 | Must | INV-UC-004 | INV-BR-02, 03 |
| INV-FR-09 | Hệ thống SHALL sao chép HĐ → bản mới Chờ ký | Must | INV-UC-005 | — |
| INV-FR-10 | Hệ thống SHALL xem trước và in PDF HĐ | Must | INV-UC-006 | — |
| INV-FR-11 | Hệ thống SHALL ký số và gửi XML CQT; cập nhật mã/trạng thái | Must | INV-UC-007 | INV-BR-06, 08 |
| INV-FR-14 | Hệ thống SHALL lấy lại mã CQT khi lỗi/treo | Must | INV-UC-010 | — |
| INV-FR-16 | Hệ thống SHALL export XML HĐ đã ký thành công | Must | INV-UC-012 | — |
| INV-FR-18 | Hệ thống SHALL đồng bộ trạng thái HĐ từ CQT (batch) | Must | INV-UC-014 | — |
| INV-FR-20 | Hệ thống SHALL hiển thị **Tổng tiền** danh sách theo filter hiện tại | Must | INV-UC-001 | — |

---

## 3. Acceptance Criteria

| AC ID | FR | Given / When / Then |
|-------|-----|---------------------|
| INV-AC-001 | INV-FR-01 | **Given** tenant có HĐ · **When** mở list + Tìm theo Từ/Đến ngày · **Then** chỉ HĐ trong kỳ; paginator đúng |
| INV-AC-002 | INV-FR-01, 20 | **Given** filter active · **When** xem footer · **Then** `Tổng: {sum}` = sum cột tổng tiền các dòng filter |
| INV-AC-003 | INV-FR-02…06 | **Given** quyền lập HĐ · **When** F4 → Lưu hợp lệ · **Then** HĐ Chờ ký; toast success (AC-MVP-03) |
| INV-AC-004 | INV-FR-03 | **Given** DN đã cấu hình · **When** F4 · **Then** bên bán pre-fill SYS-FR-01 |
| INV-AC-005 | INV-FR-04 | **Given** MST hợp lệ CQT · **When** Tìm kiếm MST · **Then** điền tên, địa chỉ (INV-BR-04) |
| INV-AC-006 | INV-FR-05 | **Given** dòng SL=2, ĐG=100k, VAT=10% · **When** đổi SL · **Then** thuế và tổng recalc (INV-BR-07) |
| INV-AC-007 | INV-FR-07 | **Given** HĐ Chờ ký · **When** F3 sửa Lưu · **Then** persist; vẫn Chờ ký |
| INV-AC-008 | INV-FR-07 | **Given** HĐ Thành công · **When** F3 · **Then** disabled / `[INV-BR-01]` (AC-MVP-07) |
| INV-AC-009 | INV-FR-08 | **Given** sinh số khi lập · **When** xóa không phải số max · **Then** `[INV-BR-02]` |
| INV-AC-010 | INV-FR-08 | **Given** sinh số khi ký · **When** xóa bất kỳ Chờ ký · **Then** xóa OK |
| INV-AC-011 | INV-FR-09 | **When** Sao chép · **Then** HĐ mới Chờ ký; không copy số HĐ/mã CQT |
| INV-AC-012 | INV-FR-10 | **When** Xem in · **Then** PDF khớp mẫu REG |
| INV-AC-013 | INV-FR-11 | **Given** Chờ ký + CTS · **When** Ký gửi · **Then** Thành công + mã CQT (AC-MVP-04) |
| INV-AC-014 | INV-FR-11 | **Given** CQT trả lỗi · **When** Ký gửi · **Then** Có lỗi + `[CQT-xxx] message` |
| INV-AC-015 | INV-FR-11 | **Given** không CTS · **When** Ký · **Then** `[INV-BR-08]` |
| INV-AC-016 | INV-FR-14 | **Given** HĐ Có lỗi/treo · **When** Lấy lại mã · **Then** cập nhật hoặc báo lỗi (AC-MVP-06) |
| INV-AC-017 | INV-FR-16 | **Given** Thành công · **When** Tải XML · **Then** XML hợp lệ TCT (AC-MVP-05) |
| INV-AC-018 | INV-FR-18 | **Given** HĐ đã gửi · **When** Cập nhật TT CQT · **Then** trạng thái đồng bộ |

---

## 4. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| INV-NFR-01 | XML HĐ tuân chuẩn TCT / NĐ 70 |
| INV-NFR-02 | PDF render nhất quán với XML |
| INV-NFR-03 | Phím tắt F4, F8, F9 trên desktop |
| INV-NFR-04 | Lỗi hiển thị `[code] message` — DOC-20 §9 |
| INV-NFR-05 | List load ≤ 3s với 50 dòng (p95 demo) |

---

## 5. Out of MVP v1.0

| FR ID | Ghi chú |
|-------|---------|
| INV-FR-12 | Gửi email — Phase 2 |
| INV-FR-13 | Ký hàng loạt — Phase 2 |
| INV-FR-15 | Import Excel — Phase 2 |
| INV-FR-17 | HĐ chiết khấu — Phase 2 (INV-BR-05) |
| INV-FR-19 | Chuyển ký hiệu — Phase 2 |

Module **ERR** (thay thế/điều chỉnh) out MVP — INV-BR-01 chỉ chặn sửa.

---

## 6. Đặc tả màn hình & điều khiển

> ID: `UI-INV-{SCR}-{NNN}` · Pattern: [DOC-20](../../00-governance/DOC-20-ui-design-principles.md)  
> Tham chiếu: [M-Invoice `#/hoa-don`](https://hddt.minvoice.com.vn/#/hoa-don)

### 6.1 SCR-INV-LIST — Danh sách hóa đơn đầu ra

| Mục | Giá trị |
|-----|---------|
| **Route** | `/hoa-don` |
| **Pattern** | L — List |
| **FR** | INV-FR-01, 08, 09, 11, 14, 16, 18, 20 |

#### 6.1.1 Page header

| UI ID | Thành phần | Hành vi |
|-------|------------|---------|
| UI-INV-LIST-001 | Tiêu đề | Text: **Hóa đơn đầu ra** |

#### 6.1.2 Toolbar (primary)

| UI ID | Nút | Shortcut | Enabled khi | Hành vi |
|-------|-----|----------|-------------|---------|
| UI-INV-LIST-010 | Tải dữ liệu | — | Luôn | Reload list; giữ filter |
| UI-INV-LIST-011 | Tạo mới | F4 | Quyền create | Mở SCR-INV-FORM (create) |
| UI-INV-LIST-012 | Chỉnh sửa | F3 | `selectedCount === 1` && Chờ ký | Mở SCR-INV-FORM (edit) |
| UI-INV-LIST-013 | Xóa | F8 | `selectedCount >= 1` && all Chờ ký | Confirm → delete (BR-02/03) |
| UI-INV-LIST-014 | Chức năng ▾ | — | Luôn | Menu §6.1.4 |
| UI-INV-LIST-015 | Lấy lại mã CQT | — | ≥1 HĐ Có lỗi/treo | INV-UC-010 |

> **Out MVP toolbar:** Ký hàng loạt, Nghiệp vụ ▾, HĐ chiết khấu — ẩn hoặc disabled.

#### 6.1.3 Bộ lọc nâng cao

| UI ID | Field | Loại | Bắt buộc | Ghi chú |
|-------|-------|------|----------|---------|
| UI-INV-LIST-020 | Từ ngày | Date | ✓ | `DD/MM/YYYY` |
| UI-INV-LIST-021 | Đến ngày | Date | ✓ | ≥ Từ ngày |
| UI-INV-LIST-022 | Ký hiệu HĐ | Select | | Lookup REG-FR-01 |
| UI-INV-LIST-023 | Trạng thái | Select | | Chờ ký / Thành công / Có lỗi |
| UI-INV-LIST-024 | Mã CQT | Text | | |
| UI-INV-LIST-025 | MST người mua | Text | | |
| UI-INV-LIST-026 | Tên khách hàng | Text | | |
| UI-INV-LIST-027 | Tìm | Button primary | | Apply filter → API |
| UI-INV-LIST-028 | Xóa lọc | Button outlined | | Reset default |

#### 6.1.4 Menu **Chức năng ▾**

| UI ID | Item | MVP | Hành vi |
|-------|------|-----|---------|
| UI-INV-LIST-030 | Tải XML | ✓ | Download XML (FR-16); cần Thành công |
| UI-INV-LIST-031 | Cập nhật TT CQT | ✓ | Batch sync (FR-18) |
| UI-INV-LIST-032 | Nhận Excel | ❌ P2 | — |
| UI-INV-LIST-033 | Chuyển ký hiệu | ❌ P2 | — |
| UI-INV-LIST-034 | Cài đặt cột | ✓ optional | Ẩn/hiện cột |

#### 6.1.5 Bảng dữ liệu

| UI ID | Cột | Filter inline | Sort |
|-------|-----|---------------|------|
| UI-INV-LIST-040 | # | Checkbox | — |
| UI-INV-LIST-041 | TT (Loại) | Dropdown | ✓ |
| UI-INV-LIST-042 | Tr.thái | Dropdown | ✓ |
| UI-INV-LIST-043 | Tr.CQT | Text | ✓ |
| UI-INV-LIST-044 | Mã CQT | Text | ✓ |
| UI-INV-LIST-045 | Ký hiệu | Text | ✓ |
| UI-INV-LIST-046 | Ngày HĐ | Date | ✓ |
| UI-INV-LIST-047 | Số HĐ | Text | ✓ |
| UI-INV-LIST-048 | MST | Text | ✓ |
| UI-INV-LIST-049 | Tên KH | Text | ✓ |
| UI-INV-LIST-050 | Tổng tiền | Number | ✓ |
| UI-INV-LIST-051 | Thao tác | — | RowActions |

#### 6.1.6 Row actions

| UI ID | Action | Enabled | UC |
|-------|--------|---------|-----|
| UI-INV-LIST-060 | Sửa | Chờ ký | INV-UC-003 |
| UI-INV-LIST-061 | Xem in | Luôn | INV-UC-006 |
| UI-INV-LIST-062 | Ký gửi CQT | Chờ ký | INV-UC-007 |
| UI-INV-LIST-063 | Sao chép | Luôn | INV-UC-005 |
| UI-INV-LIST-064 | Gửi email | ❌ P2 | INV-UC-008 |

#### 6.1.7 Footer

| UI ID | Thành phần | Hành vi |
|-------|------------|---------|
| UI-INV-LIST-070 | Paginator | `{from}–{to} trong {total}`; size 50 |
| UI-INV-LIST-071 | Tổng tiền | `Tổng: {formattedSum}` (FR-20) |

---

### 6.2 SCR-INV-FORM — Lập / sửa hóa đơn (modal F4/F3)

| Mục | Giá trị |
|-----|---------|
| **Pattern** | D — Dialog full-width |
| **FR** | INV-FR-02 … 07, 11 |
| **Title** | *Tạo mới Hóa đơn giá trị gia tăng* / *Chỉnh sửa hóa đơn* |

#### 6.2.1 Thông tin chung

| UI ID | Field | Loại | Validation |
|-------|-------|------|------------|
| UI-INV-FRM-010 | Ký hiệu | Select | Required; từ REG |
| UI-INV-FRM-011 | Ngày HĐ | Date | Required; ≤ today + policy |
| UI-INV-FRM-012 | Số HĐ | Text | Readonly nếu sinh số khi lập |
| UI-INV-FRM-013 | Tiền tệ | Lookup | CAT-FR-04; default VND |
| UI-INV-FRM-014 | Tỷ giá | Number | > 0; VND = 1 |
| UI-INV-FRM-015 | HT thanh toán | Lookup | CAT-FR-06 |
| UI-INV-FRM-016 | Số ĐH/BK CK | Text | Optional |

#### 6.2.2 Thông tin bên bán

| UI ID | Field | Nguồn |
|-------|-------|-------|
| UI-INV-FRM-020 | MST bên bán | SYS-FR-01 pre-fill |
| UI-INV-FRM-021 | Tên đơn vị | Editable |
| UI-INV-FRM-022 | Địa chỉ | Editable |
| UI-INV-FRM-023 | Email / SĐT / STK | Optional |

#### 6.2.3 Thông tin người mua

| UI ID | Field | Hành vi |
|-------|-------|---------|
| UI-INV-FRM-030 | MST | `[INV-VAL-001]` format; trigger BR-04 |
| UI-INV-FRM-031 | Tìm kiếm 🔍 | Tra CQT + CAT |
| UI-INV-FRM-032 | Mã KH `[+]` | Lookup CAT-FR-01 |
| UI-INV-FRM-033 | Tên ĐV / Tên NM | Required |
| UI-INV-FRM-034 | Địa chỉ | Required |
| UI-INV-FRM-035 | Email / SĐT / STK | Optional |

#### 6.2.4 Grid HHDV

| UI ID | Cột / nút | Shortcut | BR |
|-------|-----------|----------|-----|
| UI-INV-FRM-040 | Checkbox dòng | — | Multi-select dòng |
| UI-INV-FRM-041 | STT | — | Auto |
| UI-INV-FRM-042 | Mã HH `[+]` | — | Lookup CAT-FR-02 |
| UI-INV-FRM-043 | Tên hàng | Text | Required |
| UI-INV-FRM-044 | UOM | Lookup | CAT-FR-03 |
| UI-INV-FRM-045 | Số lượng | Number | > 0 |
| UI-INV-FRM-046 | Đơn giá | Number | ≥ 0 |
| UI-INV-FRM-047 | %CK | Number | 0–100 |
| UI-INV-FRM-048 | Tiền CK | Calc | Readonly |
| UI-INV-FRM-049 | Trước thuế | Calc | Readonly |
| UI-INV-FRM-050 | %VAT | Select | CAT-BR-02 |
| UI-INV-FRM-051 | Tiền thuế | Calc | Readonly |
| UI-INV-FRM-052 | Thêm dòng | F9 | Insert row |
| UI-INV-FRM-053 | Xóa dòng | F8 | Remove selected |

#### 6.2.5 Tổng cộng

| UI ID | Field | Hành vi |
|-------|-------|---------|
| UI-INV-FRM-060 | Tổng TH / CK / Chưa thuế / Thuế / Tổng TT | Sum grid (BR-07) |
| UI-INV-FRM-061 | Bằng chữ | VND read-aloud |

#### 6.2.6 Footer modal

| UI ID | Nút | Hành vi |
|-------|-----|---------|
| UI-INV-FRM-070 | Đóng | Confirm if dirty |
| UI-INV-FRM-071 | Xem trước | Preview PDF (FR-10) |
| UI-INV-FRM-072 | Lưu | Validate → Chờ ký (FR-06) |
| UI-INV-FRM-073 | Lưu & ký | Lưu → Ký gửi (FR-11) |

---

### 6.3 SCR-INV-PREVIEW — Xem in

| UI ID | Thành phần | Hành vi |
|-------|------------|---------|
| UI-INV-PRV-001 | Viewer PDF/HTML | Full mẫu in |
| UI-INV-PRV-002 | In | Browser print |
| UI-INV-PRV-003 | Đóng | Close dialog |

---

## 7. Traceability UI → FR

| Screen | FR |
|--------|-----|
| SCR-INV-LIST | 01, 08, 09, 14, 16, 18, 20 |
| SCR-INV-FORM | 02–07, 11 |
| SCR-INV-PREVIEW | 10 |
