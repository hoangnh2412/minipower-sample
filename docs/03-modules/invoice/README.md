# INV — Hóa đơn đầu ra

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.3 | 2026-10-02 | BA | Draft |

> **BRD:** [DOC-03-brd.md](../../01-project/DOC-03-brd.md) §5.3  
> **ERD platform:** [DOC-10-erd-einvoice-platform.md](../../04-platform/DOC-10-erd-einvoice-platform.md)

**MOD prefix:** `INV` · **Route:** `#/hoa-don`

## Tài liệu

| File | DOC |
|------|-----|
| [DOC-04-business-rules.md](DOC-04-business-rules.md) | 04 |
| [DOC-05-use-cases.md](DOC-05-use-cases.md) | 05 |
| [DOC-06-srs.md](DOC-06-srs.md) | 06 |
| [DOC-10-erd.md](DOC-10-erd.md) | 10 |

## Functional requirements

| FR ID | Chức năng | UC | Tài liệu |
|-------|-----------|-----|----------|
| INV-FR-01 | Danh sách HĐ | INV-UC-001 | [Use case](DOC-05-use-cases.md#inv-uc-001--tra-cứu-danh-sách-hóa-đơn) |
| INV-FR-02 | Tạo mới (F4) | INV-UC-002 | [Use case](DOC-05-use-cases.md#inv-uc-002--lập-hóa-đơn-mới) |
| INV-FR-03 | Thông tin bên bán | INV-UC-002 | (cùng INV-UC-002) |
| INV-FR-04 | Thông tin người mua | INV-UC-002 | (cùng INV-UC-002) |
| INV-FR-05 | Chi tiết HHDV | INV-UC-002 | (cùng INV-UC-002) |
| INV-FR-06 | Lưu nháp | INV-UC-002 | (cùng INV-UC-002) |
| INV-FR-07 | Chỉnh sửa | INV-UC-003 | [Use case](DOC-05-use-cases.md#inv-uc-003--sửa-hóa-đơn-chờ-ký) |
| INV-FR-08 | Xóa (F8) | INV-UC-004 | [Use case](DOC-05-use-cases.md#inv-uc-004--xóa-hóa-đơn-chờ-ký) |
| INV-FR-09 | Sao chép | INV-UC-005 | [Use case](DOC-05-use-cases.md#inv-uc-005--sao-chép-hóa-đơn) |
| INV-FR-10 | Xem in | INV-UC-006 | [Use case](DOC-05-use-cases.md#inv-uc-006--xem-in-hóa-đơn) |
| INV-FR-11 | Ký gửi CQT | INV-UC-007 | [Use case](DOC-05-use-cases.md#inv-uc-007--ký-gửi-cơ-quan-thuế) |
| INV-FR-12 | Gửi email | INV-UC-008 | [Use case](DOC-05-use-cases.md#inv-uc-008--gửi-email-hóa-đơn) |
| INV-FR-13 | Ký hàng loạt | INV-UC-009 | [Use case](DOC-05-use-cases.md#inv-uc-009--ký-hóa-đơn-hàng-loạt) |
| INV-FR-14 | Lấy lại mã CQT | INV-UC-010 | [Use case](DOC-05-use-cases.md#inv-uc-010--lấy-lại-mã-cơ-quan-thuế) |
| INV-FR-15 | Nhận Excel | INV-UC-011 | [Use case](DOC-05-use-cases.md#inv-uc-011--import-hóa-đơn-từ-excel) |
| INV-FR-16 | Tải XML | INV-UC-012 | [Use case](DOC-05-use-cases.md#inv-uc-012--tải-xml-hóa-đơn) |
| INV-FR-17 | HĐ chiết khấu | INV-UC-013 | [Use case](DOC-05-use-cases.md#inv-uc-013--lập-hóa-đơn-chiết-khấu) |
| INV-FR-18 | Cập nhật TT từ CQT | INV-UC-014 | [Use case](DOC-05-use-cases.md#inv-uc-014--cập-nhật-trạng-thái-từ-cqt) |
| INV-FR-19 | Chuyển ký hiệu | INV-UC-015 | [Use case](DOC-05-use-cases.md#inv-uc-015--chuyển-ký-hiệu-hóa-đơn) |
| INV-FR-20 | Tổng tiền | INV-UC-001 | (cùng INV-UC-001) |
