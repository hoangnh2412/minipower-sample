# MVP v1.0 — Ngoài phạm vi (Out of Scope)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Phạm vi tham chiếu:** Slice MVP đã chốt — AUTH, CAT, REG, INV (+ SYS tối thiểu).  
> **Nguồn:** [DOC-03-brd.md](DOC-03-brd.md) · Workshop chốt tính năng (03/10/2026).

---

## 1. Tóm tắt phạm vi MVP (đối chiếu)

Luồng lõi **trong phạm vi**:

```text
Đăng nhập → Danh mục → Đăng ký phát hành → Lập HĐ → Ký → Gửi Thuế → Tải XML
```

| Module | Trong MVP |
|--------|-----------|
| AUTH | Đăng nhập, đăng ký, quên MK, đa ngôn ngữ VI |
| CAT | KH, HH/DV, UOM, tiền tệ, hình thức thanh toán |
| REG | Mẫu HĐ, tờ khai NĐ70/2025 |
| INV | Lập → ký → gửi CQT, lấy lại mã, tải XML, … |
| SYS | DN, user, quyền, CTS, tham số (phụ thuộc bắt buộc) |

---

## 2. Module loại toàn bộ khỏi MVP

| # | Module ID | Tên module | Lý do loại | Phase đề xuất |
|---|-----------|------------|------------|---------------|
| OOS-M01 | ERR | Xử lý sai sót | Không nằm luồng phát hành lõi MVP | v1.1+ |
| OOS-M02 | TXN | Lịch sử truyền nhận CQT | Chưa chọn; log chi tiết có thể tối thiểu trong INV | v1.1+ |
| OOS-M03 | RPT | Báo cáo | Chưa chọn | v1.1+ |
| OOS-M04 | SUP | Hỗ trợ & tiện ích | Chưa chọn | v1.1+ |

### Chi tiết chức năng theo module (tham chiếu BRD)

#### OOS-M01 — ERR (Xử lý sai sót)

| FR | Tính năng | Ưu tiên BRD |
|----|-----------|-------------|
| ERR-FR-01 | Thông báo 04/SS-HĐĐT | Must |
| ERR-FR-02 | Thay thế HĐ | Must |
| ERR-FR-03 | Điều chỉnh HĐ | Must |
| ERR-FR-04 | Thay thế HĐ hệ thống khác | Should |
| ERR-FR-05 | Điều chỉnh HĐ hệ thống khác | Should |
| ERR-FR-06 | Thay thế/điều chỉnh nhiều HĐ | Should |
| ERR-FR-07 | Hủy HĐ | Won't (deprecated từ 01/06/2025) |
| ERR-FR-08 | Bảng kê | Must |
| ERR-FR-09 | Bảng kê ĐC/TT | Must |
| ERR-FR-10 | Bảng kê chiết khấu | Must |
| ERR-FR-11 | Biên bản ĐC/TT | Must |

#### OOS-M02 — TXN (Lịch sử truyền nhận)

| FR | Tính năng | Ưu tiên BRD |
|----|-----------|-------------|
| TXN-FR-01 | LS tờ khai đăng ký | Must |
| TXN-FR-02 | LS hóa đơn | Must |
| TXN-FR-03 | LS 04/SS | Must |
| TXN-FR-04 | LS bảng tổng hợp | Must |
| TXN-FR-05 | LS thanh toán QRCode | Should |

#### OOS-M03 — RPT (Báo cáo)

| FR | Tính năng | Ưu tiên BRD |
|----|-----------|-------------|
| RPT-FR-01 | Báo cáo THSD hóa đơn | Must |
| RPT-FR-02 | Báo cáo tổng hợp HĐ | Must |
| RPT-FR-03 | Báo cáo chi tiết HĐ | Must |
| RPT-FR-04 | Báo cáo nhận vào PMKT | Should |
| RPT-FR-05 | Báo cáo PL101/2023/QH15 | Should |
| RPT-FR-06 | Báo cáo bảng kê bán ra (PL01) | Must |
| RPT-FR-07 | Kiểm tra trạng thái MST | Must |
| RPT-FR-09 | Bảng tổng hợp 01/TH-HĐĐT | Must |
| RPT-FR-10 | Xuất đa định dạng (Excel, PDF) | Must |

#### OOS-M04 — SUP (Hỗ trợ)

| FR | Tính năng | Ưu tiên BRD |
|----|-----------|-------------|
| SUP-FR-01 | Hướng dẫn / HDSD | Must |
| SUP-FR-02 | Tải xuống plugin ký số | Must |
| SUP-FR-03 | Thông báo hệ thống | Must |
| SUP-FR-04 | Chat hỗ trợ 24/7 | Must |

---

## 3. FR loại theo quyết định MVP (trong module đã chọn)

| # | ID | Module | Tính năng | Lý do loại | Người chốt |
|---|-----|--------|-----------|------------|------------|
| OOS-F01 | REG-FR-02 | REG | Tờ khai đăng ký/thay đổi NĐ123/2020 | Không cần trong MVP | A |
| OOS-F02 | CAT-FR-07 | CAT | Danh mục ngân hàng | Không cần trong MVP | A |

---

## 4. FR hoãn — module trong MVP, triển khai Phase 2

### 4.1 AUTH

