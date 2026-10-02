# DOC-06 — SRS — system (SYS)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.2 | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · [Shell](../../04-platform/DOC-19-prototype-shell.md) · **Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module quản trị tenant: thông tin DN, user, quyền, chứng thư số, tham số nghiệp vụ.

**MVP v1.0:** 5 FR (SYS-FR-01, 03, 04, 05, 06). Phụ thuộc bắt buộc cho REG, INV.

---

## 2. Functional Requirements (MVP v1.0)

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| SYS-FR-01 | Hệ thống SHALL quản lý thông tin doanh nghiệp (MST, tên, địa chỉ, logo bên bán) | Must | SYS-UC-001 | — |
| SYS-FR-03 | Hệ thống SHALL quản lý nhóm quyền RBAC theo chức năng | Must | SYS-UC-003 | SYS-BR-01 |
| SYS-FR-04 | Hệ thống SHALL CRUD người sử dụng và gán nhóm quyền | Must | SYS-UC-004 | SYS-BR-01 |
| SYS-FR-05 | Hệ thống SHALL đăng ký chứng thư số (USB Token / HSM) để ký HĐ và tờ khai | Must | SYS-UC-005 | SYS-BR-02 |
| SYS-FR-06 | Hệ thống SHALL cấu hình tham số nghiệp vụ (hình thức sinh số HĐ, quy tắc khác) | Must | SYS-UC-006 | SYS-BR-03 |

---

## 3. Acceptance Criteria

| AC ID | FR | Given / When / Then |
|-------|-----|---------------------|
| SYS-AC-001 | SYS-FR-01 | **Given** admin tenant · **When** lưu thông tin DN · **Then** MST, tên, địa chỉ, logo được persist; hiển thị trên HĐ mới (AC-MVP-01) |
| SYS-AC-002 | SYS-FR-03 | **Given** admin · **When** tạo nhóm quyền gán menu/chức năng · **Then** user thuộc nhóm chỉ truy cập được quyền đã gán (SYS-BR-01) |
| SYS-AC-003 | SYS-FR-04 | **Given** admin · **When** tạo user và gán nhóm quyền · **Then** user đăng nhập và thấy đúng menu theo quyền |
| SYS-AC-004 | SYS-FR-05 | **Given** admin · **When** đăng ký CTS hợp lệ · **Then** CTS sẵn sàng cho thao tác ký REG/INV (AC-MVP-01) |
| SYS-AC-005 | SYS-FR-05 | **Given** chưa đăng ký CTS · **When** user thử ký gửi CQT · **Then** báo lỗi yêu cầu đăng ký CTS trước |
| SYS-AC-006 | SYS-FR-06 | **Given** admin · **When** chọn hình thức sinh số (lập / ký) · **Then** quy tắc xóa HĐ chờ ký trên INV tuân theo cấu hình (SYS-BR-03, INV-BR-02/03) |

---

## 4. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| SYS-NFR-01 | RBAC enforced trên mọi API/module nghiệp vụ |
| SYS-NFR-02 | Thông tin DN và CTS scoped theo tenant |

---

## 5. Out of MVP v1.0

| FR ID | Ghi chú |
|-------|---------|
| SYS-FR-02 | Bản quyền / license — Phase 2 (SYS-BR-04) |
| SYS-FR-07 | Email server SMTP — Phase 2 |
| SYS-FR-08 | Giá trị thay thế / mặc định — Phase 2 |
| SYS-FR-09 | Theme giao diện — Phase 2 |
