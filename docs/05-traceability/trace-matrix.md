# Trace Matrix

Single source of truth — cập nhật khi thêm/sửa requirement hoặc approve CR.

| Module | Req ID | UC | FR/BR | AC | Test | DOC path | CR | Status |
|--------|--------|----|----|-----|------|----------|-----|--------|
| auth | AUTH-FR-01 … AUTH-FR-06 | 6 UC | 6 FR / 2 BR | TBD | TBD | `03-modules/auth/DOC-06-srs.md` | | Draft |
| register | REG-FR-01 … REG-FR-03 | 3 UC | 3 FR / 3 BR | TBD | TBD | `03-modules/register/DOC-06-srs.md` | | Draft |
| invoice | INV-FR-01 … INV-FR-20 | 15 UC | 20 FR / 4 BR | TBD | TBD | `03-modules/invoice/DOC-06-srs.md` | | Draft |
| error-handling | ERR-FR-01 … ERR-FR-11 | 10 UC | 10 FR / 5 BR | TBD | TBD | `03-modules/error-handling/DOC-06-srs.md` | | Draft |
| transmission | TXN-FR-01 … TXN-FR-05 | 5 UC | 5 FR / 2 BR | TBD | TBD | `03-modules/transmission/DOC-06-srs.md` | | Draft |
| report | RPT-FR-01 … RPT-FR-10 | 10 UC | 10 FR / 2 BR | TBD | TBD | `03-modules/report/DOC-06-srs.md` | | Draft |
| catalog | CAT-FR-01 … CAT-FR-13 | 12 UC | 13 FR / 3 BR | TBD | TBD | `03-modules/catalog/DOC-06-srs.md` | | Draft |
| system | SYS-FR-01 … SYS-FR-09 | 9 UC | 9 FR / 4 BR | TBD | TBD | `03-modules/system/DOC-06-srs.md` | | Draft |
| support | SUP-FR-01 … SUP-FR-04 | 4 UC | 4 FR / 1 BR | TBD | TBD | `03-modules/support/DOC-06-srs.md` | | Draft |
| platform | NFR-01 … NFR-08 | | 8 NFR | TBD | TBD | `01-project/DOC-03-brd.md` §6 | | Draft |

**Chi tiết trace:** Ma trận FR ↔ UC trong README từng module (`03-modules/{module-id}/README.md`) và [DOC-03-brd.md](../01-project/DOC-03-brd.md) §5.

**Verification:** Mọi Must-have FR có ≥1 AC và ≥1 TC trước UAT.
