# DOC-05 — Use Cases — auth (AUTH)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

**BRD:** [DOC-03-brd.md](../../01-project/DOC-03-brd.md) · **Route:** `#/login`, `#/register`, `#/forgot-password`

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-AUTH-01 | Người dùng DN | Primary |
| ACT-AUTH-02 | Khách hàng tiềm năng | Primary |
| ACT-SYS-01 | Hệ thống HĐĐT | System |
| ACT-SYS-02 | Widget chat hỗ trợ | External |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| AUTH-UC-001 | Đăng nhập hệ thống | Must | AUTH-FR-01 |
| AUTH-UC-002 | Đăng ký tài khoản | Must | AUTH-FR-02 |
| AUTH-UC-003 | Quên mật khẩu | Must | AUTH-FR-03 |
| AUTH-UC-004 | Đổi ngôn ngữ | Should | AUTH-FR-04 |
| AUTH-UC-005 | Đăng ký nhận ưu đãi | Could | AUTH-FR-05 |
| AUTH-UC-006 | Chat hỗ trợ | Must | AUTH-FR-06 |

---

## 3. Use Case Specifications

### AUTH-UC-001 — Đăng nhập hệ thống

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-AUTH-01 |
| **Mô tả** | Người dùng đăng nhập vào portal HĐĐT bằng MST, tên đăng nhập và mật khẩu |
| **Tiền điều kiện** | DN đã có tài khoản hệ thống; truy cập `#/login` |
| **Hậu điều kiện** | Session hợp lệ; chuyển dashboard/module theo quyền |

**Luồng chính:**
1. NSD truy cập portal HĐĐT
2. Hệ thống hiển thị form: MST, Tên đăng nhập, Mật khẩu, Ghi nhớ đăng nhập
3. NSD nhập đủ 3 trường bắt buộc
4. NSD bấm **Đăng nhập**
5. Hệ thống xác thực → chuyển màn hình chính

**Luồng thay thế:**
- **4a.** Thiếu trường → nút Đăng nhập disabled (AUTH-BR-01)
- **5a.** Sai thông tin → thông báo lỗi, giữ form
- **3a.** Chọn Ghi nhớ → lưu session (AUTH-BR-03)

**Business Rules:** AUTH-BR-01, AUTH-BR-03

---

### AUTH-UC-002 — Đăng ký tài khoản

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-AUTH-02 |
| **Mô tả** | Khách hàng mới đăng ký sử dụng hệ thống HĐĐT |
| **Tiền điều kiện** | Chưa có tài khoản |
| **Hậu điều kiện** | Yêu cầu đăng ký được ghi nhận / tài khoản được tạo |

**Luồng chính:**
1. Tại màn login, NSD bấm **Đăng ký**
2. Hệ thống chuyển form đăng ký (hoặc trang đăng ký ngoài)
3. NSD điền thông tin DN và liên hệ
4. Hệ thống xác nhận tiếp nhận

---

### AUTH-UC-003 — Quên mật khẩu

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-AUTH-01 |
| **Route** | `#/forgot-password` |
| **Tiền điều kiện** | Có tài khoản; quên mật khẩu |
| **Hậu điều kiện** | Email reset được gửi hoặc hướng dẫn USB Token |

**Luồng chính:**
1. NSD bấm **Quên mật khẩu?**
2. Nhập MST và Email
3. Bấm **Lấy lại mật khẩu**
4. Hệ thống gửi email hướng dẫn đặt lại MK

**Luồng thay thế:**
- **4a.** Tenant yêu cầu USB Token → hiển thị "Vui lòng kiểm tra USB Token" (AUTH-BR-04)

**Business Rules:** AUTH-BR-02, AUTH-BR-04

---

### AUTH-UC-004 — Đổi ngôn ngữ

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-AUTH-01 |
| **Luồng chính** | Bấm **Ngôn ngữ** → chọn VI (hoặc EN khi có) → UI cập nhật |

---

### AUTH-UC-005 — Đăng ký nhận ưu đãi

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-AUTH-02 |
| **Luồng chính** | Popup marketing (nếu bật) → **Đăng ký nhận ưu đãi** → ghi nhận lead |

---

### AUTH-UC-006 — Chat hỗ trợ

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-AUTH-01, ACT-SYS-02 |
| **Luồng chính** | Bấm **Hỗ trợ** → mở widget chat → kết nối bộ phận kỹ thuật |
