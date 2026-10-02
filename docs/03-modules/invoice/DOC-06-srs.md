# DOC-06 — SRS — invoice (INV)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## Functional Requirements

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| INV-FR-01 | Hệ thống SHALL hiển thị danh sách HĐ với lọc theo loại, trạng thái CQT, MST, ngày, số tiền | Must | INV-UC-001 | INV-BR-06 |
| INV-FR-02 | Hệ thống SHALL cho phép lập HĐ mới (F4) với ký hiệu, ngày, tiền tệ, tỷ giá, HTTT | Must | INV-UC-002 | — |
| INV-FR-03 | Hệ thống SHALL điền mặc định thông tin bên bán từ cấu hình DN | Must | INV-UC-002 | — |
| INV-FR-04 | Hệ thống SHALL tra cứu thông tin người mua theo MST từ CQT | Must | INV-UC-002 | INV-BR-04 |
| INV-FR-05 | Hệ thống SHALL cho phép thêm nhiều dòng HHDV với tính thuế tự động | Must | INV-UC-002 | — |
| INV-FR-06 | Hệ thống SHALL lưu HĐ trạng thái Chờ ký trước ký gửi | Must | INV-UC-002 | — |
| INV-FR-07 | Hệ thống SHALL cho sửa HĐ Chờ ký; SHALL NOT cho sửa HĐ đã ký thành công | Must | INV-UC-003 | INV-BR-01 |
| INV-FR-08 | Hệ thống SHALL cho xóa HĐ Chờ ký theo quy tắc sinh số (F8) | Must | INV-UC-004 | INV-BR-02, 03 |
| INV-FR-09 | Hệ thống SHALL sao chép HĐ tạo bản mới pre-fill | Must | INV-UC-005 | — |
| INV-FR-10 | Hệ thống SHALL xem trước và in PDF HĐ | Must | INV-UC-006 | — |
| INV-FR-11 | Hệ thống SHALL ký số và gửi XML HĐ lên CQT; cập nhật mã/trạng thái | Must | INV-UC-007 | INV-BR-06 |
| INV-FR-12 | Hệ thống SHALL gửi email PDF HĐ cho người mua | Must | INV-UC-008 | — |
| INV-FR-13 | Hệ thống SHOULD ký gửi CQT hàng loạt cho nhiều HĐ Chờ ký | Should | INV-UC-009 | — |
| INV-FR-14 | Hệ thống SHALL lấy lại mã CQT khi truyền lỗi/treo | Must | INV-UC-010 | — |
| INV-FR-15 | Hệ thống SHOULD import HĐ từ file Excel template | Should | INV-UC-011 | — |
| INV-FR-16 | Hệ thống SHOULD export XML HĐ | Should | INV-UC-012 | — |
| INV-FR-17 | Hệ thống SHALL hỗ trợ HĐ chiết khấu (tổng âm) | Must | INV-UC-013 | INV-BR-05 |
| INV-FR-18 | Hệ thống SHALL đồng bộ trạng thái HĐ từ CQT theo yêu cầu | Must | INV-UC-014 | — |
| INV-FR-19 | Hệ thống SHOULD chuyển HĐ sang ký hiệu khác | Should | INV-UC-015 | — |
| INV-FR-20 | Hệ thống SHALL hiển thị tổng cộng số tiền danh sách HĐ | Must | INV-UC-001 | — |
