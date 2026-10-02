# AUTH — Xác thực & truy cập

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.3 | 2026-10-02 | BA | Draft |

> **BRD:** [DOC-03-brd.md](../../01-project/DOC-03-brd.md) §5.1  
> **ERD platform:** [DOC-10-erd-einvoice-platform.md](../../04-platform/DOC-10-erd-einvoice-platform.md)

**MOD prefix:** `AUTH` · **Route:** `#/login`, `#/register`, `#/forgot-password`

## Tài liệu

| File | DOC |
|------|-----|
| [DOC-04-business-rules.md](DOC-04-business-rules.md) | 04 |
| [DOC-05-use-cases.md](DOC-05-use-cases.md) | 05 |
| [DOC-06-srs.md](DOC-06-srs.md) | 06 |
| [DOC-19-prototype.md](DOC-19-prototype.md) | 19 |
| [DOC-10-erd.md](DOC-10-erd.md) | 10 |

## Functional requirements

| FR ID | Chức năng | UC | Tài liệu |
|-------|-----------|-----|----------|
| AUTH-FR-01 | Đăng nhập | AUTH-UC-001 | [Use case](DOC-05-use-cases.md#auth-uc-001--đăng-nhập-hệ-thống) |
| AUTH-FR-02 | Đăng ký tài khoản | AUTH-UC-002 | [Use case](DOC-05-use-cases.md#auth-uc-002--đăng-ký-tài-khoản) |
| AUTH-FR-03 | Quên mật khẩu | AUTH-UC-003 | [Use case](DOC-05-use-cases.md#auth-uc-003--quên-mật-khẩu) |
| AUTH-FR-04 | Đa ngôn ngữ | AUTH-UC-004 | [Use case](DOC-05-use-cases.md#auth-uc-004--đổi-ngôn-ngữ) |
| AUTH-FR-05 | Khuyến mãi / lead | AUTH-UC-005 | [Use case](DOC-05-use-cases.md#auth-uc-005--đăng-ký-nhận-ưu-đãi) |
| AUTH-FR-06 | Hỗ trợ chat | AUTH-UC-006 | [Use case](DOC-05-use-cases.md#auth-uc-006--chat-hỗ-trợ) |
