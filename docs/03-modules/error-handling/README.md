# ERR — Xử lý sai sót

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.3 | 2026-10-02 | BA | Draft |

> **BRD:** [DOC-03-brd.md](../../01-project/DOC-03-brd.md) §5.4  
> **ERD platform:** [DOC-10-erd-einvoice-platform.md](../../04-platform/DOC-10-erd-einvoice-platform.md)

**MOD prefix:** `ERR` · **Menu:** Xử lý sai sót

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
| ERR-FR-01 | Thông báo 04/SS-HĐĐT | ERR-UC-001 | [Use case](DOC-05-use-cases.md#err-uc-001--lập-thông-báo-04ss-hđđt) |
| ERR-FR-02 | Thay thế HĐ | ERR-UC-002 | [Use case](DOC-05-use-cases.md#err-uc-002--thay-thế-hóa-đơn) |
| ERR-FR-03 | Điều chỉnh HĐ | ERR-UC-003 | [Use case](DOC-05-use-cases.md#err-uc-003--điều-chỉnh-hóa-đơn) |
| ERR-FR-04 | Thay thế HĐ hệ thống khác | ERR-UC-004 | [Use case](DOC-05-use-cases.md#err-uc-004--thay-thế-hđ-hệ-thống-khác) |
| ERR-FR-05 | Điều chỉnh HĐ hệ thống khác | ERR-UC-005 | [Use case](DOC-05-use-cases.md#err-uc-005--điều-chỉnh-hđ-hệ-thống-khác) |
| ERR-FR-06 | Thay thế/ĐC nhiều HĐ | ERR-UC-006 | [Use case](DOC-05-use-cases.md#err-uc-006--xử-lý-sai-sót-hàng-loạt) |
| ERR-FR-07 | Hủy HĐ (deprecated) | — | Không triển khai — thay bằng ERR-UC-007 |
| ERR-FR-08 | Bảng kê | ERR-UC-008 | [Use case](DOC-05-use-cases.md#err-uc-008--lập-bảng-kê-hóa-đơn) |
| ERR-FR-09 | Bảng kê ĐC/TT | ERR-UC-009 | [Use case](DOC-05-use-cases.md#err-uc-009--lập-bảng-kê-điều-chỉnhthay-thế) |
| ERR-FR-10 | Bảng kê chiết khấu | ERR-UC-010 | [Use case](DOC-05-use-cases.md#err-uc-010--lập-bảng-kê-chiết-khấu) |
| ERR-FR-11 | Biên bản ĐC/TT | ERR-UC-007 | [Use case](DOC-05-use-cases.md#err-uc-007--lập-biên-bản-điều-chỉnhthay-thế) |
