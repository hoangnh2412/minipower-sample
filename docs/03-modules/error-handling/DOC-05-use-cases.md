# DOC-05 — Use Cases — error-handling (ERR)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-ERR-01 | Kế toán | Primary |
| ACT-ERR-02 | Khách hàng (ký biên bản) | Secondary |
| ACT-SYS-03 | Cơ quan Thuế | External |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| ERR-UC-001 | Lập thông báo 04/SS-HĐĐT | Must | ERR-FR-01 |
| ERR-UC-002 | Thay thế hóa đơn | Must | ERR-FR-02 |
| ERR-UC-003 | Điều chỉnh hóa đơn | Must | ERR-FR-03 |
| ERR-UC-004 | Thay thế HĐ hệ thống khác | Should | ERR-FR-04 |
| ERR-UC-005 | Điều chỉnh HĐ hệ thống khác | Should | ERR-FR-05 |
| ERR-UC-006 | Xử lý sai sót hàng loạt | Should | ERR-FR-06 |
| ERR-UC-007 | Lập biên bản ĐC/TT | Must | ERR-FR-11 |
| ERR-UC-008 | Lập bảng kê hóa đơn | Must | ERR-FR-08 |
| ERR-UC-009 | Lập bảng kê ĐC/TT | Must | ERR-FR-09 |
| ERR-UC-010 | Lập bảng kê chiết khấu | Must | ERR-FR-10 |

---

## 3. Use Case Specifications

### ERR-UC-001 — Lập thông báo 04/SS-HĐĐT

| Mục | Nội dung |
|-----|----------|
| **Menu** | Xử lý sai sót → Thông báo HĐ sai sót 04/SS-HĐĐT |
| **Áp dụng** | Sai nhỏ: tên/địa chỉ NM, đúng MST (ERR-BR-01) |
| **Tiền điều kiện** | HĐ đã gửi CQT thành công hoặc có mã CQT |

**Luồng chính:**
1. Chọn HĐ gốc có sai sót nhỏ
2. Lập thông báo 04/SS: liệt kê HĐ sai, nội dung sai, hướng xử lý
3. Ký và gửi CQT
4. Thông báo cho người mua

---

### ERR-UC-002 — Thay thế hóa đơn

| Mục | Nội dung |
|-----|----------|
| **Áp dụng** | Sai lớn: MST, thuế suất, tiền, HH, mã vạch... (ERR-BR-02) |
| **Tiền điều kiện** | HĐ gốc trạng thái Gốc (Mới) hoặc bị điều chỉnh |

**Luồng chính:**
1. Chọn HĐ cần thay thế
2. Hệ thống liên kết HĐ gần nhất (ERR-BR-04)
3. Lập HĐ thay thế với nội dung đúng
4. Ký gửi CQT
5. Lập biên bản thay thế (ERR-UC-007)

**Luồng thay thế:**
- HĐ đã điều chỉnh → không cho thay thế (ERR-BR-03)

---

### ERR-UC-003 — Điều chỉnh hóa đơn

| Mục | Nội dung |
|-----|----------|
| **Menu** | Xử lý sai sót → Điều chỉnh hóa đơn |
| **Loại điều chỉnh** | Tăng/giảm đơn giá, SL, thuế suất, thành tiền; điều chỉnh thông tin không tiền |

**Luồng chính:**
1. Chọn HĐ gốc (ERR-BR-04)
2. Chọn loại điều chỉnh (tăng/giảm/thông tin)
3. Nhập phần chênh lệch (dấu +/- theo thực tế)
4. Ký gửi CQT
5. Lập biên bản điều chỉnh

**Luồng đặc biệt (ERR-BR-05):** Giao dịch hủy → điều chỉnh giảm toàn bộ về 0

---

### ERR-UC-004 — Thay thế HĐ hệ thống khác

**Mô tả:** Xử lý thay thế cho HĐ đã phát hành từ phần mềm HĐĐT khác, nhập thông tin HĐ nguồn thủ công.

---

### ERR-UC-005 — Điều chỉnh HĐ hệ thống khác

**Mô tả:** Tương tự ERR-UC-004 cho nghiệp vụ điều chỉnh.

---

### ERR-UC-006 — Xử lý sai sót hàng loạt

**Menu:** Thay thế nhiều hóa đơn / Điều chỉnh nhiều hóa đơn

**Luồng chính:** Chọn nhiều HĐ → xử lý batch → báo kết quả từng HĐ

---

### ERR-UC-007 — Lập biên bản ĐC/TT

| Mục | Nội dung |
|-----|----------|
| **Tiền điều kiện** | HĐ ở trạng thái thay thế hoặc điều chỉnh (ERR-BR-06) |

**Luồng chính:**
1. Chọn HĐ ĐC/TT vừa lập
2. Điền lý do, thông tin 2 bên
3. Ký biên bản (plugin ký số) hoặc Lưu
4. In/tải PDF gửi khách ký
5. Upload biên bản đã ký 2 bên

---

### ERR-UC-008 — Lập bảng kê hóa đơn

**Menu:** Xử lý sai sót → Bảng kê

**Luồng chính:** Tạo bảng kê kèm HĐ khi quy định yêu cầu

---

### ERR-UC-009 — Lập bảng kê ĐC/TT

**Menu:** Bảng kê điều chỉnh/thay thế

---

### ERR-UC-010 — Lập bảng kê chiết khấu

**Menu:** Bảng kê Hóa đơn chiết khấu
