# DOC-06 — SRS — auth (AUTH)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.2 | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · **Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module xác thực và cổng truy cập công khai của nền tảng HĐĐT.

**MVP v1.0:** 4 FR (AUTH-FR-01 … 04). Route: `#/login`, `#/register`, `#/forgot-password`.

---

## 2. Functional Requirements (MVP v1.0)

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| AUTH-FR-01 | Hệ thống SHALL cho phép đăng nhập bằng MST + tên đăng nhập + mật khẩu; hỗ trợ ghi nhớ đăng nhập | Must | AUTH-UC-001 | AUTH-BR-01, 03 |
| AUTH-FR-02 | Hệ thống SHALL cung cấp luồng đăng ký tài khoản từ màn login | Must | AUTH-UC-002 | — |
| AUTH-FR-03 | Hệ thống SHALL cho phép lấy lại mật khẩu qua MST + email; hỗ trợ bước USB Token | Must | AUTH-UC-003 | AUTH-BR-02, 04 |
| AUTH-FR-04 | Hệ thống SHALL cho phép chọn ngôn ngữ giao diện (tiếng Việt) | Must | AUTH-UC-004 | — |

---

## 3. Acceptance Criteria

| AC ID | FR | Given / When / Then |
|-------|-----|---------------------|
| AUTH-AC-001 | AUTH-FR-01 | **Given** user có tài khoản hợp lệ · **When** nhập đủ MST, tên đăng nhập, mật khẩu và bấm Đăng nhập · **Then** vào được ứng dụng; session được tạo |
| AUTH-AC-002 | AUTH-FR-01 | **Given** thiếu ít nhất một trường bắt buộc · **When** màn login · **Then** nút Đăng nhập disabled (AUTH-BR-01) |
| AUTH-AC-003 | AUTH-FR-01 | **Given** thông tin sai · **When** đăng nhập · **Then** hiển thị lỗi; không tạo session |
| AUTH-AC-004 | AUTH-FR-02 | **Given** màn login · **When** chọn Đăng ký · **Then** mở luồng đăng ký tài khoản mới |
| AUTH-AC-005 | AUTH-FR-03 | **Given** MST + email đã đăng ký · **When** yêu cầu quên mật khẩu · **Then** gửi hướng dẫn đặt lại MK (hoặc bước USB Token nếu cấu hình) |
| AUTH-AC-006 | AUTH-FR-03 | **Given** thiếu MST hoặc email không hợp lệ · **When** quên MK · **Then** không cho submit (AUTH-BR-02) |
| AUTH-AC-007 | AUTH-FR-04 | **Given** màn công khai · **When** chọn ngôn ngữ VI · **Then** nhãn giao diện hiển thị tiếng Việt |

---

## 4. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| AUTH-NFR-01 | Truyền thông HTTPS; không lưu mật khẩu plain text |
| AUTH-NFR-02 | Session timeout theo cấu hình tenant |

---

## 5. Out of MVP v1.0

| FR ID | Ghi chú |
|-------|---------|
| AUTH-FR-05 | Popup marketing — Phase 2 |
| AUTH-FR-06 | Widget chat — Phase 2 (SUP) |
