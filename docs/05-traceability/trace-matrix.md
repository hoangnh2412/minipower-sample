# Trace Matrix

Single source of truth — cập nhật khi thêm/sửa requirement hoặc approve CR.

| Cập nhật | 2026-10-03 (SRS v0.2) |
|----------|------------|
| **Baseline slice** | MVP v1.0 |
| **Phạm vi MVP** | [mvp-v1.0-in-scope.md](../01-project/mvp-v1.0-in-scope.md) (31 FR) |
| **Ngoài phạm vi** | [mvp-v1.0-out-of-scope.md](../01-project/mvp-v1.0-out-of-scope.md) |

**Verification:** Mọi FR **In MVP** có ≥1 AC và ≥1 TC trước UAT.

---

## 1. Tóm tắt theo module

| Module | Req ID (BRD) | UC | FR / BR | In MVP | Out MVP | AC | Test | DOC path | Status |
|--------|--------------|-----|---------|--------|---------|-----|------|----------|--------|
| auth | AUTH-FR-01 … 06 | 6 | 6 FR / 2 BR | **4** | 2 | AUTH-AC-001…007 | TBD | `03-modules/auth/` | Draft |
| catalog | CAT-FR-01 … 13 | 12 | 13 FR / 3 BR | **5** | 8 | CAT-AC-001…006 | TBD | `03-modules/catalog/` | Draft |
| register | REG-FR-01 … 03 | 3 | 3 FR / 3 BR | **2** | 1 | REG-AC-001…005 | TBD | `03-modules/register/` | Draft |
| invoice | INV-FR-01 … 20 | 15 | 20 FR / 4 BR | **15** | 5 | INV-AC-001…014 | TBD | `03-modules/invoice/` | Draft |
| system | SYS-FR-01 … 09 | 9 | 9 FR / 4 BR | **5** | 4 | SYS-AC-001…006 | TBD | `03-modules/system/` | Draft |
| error-handling | ERR-FR-01 … 11 | 10 | 10 FR / 5 BR | 0 | 11 | — | — | `03-modules/error-handling/` | Out MVP |
| transmission | TXN-FR-01 … 05 | 5 | 5 FR / 2 BR | 0 | 5 | — | — | `03-modules/transmission/` | Out MVP |
| report | RPT-FR-01 … 10 | 10 | 10 FR / 2 BR | 0 | 10 | — | — | `03-modules/report/` | Out MVP |
| support | SUP-FR-01 … 04 | 4 | 4 FR / 1 BR | 0 | 4 | — | — | `03-modules/support/` | Out MVP |
| platform | NFR-01 … 08 | — | 8 NFR | **6** | 2 | AC-MVP-* | TBD | `01-project/DOC-03-brd.md` §6 | Draft |

**Tổng FR In MVP:** 31 · **Tổng FR Out MVP (phase 2+):** ~49+

---

## 2. Ma trận chi tiết — FR trong MVP v1.0

Cột **MVP:** `In` = baseline v1.0 · `P2` = hoãn phase 2 (cùng module)

### 2.1 AUTH

| Req ID | UC | BR | AC (MVP) | Test | MVP | Status |
|--------|-----|-----|----------|------|-----|--------|
| AUTH-FR-01 | AUTH-UC-001 | AUTH-BR-01, 03 | AUTH-AC-001…003 | TBD | In | Draft |
| AUTH-FR-02 | AUTH-UC-002 | — | AUTH-AC-004 | TBD | In | Draft |
| AUTH-FR-03 | AUTH-UC-003 | AUTH-BR-02, 04 | AUTH-AC-005, 006 | TBD | In | Draft |
| AUTH-FR-04 | AUTH-UC-004 | — | AUTH-AC-007 | TBD | In | Draft |
| AUTH-FR-05 | AUTH-UC-005 | — | — | — | P2 | Deferred |
| AUTH-FR-06 | AUTH-UC-006 | — | — | — | P2 | Deferred |

### 2.2 CAT

| Req ID | UC | BR | AC (MVP) | Test | MVP | Status |
|--------|-----|-----|----------|------|-----|--------|
| CAT-FR-01 | CAT-UC-001 | CAT-BR-01 | CAT-AC-001, 002 | TBD | In | Draft |
| CAT-FR-02 | CAT-UC-002 | CAT-BR-02 | CAT-AC-003 | TBD | In | Draft |
| CAT-FR-03 | CAT-UC-003 | — | CAT-AC-004 | TBD | In | Draft |
| CAT-FR-04 | CAT-UC-004 | — | CAT-AC-005 | TBD | In | Draft |
| CAT-FR-06 | CAT-UC-006 | — | CAT-AC-006 | TBD | In | Draft |
| CAT-FR-05 | CAT-UC-005 | — | — | — | P2 | Deferred |
| CAT-FR-07 | CAT-UC-007 | — | — | — | Out | Loại MVP |
| CAT-FR-08 | CAT-UC-008 | — | — | — | P2 | Deferred |
| CAT-FR-11 | CAT-UC-010 | — | — | — | P2 | Deferred |

