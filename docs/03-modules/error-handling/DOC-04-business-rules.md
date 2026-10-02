# DOC-04 — Business Rules — error-handling (ERR)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

**Nguồn:** NĐ 70/2025/NĐ-CP

---

## Business Rules Catalog

| ID | Tên | Mô tả | Loại | Priority |
|----|-----|-------|------|----------|
| ERR-BR-01 | Sai sót nhỏ | Sai tên/địa chỉ NM (đúng MST) → 04/SS, không lập HĐ mới | Compliance | Must |
| ERR-BR-02 | Sai sót lớn | Sai MST, thuế, tiền, HH → thay thế hoặc điều chỉnh + biên bản | Compliance | Must |
| ERR-BR-03 | Không đổi loại xử lý | Chuỗi đã thay thế không chuyển sang điều chỉnh và ngược lại | Validation | Must |
| ERR-BR-04 | Liên kết HĐ | Điều chỉnh → HĐ gốc; Thay thế → HĐ gần nhất trong chuỗi | Process | Must |
| ERR-BR-05 | Hủy giao dịch | Từ 01/06/2025: điều chỉnh giảm về 0 thay cho hủy HĐ | Compliance | Must |
| ERR-BR-06 | Biên bản bắt buộc | Thay thế/điều chỉnh theo NĐ 70 phải có biên bản 2 bên | Compliance | Must |
