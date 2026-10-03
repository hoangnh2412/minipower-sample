# DOC-06 — SRS — catalog (CAT)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · **UI governance:** [DOC-20-ui-design-principles.md](../../00-governance/DOC-20-ui-design-principles.md)  
**Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module danh mục master data phục vụ lập hóa đơn: khách hàng, hàng hóa/dịch vụ, UOM, tiền tệ, hình thức thanh toán.

**MVP v1.0:** 5 FR (CAT-FR-01, 02, 03, 04, 06).

---

## 2. Functional Requirements (MVP v1.0)

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| CAT-FR-01 | Hệ thống SHALL CRUD danh mục khách hàng (người mua); gợi ý theo MST đã lưu | Must | CAT-UC-001 | CAT-BR-01 |
| CAT-FR-02 | Hệ thống SHALL CRUD hàng hóa/dịch vụ kèm thuế suất theo kỳ hiệu lực | Must | CAT-UC-002 | CAT-BR-02 |
| CAT-FR-03 | Hệ thống SHALL CRUD đơn vị tính (UOM) | Must | CAT-UC-003 | — |
| CAT-FR-04 | Hệ thống SHALL CRUD tiền tệ (VND, ngoại tệ) và tỷ giá | Must | CAT-UC-004 | — |
| CAT-FR-06 | Hệ thống SHALL CRUD hình thức thanh toán (TM, CK, TM/CK, …) | Must | CAT-UC-006 | — |

---

## 3. Acceptance Criteria

| AC ID | FR | Given / When / Then |
|-------|-----|---------------------|
| CAT-AC-001 | CAT-FR-01 | **Given** user có quyền · **When** tạo/sửa/xóa KH qua dialog · **Then** persist; dùng được trên form lập HĐ |
| CAT-AC-002 | CAT-FR-01 | **Given** MST đã dùng · **When** nhập MST · **Then** gợi ý tên/địa chỉ (CAT-BR-01) |
| CAT-AC-003 | CAT-FR-02 | **Given** HH/DV có thuế suất · **When** chọn trên dòng HĐ · **Then** %VAT đúng kỳ (CAT-BR-02) |
| CAT-AC-004 | CAT-FR-03 | **Given** UOM đã khai báo · **When** lập dòng HHDV · **Then** chọn được UOM |
| CAT-AC-005 | CAT-FR-04 | **Given** tiền tệ + tỷ giá · **When** lập HĐ ngoại tệ · **Then** quy đổi đúng |
| CAT-AC-006 | CAT-FR-06 | **Given** HTTT đã khai báo · **When** lập HĐ · **Then** chọn được HTTT |

---

## 4. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| CAT-NFR-01 | Danh mục scoped theo tenant |
| CAT-NFR-02 | CRUD có phân quyền theo SYS RBAC |

---

## 5. Out of MVP v1.0

| FR ID | Ghi chú |
|-------|---------|
| CAT-FR-05 | Mẫu email — Phase 2 |
| CAT-FR-07 | Ngân hàng — **loại MVP** |
| CAT-FR-08 … 13 | Xăng dầu, thiết bị — out scope |

---

## 6. Đặc tả màn hình & điều khiển

> Quy ước ID: `UI-CAT-{SCR}-{NNN}` · Pattern L + D: [DOC-20](../../00-governance/DOC-20-ui-design-principles.md)  
> Các trang danh mục **dùng chung toolbar + bảng + dialog** — chỉ khác cột và form.

### 6.0 Thành phần dùng chung (CAT-CRUD-COMMON)

#### Toolbar chuẩn

| UI ID | Nút | Shortcut | Vị trí | Hành vi |
|-------|-----|----------|--------|---------|
| UI-CAT-COM-001 | Tải dữ liệu | — | Primary | Reload list |
| UI-CAT-COM-002 | Tạo mới | F4 | Primary | Mở dialog trống |
| UI-CAT-COM-003 | Chỉnh sửa | F3 | Primary | Mở dialog với dòng chọn | 
| UI-CAT-COM-004 | Xóa | F8 | Primary | Confirm → xóa |
| UI-CAT-COM-005 | Chức năng ▾ | — | Dropdown | Xem §6.0.1 |

| Enabled | UI-CAT-COM-003/004 |
|---------|---------------------|
| 0 dòng | disabled |
| 1 dòng | enabled |
| >1 dòng | Xóa OK; Sửa disabled |

#### 6.0.1 Menu **Chức năng ▾** (danh mục)

| UI ID | Item | MVP | Hành vi |
|-------|------|-----|---------|
| UI-CAT-COM-010 | Sao chép | ✓ | Dialog pre-fill bản sao |
| UI-CAT-COM-011 | Nhập dữ liệu từ Excel | ✓ | Upload template → validate → import |
| UI-CAT-COM-012 | Kết xuất Excel | ✓ | Export theo filter hiện tại |
| UI-CAT-COM-013 | Tạo User tra cứu | ❌ P2 | — |
| UI-CAT-COM-014 | Thay đổi thuế suất hàng loạt | ✓ HH/DV only | Wizard đổi %VAT theo kỳ |

