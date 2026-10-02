# DOC-06 — SRS — catalog (CAT)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.2 | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · **Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module danh mục master data phục vụ lập hóa đơn: khách hàng, hàng hóa/dịch vụ, UOM, tiền tệ, hình thức thanh toán.

**MVP v1.0:** 5 FR (CAT-FR-01, 02, 03, 04, 06). Menu: Danh mục.

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
| CAT-AC-001 | CAT-FR-01 | **Given** user có quyền danh mục · **When** tạo/sửa/xóa khách hàng · **Then** bản ghi persist; hiển thị trên form lập HĐ |
| CAT-AC-002 | CAT-FR-01 | **Given** MST đã từng dùng trên HĐ · **When** nhập MST trên form KH · **Then** gợi ý tên, địa chỉ gần nhất (CAT-BR-01) |
| CAT-AC-003 | CAT-FR-02 | **Given** HH/DV có thuế suất · **When** chọn HH trên dòng HĐ · **Then** %VAT áp dụng đúng kỳ hiệu lực (CAT-BR-02) |
| CAT-AC-004 | CAT-FR-03 | **Given** UOM đã khai báo · **When** lập dòng HHDV · **Then** chọn được UOM từ danh mục |
| CAT-AC-005 | CAT-FR-04 | **Given** tiền tệ ngoại tệ + tỷ giá · **When** lập HĐ ngoại tệ · **Then** quy đổi và hiển thị tỷ giá đúng |
| CAT-AC-006 | CAT-FR-06 | **Given** HTTT đã khai báo · **When** lập HĐ · **Then** chọn được hình thức thanh toán từ danh mục |

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
| CAT-FR-08 | Địa điểm kinh doanh — Phase 2 |
| CAT-FR-09 … 13 | Xăng dầu, thiết bị — out of scope sản phẩm / Phase 2 |
