# DOC-06 — SRS — register (REG)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · **UI governance:** [DOC-20-ui-design-principles.md](../../00-governance/DOC-20-ui-design-principles.md)  
**Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module đăng ký phát hành hóa đơn với CQT: khai báo mẫu HĐ, lập và gửi tờ khai.

**MVP v1.0:** 2 FR (REG-FR-01, 03). **Không** tờ khai NĐ123/2020.

---

## 2. Functional Requirements (MVP v1.0)

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| REG-FR-01 | Hệ thống SHALL cho phép khai báo, sửa, xem danh sách mẫu hóa đơn theo chuẩn TCT | Must | REG-UC-001 | REG-BR-01 |
| REG-FR-03 | Hệ thống SHALL hỗ trợ lập, ký, gửi tờ khai đăng ký/thay đổi theo NĐ 70/2025, NĐ 254/2026 | Must | REG-UC-003 | REG-BR-03 |

---

## 3. Acceptance Criteria

| AC ID | FR | Given / When / Then |
|-------|-----|---------------------|
| REG-AC-001 | REG-FR-01 | **Given** kế toán có quyền · **When** tạo mẫu HĐ qua gallery → customize → Lưu · **Then** mẫu tuân REG-BR-01; hiển thị trên danh sách |
| REG-AC-002 | REG-FR-01 | **Given** mẫu HĐ đã có · **When** sửa / xem danh sách / lọc / phân trang · **Then** thay đổi persist |
| REG-AC-003 | REG-FR-03 | **Given** DN + CTS · **When** Tạo mới → full-page form → Ký & gửi CQT · **Then** tờ khai truyền thành công |
| REG-AC-004 | REG-FR-03 | **Given** tờ khai gửi lỗi · **When** xem chi tiết · **Then** hiển thị mã/lý do lỗi CQT |
| REG-AC-005 | REG-FR-03 | **Given** chưa CTS · **When** Ký tờ khai · **Then** báo lỗi; không gửi |
| REG-AC-006 | REG-FR-03 | **Given** danh sách NĐ70 · **When** bấm Tạo mới (F4) · **Then** **navigate** `/phat-hanh/to-khai-nd70/create` — **không** popup |

---

## 4. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| REG-NFR-01 | XML tờ khai tuân NĐ 70/2025 và TT liên quan |
| REG-NFR-02 | Ký số bắt buộc trước khi gửi CQT |
| REG-NFR-03 | Preview mẫu HĐ render ≤ 2s sau thay đổi field |

---

## 5. Out of MVP v1.0

| FR ID | Ghi chú |
|-------|---------|
| REG-FR-02 | Tờ khai NĐ123/2020 — **loại MVP** |

---

## 6. Đặc tả màn hình & điều khiển

