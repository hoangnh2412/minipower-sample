# DOC-04 — Business Rules — auth (AUTH)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

**BRD:** [DOC-03-brd.md](../../01-project/DOC-03-brd.md) §5.1

---

## Business Rules Catalog

| ID | Tên | Mô tả | Loại | Priority |
|----|-----|-------|------|----------|
| AUTH-BR-01 | Validate đăng nhập | Nút Đăng nhập disabled khi thiếu MST, tên đăng nhập hoặc mật khẩu | Validation | Must |
| AUTH-BR-02 | Quên MK bắt buộc | Quên mật khẩu yêu cầu MST và email hợp lệ đã đăng ký | Validation | Must |
| AUTH-BR-03 | Ghi nhớ đăng nhập | Lưu session/token theo lựa chọn "Ghi nhớ đăng nhập" trên trình duyệt | Security | Should |
| AUTH-BR-04 | Xác thực USB Token | Bước quên MK có thể yêu cầu USB Token tùy cấu hình tenant | Security | Should |
