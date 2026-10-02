# DOC-02 — Stakeholder Analysis

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn:** Distill từ [DOC-03-brd.md §3](DOC-03-brd.md#3-stakeholder) · Bổ sung RACI & luồng phê duyệt tài liệu

---

## 1. Mục đích

Xác định các bên liên quan, mức ảnh hưởng/quan tâm, trách nhiệm ra quyết định và luồng phê duyệt artifact dự án **einvoice-sample** (nền tảng HĐĐT).

---

## 2. Stakeholder Register

| ID | Vai trò | Loại | Mô tả | Nhu cầu chính | Ảnh hưởng | Quan tâm |
|----|---------|------|-------|---------------|-----------|----------|
| STK-01 | Chủ DN / Hộ KD | Primary | Quyết định triển khai, ký hợp đồng | Tuân thủ, chi phí, dễ dùng | Cao | Cao |
| STK-02 | Kế toán / Thuế | Primary | Lập HĐ, kê khai, đối soát CQT | Đúng quy định, báo cáo | Cao | Cao |
| STK-03 | NV bán hàng | Primary | Xuất HĐ tại quầy / POS | Thao tác nhanh, ít lỗi | Trung bình | Cao |
| STK-04 | Quản trị hệ thống | Primary | Cấu hình DN, user, quyền, CTS | RBAC, chứng thư số, email | Cao | Cao |
| STK-05 | CQT | External | Nhận dữ liệu HĐ, tờ khai | XML chuẩn, bảng tổng hợp | Cao | Trung bình |
| STK-06 | Khách hàng cuối | Secondary | Người mua — nhận HĐ | Email PDF, tra cứu | Thấp | Trung bình |
| STK-07 | Bộ phận hỗ trợ | Internal | Hỗ trợ 24/7 tenant | Chat, hotline, HDSD | Trung bình | Cao |
| STK-08 | Product Owner / Sponsor | Internal | Định hướng sản phẩm, ưu tiên | Roadmap, MVP, ROI | Cao | Cao |
| STK-09 | BA / REQ owner | Internal | Soạn & duy trì DOC, trace FR | Baseline, AC đầy đủ | Cao | Cao |
| STK-10 | Solution Architect | Internal | Kiến trúc, tích hợp, API | SAD, NFR, security | Cao | Trung bình |
| STK-11 | Dev / QA | Internal | Triển khai & kiểm thử | SRS rõ, AC testable | Trung bình | Cao |
| STK-12 | T-VAN / Đối tác CQT | External | Truyền nhận dữ liệu CQT | SLA, format XML | Cao | Trung bình |

---

## 3. Ma trận Ảnh hưởng — Quan tâm

```text
Quan tâm cao ↑
              │  Quản lý chặt          │  Thỏa mãn
              │  STK-01,02,04,08,09    │  STK-03,07,11
              │  STK-05,10,12          │
              ├────────────────────────┼──────────────────
              │  Theo dõi              │  Thông báo tối thiểu
              │  STK-10                │  STK-06
              └────────────────────────┴──────────────────→ Ảnh hưởng cao
```

---

## 4. RACI — Artifact & Quyết định

| Hoạt động | Sponsor (STK-08) | REQ owner (STK-09) | BA | SA (STK-10) | Dev | QA |
|-----------|------------------|---------------------|-----|-------------|-----|-----|
| DOC-01 Vision | A | R | R | C | I | I |
| DOC-02 Stakeholder | A | R | R | C | I | I |
| DOC-03 BRD | A | R | R | C | C | C |
| DOC-04–07 Module | I | A | R | C | C | C |
| DOC-08 SAD | I | C | C | R/A | C | I |
| DOC-13 NFR | I | C | C | R | C | C |
| Baseline sign-off | A | R | R | C | I | I |
| UAT / nghiệm thu | A | R | C | I | C | R |

**Ký hiệu:** R = Responsible · A = Accountable · C = Consulted · I = Informed

---

## 5. Yêu cầu theo Stakeholder → Module

| Stakeholder | Module / FR liên quan |
|-------------|----------------------|
| STK-01, STK-04 | SYS (license, DN), AUTH |
| STK-02 | INV, ERR, RPT, REG, TXN |
| STK-03 | INV (F4/F8), CAT (HH/DV, KH) |
| STK-04 | SYS (user, quyền, CTS, email) |
| STK-05 | REG, INV, ERR, TXN (truyền CQT) |
| STK-06 | INV (email PDF), SUP (tra cứu) |
| STK-07 | SUP (chat, HDSD, thông báo) |

Chi tiết FR → [DOC-03-brd.md §5](DOC-03-brd.md#5-yêu-cầu-chức-năng-theo-module).

---

## 6. Kế hoạch truyền thông (tóm tắt)

| Đối tượng | Nội dung | Tần suất | Kênh |
|-----------|----------|----------|------|
| Sponsor / PO | Tiến độ phase, blocker, baseline | Hàng tuần | Meeting / báo cáo |
| REQ owner + BA + SA | Review DOC, CR, open questions | Theo sprint / CR | `docs/`, trace matrix |
| Dev + QA | SRS, AC, API spec | Khi baseline module | Wiki / `docs/` |
| Tenant pilot (STK-01–04) | UAT, training | Trước go-live | HDSD, demo |

---

## 7. Luồng phê duyệt tài liệu

### 7.1 Trạng thái DOC

`Draft` → `Review` → `Baseline` (sau sign-off REQ owner / Sponsor)

### 7.2 Quy trình

1. BA soạn DOC → status **Draft**
2. Review nội bộ (BA + SA + Dev lead) → **Review**
3. REQ owner sign-off → đăng ký [doc-registry.md](../05-traceability/doc-registry.md)
4. Snapshot → `docs/02-baseline/vX.Y/` (READ ONLY)
5. Thay đổi sau baseline → `docs/06-changes/CR-xxx/`

### 7.3 Sign-off bắt buộc

| DOC | Người sign-off |
|-----|----------------|
| DOC-01, DOC-02, DOC-03 | Sponsor + REQ owner |
| DOC-04–07 (module) | REQ owner |
| DOC-08, DOC-13 | SA + REQ owner |

---

## 8. Câu hỏi mở ảnh hưởng stakeholder

| ID | Chủ đề | Stakeholder liên quan | Trạng thái |
|----|--------|----------------------|------------|
| Q-01 | Gói license theo số HĐ/tháng | STK-01, STK-08 | Mở |
| Q-02 | API public đối tác | STK-10, Dev | Mở |
| Q-03 | HĐ MTT trên cùng portal | STK-02, STK-03 | Mở |
| Q-04 | HĐ đầu vào | STK-02 | Mở |
| Q-05 | Demo vs production login | STK-03, STK-07 | Mở |

→ Chi tiết: [DOC-03-brd.md §10](DOC-03-brd.md#10-câu-hỏi-mở) · [`memory/open-questions.md`](../../memory/open-questions.md)

---

## 9. Traceability

| Artifact | Liên kết |
|----------|----------|
| Vision | [DOC-01-vision-business-case.md](DOC-01-vision-business-case.md) |
| BRD | [DOC-03-brd.md](DOC-03-brd.md) |
| Registry | [doc-registry.md](../05-traceability/doc-registry.md) |

---

## Approval

| Vai trò | Tên | Ngày | Sign-off |
|---------|-----|------|----------|
| Sponsor / Product Owner | *TBD* | — | ☐ |
| REQ owner | *TBD* | — | ☐ |
