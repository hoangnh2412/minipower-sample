# DOC-05 — Use Cases — transmission (TXN)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-TXN-01 | Kế toán / Quản trị | Primary |
| ACT-SYS-03 | Cơ quan Thuế | External |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| TXN-UC-001 | Tra cứu lịch sử tờ khai | Must | TXN-FR-01 |
| TXN-UC-002 | Tra cứu lịch sử hóa đơn | Must | TXN-FR-02 |
| TXN-UC-003 | Tra cứu lịch sử 04/SS | Must | TXN-FR-03 |
| TXN-UC-004 | Tra cứu lịch sử bảng tổng hợp | Must | TXN-FR-04 |
| TXN-UC-005 | Tra cứu lịch sử thanh toán QRCode | Should | TXN-FR-05 |

---

## 3. Use Case Specifications

### TXN-UC-001 — Tra cứu lịch sử tờ khai

| Mục | Nội dung |
|-----|----------|
| **Menu** | Lịch sử truyền nhận → Tờ khai đăng ký |
| **Luồng chính** | Lọc theo kỳ/ngày → xem log: thời gian gửi, trạng thái, phản hồi CQT, chi tiết lỗi |

### TXN-UC-002 — Tra cứu lịch sử hóa đơn

| Mục | Nội dung |
|-----|----------|
| **Menu** | Lịch sử truyền nhận → Hóa đơn |
| **Luồng chính** | Tra theo số HĐ, ký hiệu, ngày → xem từng lần truyền, mã CQT, lỗi |

### TXN-UC-003 — Tra cứu lịch sử 04/SS

**Menu:** Lịch sử truyền nhận → Thông báo HĐ sai sót 04/SS-HĐĐT

### TXN-UC-004 — Tra cứu lịch sử bảng tổng hợp

**Menu:** Lịch sử truyền nhận → Bảng tổng hợp

### TXN-UC-005 — Tra cứu lịch sử thanh toán QRCode

**Menu:** Lịch sử truyền nhận → Lịch sử thanh toán QRCode