### 2.3 REG

| Req ID | UC | BR | AC (MVP) | Test | MVP | Status |
|--------|-----|-----|----------|------|-----|--------|
| REG-FR-01 | REG-UC-001 | REG-BR-01 | REG-AC-001, 002 | TBD | In | Draft |
| REG-FR-03 | REG-UC-003 | REG-BR-03 | REG-AC-003…005 | TBD | In | Draft |
| REG-FR-02 | REG-UC-002 | REG-BR-01 | — | — | Out | Loại MVP |

### 2.4 INV

| Req ID | UC | BR | AC (MVP) | Test | MVP | Status |
|--------|-----|-----|----------|------|-----|--------|
| INV-FR-01 | INV-UC-001 | INV-BR-06 | INV-AC-001 | TBD | In | Draft |
| INV-FR-02 | INV-UC-002 | — | INV-AC-002 | TBD | In | Draft |
| INV-FR-03 | INV-UC-002 | — | INV-AC-003 | TBD | In | Draft |
| INV-FR-04 | INV-UC-002 | INV-BR-04 | INV-AC-004 | TBD | In | Draft |
| INV-FR-05 | INV-UC-002 | — | INV-AC-002 | TBD | In | Draft |
| INV-FR-06 | INV-UC-002 | — | INV-AC-002 | TBD | In | Draft |
| INV-FR-07 | INV-UC-003 | INV-BR-01 | INV-AC-005, 006 | TBD | In | Draft |
| INV-FR-08 | INV-UC-004 | INV-BR-02, 03 | INV-AC-007 | TBD | In | Draft |
| INV-FR-09 | INV-UC-005 | — | INV-AC-008 | TBD | In | Draft |
| INV-FR-10 | INV-UC-006 | — | INV-AC-009 | TBD | In | Draft |
| INV-FR-11 | INV-UC-007 | INV-BR-06 | INV-AC-010, 011 | TBD | In | Draft |
| INV-FR-14 | INV-UC-010 | — | INV-AC-012 | TBD | In | Draft |
| INV-FR-16 | INV-UC-012 | — | INV-AC-013 | TBD | In | Draft |
| INV-FR-18 | INV-UC-014 | — | INV-AC-014 | TBD | In | Draft |
| INV-FR-20 | INV-UC-001 | — | INV-AC-001 | TBD | In | Draft |
| INV-FR-12 | INV-UC-008 | — | — | — | P2 | Deferred |
| INV-FR-13 | INV-UC-009 | — | — | — | P2 | Deferred |
| INV-FR-15 | INV-UC-011 | — | — | — | P2 | Deferred |
| INV-FR-17 | INV-UC-013 | INV-BR-03 | — | — | P2 | Deferred |
| INV-FR-19 | INV-UC-015 | — | — | — | P2 | Deferred |

### 2.5 SYS

| Req ID | UC | BR | AC (MVP) | Test | MVP | Status |
|--------|-----|-----|----------|------|-----|--------|
| SYS-FR-01 | SYS-UC-001 | — | SYS-AC-001 | TBD | In | Draft |
| SYS-FR-03 | SYS-UC-003 | SYS-BR-01 | SYS-AC-002 | TBD | In | Draft |
| SYS-FR-04 | SYS-UC-004 | SYS-BR-01 | SYS-AC-003 | TBD | In | Draft |
| SYS-FR-05 | SYS-UC-005 | SYS-BR-02 | SYS-AC-004, 005 | TBD | In | Draft |
| SYS-FR-06 | SYS-UC-006 | SYS-BR-03 | SYS-AC-006 | TBD | In | Draft |
| SYS-FR-02 | SYS-UC-002 | — | — | — | P2 | Deferred |
| SYS-FR-07 | SYS-UC-007 | — | — | — | P2 | Deferred |
| SYS-FR-08 | SYS-UC-008 | — | — | — | P2 | Deferred |
| SYS-FR-09 | SYS-UC-009 | — | — | — | P2 | Deferred |

---

## 3. Ma trận AC nghiệm thu MVP

