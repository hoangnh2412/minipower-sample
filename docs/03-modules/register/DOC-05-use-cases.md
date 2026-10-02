# DOC-05 — Use Cases — register (REG)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-REG-01 | Kế toán / Quản trị DN | Primary |
| ACT-SYS-03 | Cơ quan Thuế | External |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| REG-UC-001 | Quản lý mẫu hóa đơn | Must | REG-FR-01 |
| REG-UC-002 | Lập tờ khai đăng ký/thay đổi NĐ123 | Must | REG-FR-02 |
| REG-UC-003 | Lập tờ khai đăng ký/thay đổi NĐ70 | Must | REG-FR-03 |

---

## 3. Use Case Specifications

### REG-UC-001 — Quản lý mẫu hóa đơn

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-REG-01 |
| **Menu** | Đăng ký phát hành → Mẫu hóa đơn |
| **Mô tả** | Khai báo và quản lý mẫu số, ký hiệu hóa đơn theo quy định |
| **Tiền điều kiện** | DN đã đăng nhập; có quyền quản trị |
| **Hậu điều kiện** | Mẫu HĐ lưu trong hệ thống, sẵn sàng cho phát hành |

**Luồng chính:**
1. Vào **Đăng ký phát hành** → **Mẫu hóa đơn**
2. Xem danh sách mẫu đã khai báo
3. Thêm/sửa mẫu: mẫu số, ký hiệu, loại HĐ (có mã/không mã)
4. Lưu → hệ thống validate theo REG-BR-01

**Business Rules:** REG-BR-01

---

### REG-UC-002 — Lập tờ khai đăng ký/thay đổi NĐ123

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-REG-01, ACT-SYS-03 |
| **Menu** | Tờ khai đăng ký/thay đổi NĐ123/2020 |
| **Mô tả** | Lập, ký số và gửi tờ khai đăng ký sử dụng HĐĐT theo NĐ 123 |

**Luồng chính:**
1. Chọn **Tờ khai NĐ123/2020**
2. Chọn loại: đăng ký mới / thay đổi thông tin
3. Điền thông tin DN, mẫu HĐ, chứng thư số, hình thức gửi dữ liệu
4. Ký số tờ khai
5. Gửi CQT → nhận kết quả (Thành công / Có lỗi)

**Luồng thay thế:**
- **5a.** Lỗi CQT → xem chi tiết, sửa và gửi lại

**Business Rules:** REG-BR-02

---

### REG-UC-003 — Lập tờ khai đăng ký/thay đổi NĐ70

| Mục | Nội dung |
|-----|----------|
| **Actor** | ACT-REG-01, ACT-SYS-03 |
| **Menu** | Tờ khai đăng ký/thay đổi NĐ70/2025-NĐ254/2026 |
| **Mô tả** | Lập tờ khai theo quy định mới NĐ 70/2025 |

**Luồng chính:** Tương tự REG-UC-002, áp dụng mẫu và trường theo NĐ 70

**Business Rules:** REG-BR-03
