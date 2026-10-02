# DOC-01 — Vision & Business Case

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn:** Distill từ [DOC-03-brd.md](DOC-03-brd.md) · Discovery UI tham chiếu & quy định HĐĐT (01–02/10/2026)

---

## 1. Tầm nhìn (Vision)

Xây dựng **nền tảng SaaS hóa đơn điện tử (HĐĐT)** cho doanh nghiệp, hộ kinh doanh và tổ chức tại Việt Nam — tuân thủ pháp luật, dễ triển khai, hỗ trợ volume cao và tích hợp thiết bị bán hàng.

**Tuyên bố tầm nhìn:** Mọi tổ chức có thể phát hành, quản lý và đối soát hóa đơn điện tử với Cơ quan Thuế (CQT) trên một nền tảng thống nhất, minh bạch và an toàn.

---

## 2. Vấn đề kinh doanh (Problem Statement)

| # | Vấn đề | Hệ quả |
|---|--------|--------|
| P-01 | Hóa đơn giấy / phần mềm rời rạc | Chi phí in ấn, lưu kho; khó tra cứu |
| P-02 | Quy định HĐĐT thay đổi (NĐ 123 → NĐ 70) | Rủi ro không tuân thủ; tờ khai, mẫu HĐ lỗi thời |
| P-03 | Thao tác lập HĐ chậm, nhiều bước thủ công | Kế toán/bán hàng mất thời gian; sai sót khi nhập |
| P-04 | Thiếu lịch sử truyền nhận với CQT | Khó đối soát khi CQT từ chối / treo mã |
| P-05 | Xử lý sai sót HĐ phức tạp | Nhầm lẫn thay thế / điều chỉnh / 04/SS |

---

## 3. Giải pháp đề xuất (Solution Overview)

Nền tảng HĐĐT tích hợp trọn vòng đời hóa đơn:

1. **Đăng ký phát hành** — mẫu HĐ, tờ khai NĐ123/NĐ70 với CQT
2. **Phát hành HĐ đầu ra** — lập, ký số, gửi CQT, email khách hàng
3. **Xử lý sai sót** — 04/SS, thay thế, điều chỉnh, bảng kê
4. **Truyền nhận & báo cáo** — log CQT, báo cáo kê khai, bảng tổng hợp
5. **Quản trị** — danh mục, user, quyền, chứng thư số, thiết bị POS

