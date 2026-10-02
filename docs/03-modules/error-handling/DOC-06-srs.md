# DOC-06 — SRS — error-handling (ERR)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## Functional Requirements

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| ERR-FR-01 | Hệ thống SHALL lập, ký, gửi thông báo 04/SS-HĐĐT cho sai sót nhỏ | Must | ERR-UC-001 | ERR-BR-01 |
| ERR-FR-02 | Hệ thống SHALL thay thế HĐ sai lớn, liên kết HĐ nguồn, lập biên bản | Must | ERR-UC-002 | ERR-BR-02, 03, 04 |
| ERR-FR-03 | Hệ thống SHALL điều chỉnh HĐ (tăng/giảm/thông tin), liên kết HĐ gốc | Must | ERR-UC-003 | ERR-BR-04, 05 |
| ERR-FR-04 | Hệ thống SHOULD thay thế HĐ phát hành từ hệ thống khác | Should | ERR-UC-004 | — |
| ERR-FR-05 | Hệ thống SHOULD điều chỉnh HĐ từ hệ thống khác | Should | ERR-UC-005 | — |
| ERR-FR-06 | Hệ thống SHOULD xử lý thay thế/điều chỉnh nhiều HĐ | Should | ERR-UC-006 | — |
| ERR-FR-08 | Hệ thống SHALL lập bảng kê HĐ kèm theo | Must | ERR-UC-008 | — |
| ERR-FR-09 | Hệ thống SHALL lập bảng kê điều chỉnh/thay thế | Must | ERR-UC-009 | — |
| ERR-FR-10 | Hệ thống SHALL lập bảng kê HĐ chiết khấu | Must | ERR-UC-010 | — |
| ERR-FR-11 | Hệ thống SHALL lập, ký, upload biên bản ĐC/TT | Must | ERR-UC-007 | ERR-BR-06 |
