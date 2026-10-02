# DOC-06 — SRS — auth (AUTH)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)

---

## 1. Phạm vi

Module xác thực và cổng truy cập công khai của nền tảng HĐĐT.

## 2. Functional Requirements

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| AUTH-FR-01 | Hệ thống SHALL cho phép đăng nhập bằng MST + tên đăng nhập + mật khẩu; hỗ trợ ghi nhớ đăng nhập | Must | AUTH-UC-001 | AUTH-BR-01, 03 |
| AUTH-FR-02 | Hệ thống SHALL cung cấp luồng đăng ký tài khoản từ màn login | Must | AUTH-UC-002 | — |
| AUTH-FR-03 | Hệ thống SHALL cho phép lấy lại mật khẩu qua MST + email; hỗ trợ bước USB Token | Must | AUTH-UC-003 | AUTH-BR-02, 04 |
| AUTH-FR-04 | Hệ thống SHALL cho phép chọn ngôn ngữ giao diện | Should | AUTH-UC-004 | — |
| AUTH-FR-05 | Hệ thống MAY hiển thị popup khuyến mãi/lead generation | Could | AUTH-UC-005 | — |
| AUTH-FR-06 | Hệ thống SHALL tích hợp widget chat hỗ trợ trên màn hình công khai | Must | AUTH-UC-006 | — |

## 3. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| AUTH-NFR-01 | Truyền thông HTTPS; không lưu mật khẩu plain text |
| AUTH-NFR-02 | Session timeout theo cấu hình tenant |