Chi tiết phạm vi → [DOC-03-brd.md §4](DOC-03-brd.md#4-phạm-vi-sản-phẩm).

---

## 4. Mục tiêu kinh doanh (Business Objectives)

| ID | Mục tiêu | Chỉ số thành công | Nguồn |
|----|----------|-------------------|-------|
| OBJ-01 | Tuân thủ pháp luật HĐĐT | 100% HĐ phát hành đúng mẫu, đúng quy trình CQT | DOC-03 §2 |
| OBJ-02 | Giảm chi phí vận hành | Giảm chi phí in ấn, vận chuyển, lưu kho so với HĐ giấy | DOC-03 §2 |
| OBJ-03 | Tăng hiệu suất xuất HĐ | Lập HĐ < 5 phút; ký gửi CQT hàng loạt; sao chép HĐ | DOC-03 §2 |
| OBJ-04 | Minh bạch với CQT | Truyền dữ liệu real-time; lịch sử truyền nhận đầy đủ | DOC-03 §2 |
| OBJ-05 | Hỗ trợ đa ngành | Bán lẻ, dịch vụ, DN volume cao | DOC-03 §2 |

---

## 5. Lợi ích dự kiến (Benefits)

| Đối tượng | Lợi ích |
|-----------|---------|
| Chủ DN / Hộ KD | Tuân thủ pháp luật; giảm chi phí vận hành HĐ |
| Kế toán / Thuế | Quy trình chuẩn; báo cáo, đối soát CQT tập trung |
| NV bán hàng | Xuất HĐ nhanh (F4/F8); ít lỗi nhập |
| Khách hàng cuối | Nhận HĐ PDF qua email; tra cứu online |
| Đơn vị vận hành SaaS | Nền tảng tái sử dụng; mở rộng theo tenant |

---

## 6. Phạm vi dự án (tóm tắt)

### 6.1 In scope

9 module nghiệp vụ nền tảng: AUTH, REG, INV, ERR, TXN, RPT, CAT, SYS, SUP — xem [DOC-03 §8 Module index](DOC-03-brd.md#8-module-index-traceability).

### 6.2 Out of scope

| Hạng mục | Ghi chú |
|----------|---------|
| Tích hợp PSS/GDS, REVERA, CRA | Extension dự án khách hàng lớn |
| PM kế toán đầy đủ, BHXH | Module riêng |
| Thanh toán, thông báo số dư | Sản phẩm tích hợp riêng |
| Module ngành xăng dầu | Out of scope sản phẩm nền |
| Thay thế ERP/kế toán khách hàng | Không mục tiêu |

---

## 7. Business Case (ước lượng)

| Mục | Nội dung |
|-----|----------|
| **Chi phí tránh** | In ấn, lưu kho HĐ giấy; xử lý sai sót thủ công; phạt không tuân thủ |
| **Lợi ích tăng** | Tốc độ phát hành; giảm sai sót; đối soát CQT nhanh |
| **Đầu tư** | Phát triển nền tảng SaaS; vận hành T-VAN/CQT; hỗ trợ 24/7 |
| **ROI** | *TBD — cần số liệu tenant pilot (số HĐ/tháng, headcount kế toán)* |

---

## 8. Ràng buộc & Giả định

### 8.1 Ràng buộc

| ID | Ràng buộc |
|----|-----------|
| C-01 | Tuân thủ NĐ 123/2020, NĐ 70/2025, TT 78, TT 88, TT 32 |
| C-02 | Tích hợp CQT qua T-VAN do đơn vị triển khai vận hành |
| C-03 | Ký số bắt buộc USB Token hoặc HSM hợp lệ |
| C-04 | Lưu trữ HĐ và lịch sử ≥ 10 năm |

### 8.2 Giả định

| ID | Giả định | Nguồn |
|----|----------|-------|
| A-01 | Khách hàng có chứng thư số hợp lệ | DOC-03 §9 |
| A-02 | DN đã đăng ký sử dụng HĐĐT với CQT | DOC-03 §9 |
| A-03 | Demo `#/register` phản ánh menu production | DOC-03 §9 |
| A-04 | T-VAN vận hành ổn định | DOC-03 §9 |

---

## 9. Rủi ro cấp dự án (tóm tắt)

| ID | Rủi ro | Mức | Giảm thiểu |
|----|--------|-----|------------|
| R-01 | Thay đổi quy định pháp luật HĐĐT | Cao | Theo dõi NĐ/TT; CR nhanh |
| R-02 | CQT/T-VAN downtime | Trung bình | Retry, lấy lại mã; log TXN |
| R-03 | Volume HĐ cao ảnh hưởng hiệu năng | Trung bình | NFR + load test |
| R-04 | Câu hỏi mở chưa chốt (license, MTT, HĐ đầu vào) | Trung bình | DOC-03 §10 → open-questions |

---

## 10. Tiêu chí thành công dự án

| # | Tiêu chí | Đo lường |
|---|----------|----------|
| S-01 | MVP phát hành HĐ end-to-end | Đăng ký → lập → ký → nhận mã CQT |
| S-02 | Must-have FR có AC + test | Trace matrix 100% Must FR |
| S-03 | UAT pass theo DOC-07 | Sign-off REQ owner |
| S-04 | Tuân thủ mẫu HĐ TCT | Review compliance |

---

## 11. Traceability

| Artifact | Liên kết |
|----------|----------|
| BRD | [DOC-03-brd.md](DOC-03-brd.md) |
| Stakeholder | [DOC-02-stakeholder-analysis.md](DOC-02-stakeholder-analysis.md) |
| Module SRS | `docs/03-modules/{module-id}/DOC-06-srs.md` |
| Trace matrix | [trace-matrix.md](../05-traceability/trace-matrix.md) |

---

## Approval

| Vai trò | Tên | Ngày | Sign-off |
|---------|-----|------|----------|
| Sponsor / Product Owner | *TBD* | — | ☐ |
| REQ owner | *TBD* | — | ☐ |