> Quy ước ID: `UI-REG-{SCR}-{NNN}` · Pattern: [DOC-20 §4](../../00-governance/DOC-20-ui-design-principles.md#4-pattern-layout)  
> Tham chiếu M-Invoice: [mau-hoa-don](https://hddt.minvoice.com.vn/#/phat-hanh/mau-hoa-don) · [create](https://hddt.minvoice.com.vn/#/phat-hanh/mau-hoa-don/create) · [customize](https://hddt.minvoice.com.vn/#/phat-hanh/mau-hoa-don/create/{id}) · [NĐ70](https://hddt.minvoice.com.vn/#/phat-hanh/to-khai-dang-ky-nd70)

### 6.1 SCR-REG-TPL-LIST — Danh sách mẫu hóa đơn

| Mục | Giá trị |
|-----|---------|
| **Route** | `/phat-hanh/mau-hoa-don` |
| **Pattern** | L — List CRUD |
| **FR** | REG-FR-01 |
| **Breadcrumb** | Đăng ký phát hành > Mẫu hóa đơn |

#### 6.1.1 Toolbar

| UI ID | Nút | Shortcut | Loại | Hành vi | Enabled khi |
|-------|-----|----------|------|---------|-------------|
| UI-REG-TPL-LIST-001 | Tải dữ liệu | — | Primary toolbar | Reload danh sách từ API; giữ filter/pagination | Luôn |
| UI-REG-TPL-LIST-002 | Tạo mới | F4 | Primary toolbar | Navigate `/phat-hanh/mau-hoa-don/create` | Có quyền tạo |
| UI-REG-TPL-LIST-003 | Chỉnh sửa | F3 | Primary toolbar | Navigate editor với `templateId` dòng chọn | `selectedCount === 1` |
| UI-REG-TPL-LIST-004 | Xóa | F8 | Primary toolbar | Confirm → xóa mẫu chọn | `selectedCount >= 1` |
| UI-REG-TPL-LIST-005 | Xem mẫu hóa đơn | — | Primary toolbar | Mở preview PDF/HTML mẫu chọn (tab mới hoặc modal preview) | `selectedCount === 1` |
| UI-REG-TPL-LIST-006 | Copy mẫu hóa đơn | — | Primary toolbar | Nhân bản mẫu → mở editor bản copy | `selectedCount === 1` |

> **Chức năng ▾:** không bắt buộc MVP cho màn này (≤6 nút primary).

#### 6.1.2 Bảng dữ liệu

| UI ID | Cột | Filter | Sort | Ghi chú |
|-------|-----|--------|------|---------|
| UI-REG-TPL-LIST-010 | # | — | — | Checkbox chọn dòng |
| UI-REG-TPL-LIST-011 | Loại hóa đơn | Dropdown/text | ✓ | VD: Hóa đơn GTGT, Hóa đơn bán hàng, Vé/Thẻ điện tử |
| UI-REG-TPL-LIST-012 | Ký hiệu | Text | ✓ | VD: `1C26TLC` |
| UI-REG-TPL-LIST-013 | Số dòng in mẫu | Number | ✓ | Số dòng HH trên bản in |
| UI-REG-TPL-LIST-014 | Người tạo | Text | ✓ | Username |
| UI-REG-TPL-LIST-015 | Ngày tạo | Date | ✓ | `DD/MM/YYYY` |
| UI-REG-TPL-LIST-016 | Sử dụng | Dropdown (Có/Không) | ✓ | Checkbox/toggle đánh dấu mẫu đang dùng |

#### 6.1.3 Paginator

| UI ID | Thành phần | Hành vi |
|-------|------------|---------|
| UI-REG-TPL-LIST-020 | Thông tin trang | `{from}–{to} trong {total} bản ghi` |
| UI-REG-TPL-LIST-021 | Điều hướng | Trang đầu / trước / số trang / sau / cuối |
| UI-REG-TPL-LIST-022 | Page size | Dropdown: 50 (default), 100 |

#### 6.1.4 Phím tắt

| Phím | UI ID map |
|------|-----------|
| F4 | UI-REG-TPL-LIST-002 |
| F3 | UI-REG-TPL-LIST-003 |
| F8 | UI-REG-TPL-LIST-004 |

---

### 6.2 SCR-REG-TPL-GALLERY — Chọn template mẫu (tạo mới bước 1)

| Mục | Giá trị |
|-----|---------|
| **Route** | `/phat-hanh/mau-hoa-don/create` |
| **Pattern** | G — Gallery |
| **FR** | REG-FR-01 |

#### 6.2.1 Filter bar

| UI ID | Control | Loại | Hành vi |
|-------|---------|------|---------|
| UI-REG-TPL-GAL-001 | Loại hóa đơn | Select | Lọc template theo loại HĐ (GTGT, bán hàng, …) |
| UI-REG-TPL-GAL-002 | Loại doanh nghiệp | Select | Lọc theo loại DN (Thông thường, …) |
| UI-REG-TPL-GAL-003 | Tên mẫu | Text | Tìm theo tên template (debounce 300ms) |
| UI-REG-TPL-GAL-004 | Khổ giấy | Select | A4, A5, … |

#### 6.2.2 Lưới template

| UI ID | Thành phần | Hành vi |
|-------|------------|---------|
| UI-REG-TPL-GAL-010 | Template card | Hiển thị thumbnail + tên mẫu (watermark "Mẫu") |
| UI-REG-TPL-GAL-011 | Click card | Navigate `/phat-hanh/mau-hoa-don/create/{templateId}?invoiceType={typeId}` |

#### 6.2.3 Footer

| UI ID | Nút | Hành vi |
|-------|-----|---------|
| UI-REG-TPL-GAL-020 | Quay lại | Navigate `/phat-hanh/mau-hoa-don` |
| UI-REG-TPL-GAL-021 | Paginator | Page size default **4**/trang; hiển thị "Tổng số N bản ghi" |

---

### 6.3 SCR-REG-TPL-EDIT — Customize mẫu hóa đơn

| Mục | Giá trị |
|-----|---------|
| **Route** | `/phat-hanh/mau-hoa-don/create/:templateId?invoiceType=` |
| **Pattern** | E — Editor split |
| **FR** | REG-FR-01 · **BR** REG-BR-01 |

#### 6.3.1 Header

| UI ID | Control | Hành vi |
|-------|---------|---------|
| UI-REG-TPL-ED-001 | Mẫu hóa đơn điện tử | Radio/toggle — loại mẫu |
| UI-REG-TPL-ED-002 | Mẫu hóa đơn chuyển đổi | Radio/toggle — loại mẫu |
| UI-REG-TPL-ED-003 | Lấy lại mặc định | Reset form về default template gốc |

#### 6.3.2 Tab **Thông tin chung**

| UI ID | Field | Loại | Validation / BR |
|-------|-------|------|-----------------|
| UI-REG-TPL-ED-010 | Mẫu số | Select readonly | Theo loại HĐ (VD: `1 - Hóa đơn GTGT`) |
| UI-REG-TPL-ED-011 | Ký hiệu — phần 1 | Select | Mã loại HĐ |
| UI-REG-TPL-ED-012 | Ký hiệu — C/K | Select | C=có mã, K=không mã |
| UI-REG-TPL-ED-013 | Ký hiệu — năm | Select | 2 chữ số năm (VD: 26) |
| UI-REG-TPL-ED-014 | Ký hiệu — loại phát hành | Select | T= tự ĐK với CQT, … |
| UI-REG-TPL-ED-015 | Ký hiệu — hậu tố | Text | 2 ký tự (VD: YY); user nhập |
| UI-REG-TPL-ED-016 | Ký hiệu (computed) | Text readonly | Ghép các phần → VD `1C26TYY` |
| UI-REG-TPL-ED-017 | Loại doanh nghiệp | Select | Thông thường, … |
| UI-REG-TPL-ED-018 | Song ngữ (Việt-Anh) | Checkbox | |
| UI-REG-TPL-ED-019 | Ký HĐ gửi ngay CQT | Checkbox | |
| UI-REG-TPL-ED-020 | Ký HĐ gửi BTH cuối kỳ | Checkbox | |
| UI-REG-TPL-ED-021 | Tùy chỉnh màu | Color picker | Default `#000000` |
| UI-REG-TPL-ED-022 | Font chữ | Select | VD: Times New Roman |
| UI-REG-TPL-ED-023 | Cỡ chữ | Number | VD: 13 |
| UI-REG-TPL-ED-024 | Giá trị người mua gạch chân | Checkbox | |
| UI-REG-TPL-ED-025 | Bảng có dòng kẻ hàng | Checkbox | |
| UI-REG-TPL-ED-026 | Số dòng trắng | Number | VD: 6 |
| UI-REG-TPL-ED-027 | Số dòng HĐ nhiều trang | Number | VD: 17 |
| UI-REG-TPL-ED-028 | Chữ ký thủ trưởng | Text | Nhãn tùy chỉnh |
| UI-REG-TPL-ED-029 | Hóa đơn gửi email — HTML | Checkbox | Phase 2 nếu chưa có email |

#### 6.3.3 Tab **Logo — Hình nền**

| UI ID | Field | Hành vi |
|-------|-------|---------|
| UI-REG-TPL-ED-040 | Upload logo | Blob store; preview ngay |
| UI-REG-TPL-ED-041 | Upload hình nền | Tùy chọn; preview |

#### 6.3.4 Tab **Tùy chỉnh chi tiết**

| UI ID | Field | Hành vi |
|-------|-------|---------|
| UI-REG-TPL-ED-050 | Danh sách vùng mẫu | Bật/tắt hoặc sửa label từng block trên mẫu in |
| UI-REG-TPL-ED-051 | Thiết lập số dòng ký hiệu cột | Cấu hình grid dòng HH |

#### 6.3.5 Preview panel

| UI ID | Thành phần | Hành vi |
|-------|------------|---------|
| UI-REG-TPL-ED-060 | Kích thước hiển thị | Slider/ select scale preview |
| UI-REG-TPL-ED-061 | Live preview | Cập nhật realtime khi đổi tab Thông tin chung |

#### 6.3.6 Footer actions

| UI ID | Nút | Hành vi |
|-------|-----|---------|
| UI-REG-TPL-ED-070 | Quay lại | Navigate gallery hoặc list (confirm nếu dirty) |
| UI-REG-TPL-ED-071 | Xem in | Preview print layout full |
| UI-REG-TPL-ED-072 | Lưu thông tin | Validate REG-BR-01 → POST/PUT API → toast → list |

---

### 6.4 SCR-REG-ND70-LIST — Danh sách tờ khai NĐ70

| Mục | Giá trị |
|-----|---------|
| **Route** | `/phat-hanh/to-khai-nd70` |
| **Pattern** | L — List CRUD |
| **FR** | REG-FR-03 |

#### 6.4.1 Toolbar

| UI ID | Nút | Shortcut | Hành vi | Enabled khi |
|-------|-----|----------|---------|-------------|
| UI-REG-ND70-LIST-001 | Tải dữ liệu | — | Reload | Luôn |
| UI-REG-ND70-LIST-002 | Tạo mới | F4 | **Navigate** `/phat-hanh/to-khai-nd70/create` | Có quyền |
| UI-REG-ND70-LIST-003 | Chỉnh sửa | F3 | Navigate `/phat-hanh/to-khai-nd70/{id}` | 1 dòng, trạng thái cho phép sửa |
| UI-REG-ND70-LIST-004 | Xóa | F8 | Confirm xóa nháp | Chọn dòng chưa gửi CQT |
| UI-REG-ND70-LIST-005 | Ký và gửi CQT | — | Ký số + transmit | 1 dòng trạng thái "Chưa gửi" |
| UI-REG-ND70-LIST-006 | Tải lên file chấp nhận | — | Upload file phản hồi CQT | Phase 2 / optional MVP |

| UI ID | Menu **Chức năng ▾** | Hành vi |
|-------|----------------------|---------|
| UI-REG-ND70-LIST-007 | Tải lên file chấp nhận | *(nếu chuyển vào dropdown)* |

#### 6.4.2 Bảng

| UI ID | Cột | Filter | Badge |
|-------|-----|--------|-------|
| UI-REG-ND70-LIST-010 | # | — | Checkbox |
| UI-REG-ND70-LIST-011 | Loại tờ khai | Dropdown | Đăng ký mới / Thay đổi |
| UI-REG-ND70-LIST-012 | Email liên hệ | Text | |
| UI-REG-ND70-LIST-013 | Ngày lập | Date | `DD/MM/YYYY` |
| UI-REG-ND70-LIST-014 | Trạng thái gửi CQT | Dropdown | Chưa gửi (cam) / Đã gửi (xanh) |
| UI-REG-ND70-LIST-015 | Phản hồi CQT | Dropdown | Chấp nhận / Không tiếp nhận / Không chấp nhận |
| UI-REG-ND70-LIST-016 | Bước tiếp theo | — | Link/badge hành động gợi ý |

#### 6.4.3 Hành vi cột **Bước tiếp theo**

| Giá trị | Hành vi click |
|---------|---------------|
| Hoàn thành | Read-only |
| Tạo tờ khai mới | Navigate create |
| Vui lòng ký & gửi CQT | Mở form + focus Ký |

---

### 6.5 SCR-REG-ND70-FORM — Tạo / sửa tờ khai NĐ70 (full-page)

| Mục | Giá trị |
|-----|---------|
| **Route** | `/phat-hanh/to-khai-nd70/create` · `/phat-hanh/to-khai-nd70/:id` |
| **Pattern** | F — Full-page form (**không popup**) |
| **FR** | REG-FR-03 · **BR** REG-BR-03 |

> **Delta einvoice (bắt buộc):** M-Invoice có thể mở overlay; einvoice **SHALL** dùng route riêng theo [DOC-20 §4.4](../../00-governance/DOC-20-ui-design-principles.md#44-pattern-f--full-page-form).

#### 6.5.1 Sections form

| UI ID | Section | Fields chính | Nguồn dữ liệu |
|-------|---------|--------------|---------------|
| UI-REG-ND70-FRM-010 | Loại tờ khai | Radio: Đăng ký mới / Thay đổi thông tin | User chọn |
| UI-REG-ND70-FRM-020 | Thông tin người nộp | Tên DN, MST, Địa chỉ, Email liên hệ, SĐT | Pre-fill SYS-FR-01 |
| UI-REG-ND70-FRM-030 | Hình thức HĐ | Có mã / Không mã; phương thức chuyển dữ liệu | User chọn |
| UI-REG-ND70-FRM-040 | Danh sách mẫu HĐ đăng ký | Grid chọn từ REG-FR-01 (ký hiệu, loại, mẫu số) | Lookup mẫu đã lưu |
| UI-REG-ND70-FRM-050 | Chứng thư số | Chọn CTS đã đăng ký SYS-FR-05 | Dropdown |
| UI-REG-ND70-FRM-060 | Cam kết / điều khoản | Checkbox xác nhận | Required |

#### 6.5.2 Footer actions

| UI ID | Nút | Hành vi |
|-------|-----|---------|
| UI-REG-ND70-FRM-070 | Quay lại | Navigate list; confirm nếu dirty |
| UI-REG-ND70-FRM-071 | Hủy | Discard → list |
| UI-REG-ND70-FRM-072 | Lưu nháp | Persist trạng thái Chưa gửi |
| UI-REG-ND70-FRM-073 | Ký | Ký số CTS; chưa gửi |
| UI-REG-ND70-FRM-074 | Ký & gửi CQT | Ký → transmit → cập nhật trạng thái |

#### 6.5.3 Validation

| Rule | Mô tả |
|------|-------|
| V-ND70-01 | Phải chọn ≥1 mẫu HĐ |
| V-ND70-02 | Email liên hệ đúng định dạng |
| V-ND70-03 | CTS phải còn hiệu lực (REG-AC-005) |
| V-ND70-04 | XML output tuân REG-NFR-01 |

---

## 7. Traceability UI → FR

| Screen | FR |
|--------|-----|
| SCR-REG-TPL-LIST, GALLERY, EDIT | REG-FR-01 |
| SCR-REG-ND70-LIST, FORM | REG-FR-03 |
