# Modules

Mỗi **module** (bounded context, epic domain, subsystem) = một folder con.

## Tạo module mới

```bash
cp -r _template/ {module-id}/
```

Điền `{module-id}` (lowercase, kebab-case) và **MOD prefix** (uppercase, 3–6 ký tự) trong README module.

## Cấu trúc chuẩn mỗi module

| File | DOC |
|------|-----|
| `DOC-04-business-rules.md` | 04 |
| `DOC-05-use-cases.md` | 05 |
| `DOC-06-srs.md` | 06 |
| `DOC-07-acceptance-criteria.md` | 07 |
| `DOC-16-test-strategy.md` | 16 |

Template: [`../../templates/`](../../templates/README.md)

## Module đã tạo

| Module ID | MOD prefix | Folder | Ghi chú |
|-----------|------------|--------|---------|
| auth | AUTH | [`auth/`](auth/README.md) | Xác thực & truy cập |
| register | REG | [`register/`](register/README.md) | Đăng ký phát hành |
| invoice | INV | [`invoice/`](invoice/README.md) | Hóa đơn đầu ra |
| error-handling | ERR | [`error-handling/`](error-handling/README.md) | Xử lý sai sót |
| transmission | TXN | [`transmission/`](transmission/README.md) | Lịch sử truyền nhận CQT |
| report | RPT | [`report/`](report/README.md) | Báo cáo |
| catalog | CAT | [`catalog/`](catalog/README.md) | Danh mục |
| system | SYS | [`system/`](system/README.md) | Hệ thống & quản trị |
| support | SUP | [`support/`](support/README.md) | Hỗ trợ & tiện ích |

**BRD:** [DOC-03-brd.md](../01-project/DOC-03-brd.md) · **ERD tổng:** [DOC-10-erd-einvoice-platform.md](../04-platform/DOC-10-erd-einvoice-platform.md)
