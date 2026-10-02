# DOC-05 — Use Cases — report (RPT)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-RPT-01 | Kế toán / Thuế | Primary |
| ACT-SYS-03 | Cơ quan Thuế (tra MST) | External |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| RPT-UC-001 | Báo cáo tình hình sử dụng hóa đơn | Must | RPT-FR-01 |
| RPT-UC-002 | Báo cáo tổng hợp hóa đơn | Must | RPT-FR-02 |
| RPT-UC-003 | Báo cáo chi tiết hóa đơn | Must | RPT-FR-03 |
| RPT-UC-004 | Báo cáo nhận vào PMKT | Should | RPT-FR-04 |
| RPT-UC-005 | Báo cáo PL101 | Should | RPT-FR-05 |
| RPT-UC-006 | Báo cáo bảng kê bán ra (PL01) | Must | RPT-FR-06 |
| RPT-UC-007 | Kiểm tra trạng thái MST | Must | RPT-FR-07 |
| RPT-UC-008 | Báo cáo xăng dầu mẫu thuế | Should | RPT-FR-08 |
| RPT-UC-009 | Lập bảng tổng hợp 01/TH-HĐĐT | Must | RPT-FR-09 |
| RPT-UC-010 | Xuất báo cáo đa định dạng | Must | RPT-FR-10 |

---

## 3. Use Case Specifications

### RPT-UC-001 — Báo cáo tình hình sử dụng hóa đơn

| Mục | Nội dung |
|-----|----------|
| **Menu** | Báo cáo → Báo cáo tình hình sử dụng hóa đơn |
| **Luồng chính** | Chọn kỳ (tháng/quý) → chạy báo cáo → xem số lượng HĐ đã dùng, còn lại theo bản quyền |

### RPT-UC-002 — Báo cáo tổng hợp hóa đơn

**Luồng chính:** Chọn kỳ, loại HĐ → tổng hợp doanh thu, thuế GTGT trước/sau điều chỉnh

### RPT-UC-003 — Báo cáo chi tiết hóa đơn

**Luồng chính:** Lọc theo ngày, ký hiệu, trạng thái → danh sách chi tiết từng HĐ

### RPT-UC-004 — Báo cáo nhận vào PMKT

**Mô tả:** Xuất dữ liệu HĐ đầu vào cho phần mềm kế toán (PMKT)

### RPT-UC-005 — Báo cáo PL101

**Menu:** Báo cáo PL101/2023/QH15 — theo mẫu quy định (RPT-BR-02)

### RPT-UC-006 — Báo cáo bảng kê bán ra (PL01)

**Menu:** Báo cáo bảng kê bán ra (PL01)

### RPT-UC-007 — Kiểm tra trạng thái MST

**Luồng chính:** Nhập MST → tra cứu trạng thái hoạt động từ CQT

### RPT-UC-008 — Báo cáo xăng dầu mẫu thuế

**Menu:** Báo cáo xăng dầu mẫu thuế — cho DN ngành xăng dầu

### RPT-UC-009 — Lập bảng tổng hợp 01/TH-HĐĐT

**Menu:** Lập bảng tổng hợp mẫu 01/TH-HĐĐT

**Luồng chính:**
1. Chọn kỳ tổng hợp
2. Hệ thống gom HĐ mới, thay thế, điều chỉnh
3. Kiểm tra đối chiếu trước truyền
4. Ký gửi CQT

### RPT-UC-010 — Xuất báo cáo đa định dạng

**Luồng chính:** Từ bất kỳ báo cáo → **Xuất** Excel/PDF theo quyền (RPT-BR-01)