| # | ID | Tính năng | Ưu tiên BRD | Ghi chú |
|---|-----|-----------|-------------|---------|
| OOS-F03 | AUTH-FR-05 | Popup marketing / lead | Could | |
| OOS-F04 | AUTH-FR-06 | Widget chat hỗ trợ | Must | Thuộc SUP; hoãn cùng module hỗ trợ |

### 4.2 CAT

| # | ID | Tính năng | Ưu tiên BRD | Ghi chú |
|---|-----|-----------|-------------|---------|
| OOS-F05 | CAT-FR-05 | Mẫu email | Must | Cần nếu bật gửi email HĐ (INV-FR-12) |
| OOS-F06 | CAT-FR-08 | Địa điểm kinh doanh | Should | |
| OOS-F07 | CAT-FR-11 | Thiết bị tích hợp (POS, MTT) | Must | Liên quan HĐ MTT |

### 4.3 INV

| # | ID | Tính năng | Ưu tiên BRD | Ghi chú |
|---|-----|-----------|-------------|---------|
| OOS-F08 | INV-FR-12 | Gửi email HĐ PDF | Must | Chưa chọn trong MVP |
| OOS-F09 | INV-FR-13 | Ký hàng loạt | Should | |
| OOS-F10 | INV-FR-15 | Import HĐ từ Excel | Should | |
| OOS-F11 | INV-FR-17 | Hóa đơn chiết khấu | Must | |
| OOS-F12 | INV-FR-19 | Chuyển ký hiệu | Should | |

> **Lưu ý:** INV-FR-16 (Tải XML sau ký) **trong phạm vi MVP** — không nằm bảng này.

### 4.4 SYS

| # | ID | Tính năng | Ưu tiên BRD | Ghi chú |
|---|-----|-----------|-------------|---------|
| OOS-F13 | SYS-FR-02 | Bản quyền / license | Must | |
| OOS-F14 | SYS-FR-07 | Email server (SMTP) | Must | Phụ thuộc INV-FR-12 |
| OOS-F15 | SYS-FR-08 | Giá trị thay thế / mặc định | Should | |
| OOS-F16 | SYS-FR-09 | Theme giao diện | Could | |

---

## 5. Out of scope sản phẩm nền (BRD §4.2)

| # | Hạng mục | Mô tả | Ghi chú |
|---|----------|-------|---------|
| OOS-P01 | Tích hợp PSS/GDS, REVERA, CRA | Extension dự án khách hàng lớn | |
| OOS-P02 | PM kế toán đầy đủ, kê khai BHXH | Module/extension riêng | |
| OOS-P03 | Giải pháp thanh toán, thông báo số dư | Sản phẩm tích hợp riêng | |
| OOS-P04 | Module ngành xăng dầu | Trạm, vòi bơm, báo cáo mẫu thuế xăng dầu | |
| OOS-P05 | Thay thế ERP/kế toán khách hàng | Không mục tiêu sản phẩm | |
| OOS-P06 | Hóa đơn MTT (máy tính tiền) | Chưa thấy trên UI tham chiếu; Q-03 mở | |
| OOS-P07 | Hóa đơn đầu vào | Chưa thấy trên UI tham chiếu; Q-04 mở | |
| OOS-P08 | API public cho đối tác / ERP | Q-02 mở — tài liệu API riêng | |

---

## 6. Câu hỏi mở liên quan phạm vi

| ID | Chủ đề | Ảnh hưởng | Trạng thái |
|----|--------|-----------|------------|
| Q-01 | Phân biệt gói license theo số HĐ/tháng | SYS-FR-02 | Mở |
| Q-02 | API public cho đối tác | OOS-P08 | Mở |
| Q-03 | HĐ MTT trên cùng portal | OOS-P06, CAT-FR-11 | Mở |
| Q-04 | Hóa đơn đầu vào | OOS-P07 | Mở |
| Q-05 | Demo `#/register` vs production login | AUTH | Mở |

→ Chi tiết: [DOC-03-brd.md §10](DOC-03-brd.md#10-câu-hỏi-mở)

---

## 7. Ma trận tóm tắt

| Nhóm | Số hạng mục | Ghi chú |
|------|-------------|---------|
| Module loại toàn bộ | 4 | ERR, TXN, RPT, SUP |
| FR loại theo quyết định MVP | 2 | NĐ123, ngân hàng |
| FR hoãn Phase 2 | 14 | AUTH, CAT, INV, SYS |
| Out of scope sản phẩm nền | 8 | BRD §4.2 + câu hỏi mở |
| **Tổng** | **28+** | Không tính FR trong module loại toàn bộ |

---

## 8. Traceability

| Artifact | Liên kết |
|----------|----------|
| BRD đầy đủ | [DOC-03-brd.md](DOC-03-brd.md) |
| Vision / tiêu chí MVP S-01 | [DOC-01-vision-business-case.md](DOC-01-vision-business-case.md) |
| Module SRS | `docs/03-modules/{module-id}/DOC-06-srs.md` |
| Trace matrix | [trace-matrix.md](../05-traceability/trace-matrix.md) |

---

## Approval

| Vai trò | Tên | Ngày | Sign-off |
|---------|-----|------|----------|
| Product Owner / Sponsor | *TBD* | — | ☐ |
| REQ owner | *TBD* | — | ☐ |
