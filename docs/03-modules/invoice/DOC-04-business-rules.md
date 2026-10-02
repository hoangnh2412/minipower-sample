# DOC-04 — Business Rules — invoice (INV)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## Business Rules Catalog

| ID | Tên | Mô tả | Loại | Priority |
|----|-----|-------|------|----------|
| INV-BR-01 | Không sửa HĐ đã ký | HĐ đã ký gửi CQT không chỉnh sửa trực tiếp — dùng thay thế/điều chỉnh | Validation | Must |
| INV-BR-02 | Sinh số khi lập | Hình thức sinh số ngay khi lập: xóa HĐ chờ ký phải tuần tự từ số lớn → nhỏ | Process | Must |
| INV-BR-03 | Sinh số khi ký | Hình thức sinh số khi ký: xóa HĐ chờ ký tự do, chưa có số/ngày HĐ | Process | Must |
| INV-BR-04 | Tra MST CQT | Nhập MST người mua → tra cứu tên, địa chỉ từ dữ liệu CQT | Integration | Must |
| INV-BR-05 | HĐ chiết khấu âm | Hóa đơn chiết khấu có tổng tiền thanh toán âm | Calculation | Must |
| INV-BR-06 | Trạng thái CQT | Chờ ký → Thành công (có mã) / Có lỗi (xem chi tiết) | State | Must |