#### Paginator chuẩn

Giống [UI-REG-TPL-LIST-020..022](../register/DOC-06-srs.md#613-paginator) — page size default **50**.

---

### 6.1 SCR-CAT-CUS — Quản lý khách hàng

| Mục | Giá trị |
|-----|---------|
| **Route** | `/danh-muc/khach-hang` |
| **FR** | CAT-FR-01 |
| **Tham chiếu** | [M-Invoice KH](https://hddt.minvoice.com.vn/#/danh-muc/khach-hang) |

#### 6.1.1 Toolbar

Kế thừa **UI-CAT-COM-001..005** (không có nút module-specific trên toolbar).

#### 6.1.2 Bảng

| UI ID | Cột | Filter | Sort | MVP |
|-------|-----|--------|------|-----|
| UI-CAT-CUS-010 | # | — | — | ✓ checkbox |
| UI-CAT-CUS-011 | Mã khách hàng | Text | ✓ | ✓ |
| UI-CAT-CUS-012 | Tên đơn vị | Text | ✓ | ✓ |
| UI-CAT-CUS-013 | Mã số thuế | Text | ✓ | ✓ |
| UI-CAT-CUS-014 | Người mua hàng | Text | ✓ | ✓ |
| UI-CAT-CUS-015 | CCCD | Text | ✓ | ✓ |
| UI-CAT-CUS-016 | Mã ĐVQHNS | Text | ✓ | Optional |
| UI-CAT-CUS-017 | Địa chỉ | Text | ✓ | ✓ |
| UI-CAT-CUS-018 | Email | Text | ✓ | ✓ |
| UI-CAT-CUS-019 | Số điện thoại | Text | ✓ | ✓ |
| UI-CAT-CUS-020 | Số tài khoản | Text | ✓ | ✓ |
| UI-CAT-CUS-021 | Ngân hàng | Text | ✓ | ❌ out MVP (CAT-FR-07) |

#### 6.1.3 Dialog Tạo/Sửa khách hàng

| UI ID | Field | Loại | Validation |
|-------|-------|------|------------|
| UI-CAT-CUS-030 | Mã số thuết | Text + 🔍 | 10–14 số; trigger gợi ý CAT-BR-01 |
| UI-CAT-CUS-031 | Tên đơn vị | Text | Required |
| UI-CAT-CUS-032 | Tên người mua | Text | |
| UI-CAT-CUS-033 | Địa chỉ | Text | |
| UI-CAT-CUS-034 | Email | Email | |
| UI-CAT-CUS-035 | Số điện thoại | Text | |
| UI-CAT-CUS-036 | Số tài khoản | Text | Optional |
| UI-CAT-CUS-040 | Hủy | Button | Đóng dialog |
| UI-CAT-CUS-041 | Lưu | Button primary | Validate → API |

---

### 6.2 SCR-CAT-PRD — Quản lý hàng hóa, dịch vụ

| Mục | Giá trị |
|-----|---------|
| **Route** | `/danh-muc/hang-hoa-dich-vu` |
| **FR** | CAT-FR-02 |
| **Tham chiếu** | [M-Invoice HH/DV](https://hddt.minvoice.com.vn/#/danh-muc/hang-hoa-dich-vu) |

#### 6.2.1 Toolbar

Kế thừa **UI-CAT-COM-001..005** + item **UI-CAT-COM-014** (thuế suất hàng loạt) trong **Chức năng ▾**.

#### 6.2.2 Bảng

| UI ID | Cột | Filter | Ghi chú |
|-------|-----|--------|---------|
| UI-CAT-PRD-010 | # | — | Checkbox |
| UI-CAT-PRD-011 | Mã hàng | Text | VD: `DV001` |
| UI-CAT-PRD-012 | Tên hàng hóa/dịch vụ | Text | |
| UI-CAT-PRD-013 | Thuế suất | Dropdown | KCT, 0%, 5%, 8%, 10%, KKKNT, … |
| UI-CAT-PRD-014 | Đơn giá | Number | Format số VN |
| UI-CAT-PRD-015 | Đơn vị tính | Text/Lookup | FK → CAT-FR-03 |

#### 6.2.3 Dialog Tạo/Sửa HH/DV

| UI ID | Field | Loại | BR |
|-------|-------|------|-----|
| UI-CAT-PRD-020 | Mã hàng | Text | Unique tenant |
| UI-CAT-PRD-021 | Tên | Text | Required |
| UI-CAT-PRD-022 | Đơn vị tính | Lookup | CAT-FR-03 |
| UI-CAT-PRD-023 | Đơn giá | Number | ≥ 0 |
| UI-CAT-PRD-024 | Thuế suất | Select + kỳ HL | CAT-BR-02 |
| UI-CAT-PRD-030 | Hủy / Lưu | Button | |

#### 6.2.4 Dialog **Thay đổi thuế suất hàng loạt**

| UI ID | Field | Hành vi |
|-------|-------|---------|
| UI-CAT-PRD-040 | Chọn HH (đã tick list) | Readonly count |
| UI-CAT-PRD-041 | Thuế suất mới | Select |
| UI-CAT-PRD-042 | Từ ngày | Date — kỳ hiệu lực |
| UI-CAT-PRD-043 | Áp dụng | POST batch update |

---

### 6.3 SCR-CAT-UOM — Quản lý đơn vị tính

| Mục | Giá trị |
|-----|---------|
| **Route** | `/danh-muc/don-vi-tinh` |
| **FR** | CAT-FR-03 |
| **Tham chiếu** | [M-Invoice UOM](https://hddt.minvoice.com.vn/#/danh-muc/don-vi-tinh) |

#### 6.3.1 Toolbar

Kế thừa **UI-CAT-COM-001..005** (không có UI-CAT-COM-014).

#### 6.3.2 Bảng

| UI ID | Cột | Filter |
|-------|-----|--------|
| UI-CAT-UOM-010 | # | — |
| UI-CAT-UOM-011 | Mã đơn vị tính | Text — VD: `CAI`, `KG` |
| UI-CAT-UOM-012 | Tên đơn vị tính | Text — VD: `Cái`, `Kg` |

#### 6.3.3 Dialog

| UI ID | Field | Validation |
|-------|-------|------------|
| UI-CAT-UOM-020 | Mã | Required; unique |
| UI-CAT-UOM-021 | Tên | Required |
| UI-CAT-UOM-030 | Hủy / Lưu | |

---

### 6.4 SCR-CAT-CUR — Quản lý tiền tệ

| Mục | Giá trị |
|-----|---------|
| **Route** | `/danh-muc/tien-te` |
| **FR** | CAT-FR-04 |
| **Tham chiếu** | [M-Invoice tiền tệ](https://hddt.minvoice.com.vn/#/danh-muc/tien-te) |

#### 6.4.1 Toolbar

Kế thừa **UI-CAT-COM-001..005**.

#### 6.4.2 Bảng

| UI ID | Cột | Filter | Ghi chú |
|-------|-----|--------|---------|
| UI-CAT-CUR-010 | # | — | Checkbox |
| UI-CAT-CUR-011 | Mã tiền tệ | Text | ISO: VND, USD, EUR, … |
| UI-CAT-CUR-012 | Tên tiền tệ | Text | Việt Nam đồng, … |
| UI-CAT-CUR-013 | Tỷ giá | Number | Quy đổi → VND |
| UI-CAT-CUR-014 | Số lẻ số lượng | Number | Decimal places |
| UI-CAT-CUR-015 | Số lẻ đơn giá | Number | |
| UI-CAT-CUR-016 | Số lẻ tổng tiền | Number | |
| UI-CAT-CUR-017 | Số lẻ tiền thuế | Number | |
| UI-CAT-CUR-018 | Tên đọc (số) | Text | "đồng", "xu", … |
| UI-CAT-CUR-019 | Tên đọc (lẻ) | Text | |

#### 6.4.3 Dialog

| UI ID | Field | Validation |
|-------|-------|------------|
| UI-CAT-CUR-020 | Mã tiền tệ | Required; 3 ký tự |
| UI-CAT-CUR-021 | Tên | Required |
| UI-CAT-CUR-022 | Tỷ giá | > 0; VND = 1 |
| UI-CAT-CUR-023..027 | Các field số lẻ | 0–6 |
| UI-CAT-CUR-030 | Hủy / Lưu | |

---

### 6.5 SCR-CAT-PAY — Hình thức thanh toán (MVP — cùng pattern)

| Mục | Giá trị |
|-----|---------|
| **Route** | `/danh-muc/hinh-thuc-thanh-toan` |
| **FR** | CAT-FR-06 |

| UI ID | Cột / Field | Ghi chú |
|-------|-------------|---------|
| UI-CAT-PAY-011 | Mã | TM, CK, TM/CK, … |
| UI-CAT-PAY-012 | Tên | Tiền mặt, Chuyển khoản, … |

Toolbar + dialog: kế thừa **UI-CAT-COM-***.

---

## 7. Traceability UI → FR

| Screen | FR |
|--------|-----|
| SCR-CAT-CUS | CAT-FR-01 |
| SCR-CAT-PRD | CAT-FR-02 |
| SCR-CAT-UOM | CAT-FR-03 |
| SCR-CAT-CUR | CAT-FR-04 |
| SCR-CAT-PAY | CAT-FR-06 |