| AC ID | Kịch bản | FR liên quan | UC chính | Test | Status |
|-------|----------|--------------|----------|------|--------|
| AC-MVP-01 | Admin cấu hình DN + đăng ký CTS | SYS-FR-01, SYS-FR-05, INV-FR-03 | SYS-UC-001, SYS-UC-005 | TBD | Draft |
| AC-MVP-02 | Khai báo mẫu HĐ + gửi tờ khai NĐ70 | REG-FR-01, REG-FR-03 | REG-UC-001, REG-UC-003 | TBD | Draft |
| AC-MVP-03 | Lập HĐ từ danh mục KH/HH/DV | CAT-FR-01, CAT-FR-02, INV-FR-02…06 | INV-UC-002 | TBD | Draft |
| AC-MVP-04 | Ký gửi CQT một HĐ | INV-FR-11, SYS-FR-05 | INV-UC-007 | TBD | Draft |
| AC-MVP-05 | Tải XML HĐ đã ký | INV-FR-16 | INV-UC-012 | TBD | Draft |
| AC-MVP-06 | Truyền lỗi / lấy lại mã CQT | INV-FR-14 | INV-UC-010 | TBD | Draft |
| AC-MVP-07 | HĐ đã ký không sửa trực tiếp | INV-FR-07, INV-BR-01 | INV-UC-003 | TBD | Draft |

→ Định nghĩa đầy đủ: [mvp-v1.0-in-scope.md §6](../01-project/mvp-v1.0-in-scope.md#6-tiêu-chí-nghiệm-thu-mvp-acceptance)

---

## 4. NFR — MVP v1.0

| Req ID | Yêu cầu | MVP | AC / Test | Status |
|--------|---------|-----|-----------|--------|
| NFR-01 | Tuân thủ NĐ 70, TT 78/88/32; mẫu HĐ TCT | In | AC-MVP-02, 04, 05 | Draft |
| NFR-02 | HTTPS, chữ ký số, RBAC | In | AC-MVP-01, 04 | Draft |
| NFR-03 | Lưu trữ HĐ ≥ 10 năm | In | TBD | Draft |
| NFR-04 | Hiệu năng volume HĐ (SLA) | In | TBD | Draft |
| NFR-05 | SaaS 24/7; hỗ trợ 24/7 | Out | — (SUP) | Out MVP |
| NFR-06 | Tích hợp T-VAN/CQT | In | AC-MVP-02, 04, 06 | Draft |
| NFR-07 | Web responsive; F4/F8 | In | TBD | Draft |
| NFR-08 | Đa ngôn ngữ (VI) | In | AUTH-FR-04 | Draft |

---

## 5. Module ngoài MVP v1.0 (tham chiếu)

| Module | FR range | Phase | DOC |
|--------|----------|-------|-----|
| error-handling | ERR-FR-01 … 11 | v1.1+ | `03-modules/error-handling/` |
| transmission | TXN-FR-01 … 05 | v1.1+ | `03-modules/transmission/` |
| report | RPT-FR-01 … 10 | v1.1+ | `03-modules/report/` |
| support | SUP-FR-01 … 04 | v1.1+ | `03-modules/support/` |

Chi tiết FR loại / hoãn → [mvp-v1.0-out-of-scope.md](../01-project/mvp-v1.0-out-of-scope.md)

---

## 6. Luồng trace end-to-end (MVP S-01)

```text
AUTH-FR-01 → SYS-FR-01,05 → REG-FR-01,03 → CAT-FR-01,02 → INV-FR-02…11 → INV-FR-16
     ↓              ↓              ↓              ↓                ↓              ↓
AC-MVP-*      AC-MVP-01      AC-MVP-02      AC-MVP-03      AC-MVP-04,07    AC-MVP-05
```

**Tiêu chí dự án:** [DOC-01 S-01](../01-project/DOC-01-vision-business-case.md#10-tiêu-chí-thành-công-dự-án) — MVP phát hành HĐ end-to-end.

---

## 7. Nguồn trace chi tiết

| Loại | Vị trí |
|------|--------|
| FR ↔ UC (module) | `03-modules/{module-id}/README.md` |
| Use cases | `03-modules/{module-id}/DOC-05-use-cases.md` |
| Business rules | `03-modules/{module-id}/DOC-04-business-rules.md` |
| SRS | `03-modules/{module-id}/DOC-06-srs.md` |
| BRD đầy đủ | [DOC-03-brd.md](../01-project/DOC-03-brd.md) §5 |
| DOC registry | [doc-registry.md](doc-registry.md) |

---

## 8. Cột trạng thái

| Status | Ý nghĩa |
|--------|---------|
| Draft | FR/AC chưa có TC; SRS chưa rút gọn theo MVP |
| In | Trong baseline MVP v1.0 |
| P2 | Hoãn phase 2 (module vẫn in roadmap) |
| Out | Loại khỏi MVP (xem out-of-scope) |
| Out MVP | Toàn module ngoài slice v1.0 |
