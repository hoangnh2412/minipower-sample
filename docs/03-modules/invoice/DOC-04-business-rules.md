# DOC-04 — Business Rules — invoice (INV)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| — | 2026-10-03 | BA | Draft |

**SRS:** [DOC-06-srs.md](DOC-06-srs.md) · **Use cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md)  
**UI governance:** [DOC-20-ui-design-principles.md](../../00-governance/DOC-20-ui-design-principles.md)

---

## 1. Phạm vi

Quy tắc nghiệp vụ module **Hóa đơn đầu ra** — áp dụng khi lập, sửa, xóa, ký gửi và đồng bộ trạng thái với CQT. MVP v1.0 không bao gồm thay thế/điều chỉnh (module ERR).

---

## 2. Business Rules Catalog

| ID | Tên | Loại | Priority | FR / UC |
|----|-----|------|----------|---------|
| INV-BR-01 | Không sửa HĐ đã ký | Validation | Must | INV-FR-07 · INV-UC-003 |
| INV-BR-02 | Sinh số khi lập — xóa tuần tự | Process | Must | INV-FR-08 · INV-UC-004 |
| INV-BR-03 | Sinh số khi ký — xóa tự do | Process | Must | INV-FR-08 · INV-UC-004 |
| INV-BR-04 | Tra MST CQT | Integration | Must | INV-FR-04 · INV-UC-002 |
| INV-BR-05 | HĐ chiết khấu âm | Calculation | Must | INV-FR-17 · out MVP slice |
| INV-BR-06 | Trạng thái gửi CQT | State | Must | INV-FR-01, 11 · INV-UC-001, 007 |
| INV-BR-07 | Tính tiền dòng HHDV | Calculation | Must | INV-FR-05 · INV-UC-002 |
| INV-BR-08 | Ký gửi bắt buộc CTS | Validation | Must | INV-FR-11 · INV-UC-007 |

---

## 3. Chi tiết quy tắc

### INV-BR-01 — Không sửa HĐ đã ký

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | Hóa đơn đã ký số và/hoặc đã gửi CQT thành công **SHALL NOT** chỉnh sửa trực tiếp trên form lập HĐ. |
| **Phạm vi trạng thái** | `Thành công`, `Có lỗi` (đã có số HĐ / đã phát sinh giao dịch ký) |
| **Hành vi hệ thống** | Nút **Chỉnh sửa (F3)** và row action **Sửa** → **disabled**; API PUT trả `403` + `[INV-BR-01] …` |
| **Ngoại lệ MVP** | Module ERR (thay thế/điều chỉnh) **out of scope** — chỉ chặn sửa, chưa có luồng thay thế |
| **Thông báo lỗi** | `[INV-BR-01] Hóa đơn đã ký không được chỉnh sửa. Vui lòng dùng nghiệp vụ thay thế/điều chỉnh (Phase 2).` |

**Điều kiện áp dụng:**

```text
IF invoice.cqtStatus IN ('Thành công', 'Có lỗi') AND invoice.signed = true
THEN deny edit
```

---

### INV-BR-02 — Sinh số khi lập — xóa tuần tự

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | Khi tham số hệ thống **hình thức sinh số = "Khi lập"** (SYS-FR-06), số HĐ được cấp ngay khi **Lưu** HĐ Chờ ký. |
| **Quy tắc xóa** | Chỉ được xóa HĐ Chờ ký **theo thứ tự số giảm dần** trong cùng ký hiệu: phải xóa số lớn nhất trước. |
| **Hành vi** | Xóa HĐ có số nhỏ hơn max(số còn Chờ ký) → từ chối |
| **Thông báo lỗi** | `[INV-BR-02] Phải xóa hóa đơn có số lớn nhất trước (sinh số khi lập).` |

**Ví dụ:** Ký hiệu `1C26TAH` có HĐ số 3, 4, 5 (Chờ ký) → chỉ xóa được số 5 trước.

---

### INV-BR-03 — Sinh số khi ký — xóa tự do

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | Khi **hình thức sinh số = "Khi ký"**, HĐ Chờ ký **chưa có số HĐ / ngày HĐ** (hoặc số tạm). |
| **Quy tắc xóa** | Xóa **bất kỳ** HĐ Chờ ký nào trong ký hiệu — không yêu cầu tuần tự. |
| **Thông báo lỗi** | *(không áp dụng — xóa được)* |

---

### INV-BR-04 — Tra MST CQT

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | Nhập MST người mua (10 hoặc 13 số) → hệ thống tra cứu **CQT** (hoặc cache nội bộ) → điền tên đơn vị, địa chỉ. |
| **Thứ tự ưu tiên** | (1) Danh mục KH tenant (CAT-BR-01) nếu MST đã lưu · (2) API tra CQT · (3) cho nhập tay nếu không có kết quả |
| **Validation MST** | Regex `^\d{10}(-\d{3})?$`; sai format → `[INV-VAL-001]` |
| **MST không tồn tại** | Cảnh báo `[CQT-ERR-102] Không tìm thấy MST trên CQT` — vẫn cho lưu nếu user xác nhận (MVP: optional confirm) |
| **Timeout CQT** | `[SYS-001] Không thể tra cứu MST. Thử lại sau.` |

---

### INV-BR-05 — Hóa đơn chiết khấu âm

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | Hóa đơn loại **Chiết khấu** có **tổng tiền thanh toán âm** trên danh sách và trên mẫu in. |
| **MVP** | **Out of scope** (INV-FR-17) — rule giữ cho Phase 2 |
| **Validation** | Loại `Chiết khấu` → `totalAmount <= 0`; loại `Gốc` → `totalAmount >= 0` |

---

### INV-BR-06 — Trạng thái gửi CQT

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | Vòng đời trạng thái HĐ trên UI danh sách (MVP). |

**Máy trạng thái (MVP):**

```text
                    ┌─────────────┐
         Lưu (F4)   │   Chờ ký    │
        ──────────► │  (draft)    │
                    └──────┬──────┘
                           │ Ký gửi CQT (FR-11)
              ┌────────────┼────────────┐
              ▼            ▼            ▼
       ┌──────────┐ ┌──────────┐ ┌──────────┐
       │Thành công│ │ Có lỗi   │ │ (treo —  │
       │ + mã CQT │ │ + chi tiết│ │  query)  │
       └──────────┘ └──────────┘ └──────────┘
              │            │
              │            └──► Lấy lại mã CQT (FR-14)
              └──► Tải XML (FR-16); không sửa (BR-01)
```

| Trạng thái | Badge | Cho phép |
|------------|-------|----------|
| Chờ ký | Amber | Sửa, Xóa, Ký gửi, Sao chép |
| Thành công | Emerald | Xem in, Tải XML, Sao chép; **không** Sửa/Xóa |
| Có lỗi | Red | Xem lỗi, Lấy lại mã, Xem in; **không** Sửa |

**Cột phụ:** `Tr.CQT` — mã/trạng thái chi tiết từ CQT (nếu có).

---

### INV-BR-07 — Tính tiền dòng HHDV

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | Mỗi dòng HHDV tính tự động khi thay đổi SL, đơn giá, %CK, %VAT. |

**Công thức (MVP — HĐ GTGT):**

| Thành phần | Công thức |
|------------|-----------|
| Thành tiền (trước CK) | `quantity × unitPrice` |
| Tiền chiết khấu | `thành tiền × discountPercent / 100` |
| Thành tiền trước thuế | `thành tiền − tiền CK` |
| Tiền thuế GTGT | `trước thuế × vatRate / 100` (KCT/KKKNT → 0) |
| Thành tiền sau thuế | `trước thuế + tiền thuế` |

**Tổng HĐ:** Sum các dòng → hiển thị vùng **Tổng cộng** + **Bằng chữ** (VND).

**Làm tròn:** Theo cấu hình tiền tệ CAT-FR-04 (số lẻ thập phân).

---

### INV-BR-08 — Ký gửi bắt buộc CTS

| Mục | Nội dung |
|-----|----------|
| **Mô tả** | **Ký gửi CQT** và **Lưu & ký** SHALL yêu cầu chứng thư số hợp lệ (SYS-FR-05). |
| **Không có CTS** | Từ chối: `[INV-BR-08] Chưa cấu hình chứng thư số. Vui lòng đăng ký CTS tại Hệ thống.` |
| **CTS hết hạn** | `[INV-BR-08] Chứng thư số đã hết hạn.` |
| **Plugin ký** | MVP: WebSign hoặc plugin Jarvis — nếu chưa cài → hướng dẫn tải (Phase 2) |

---

## 4. Ma trận BR → hành vi UI

| BR | Nút / field bị ảnh hưởng |
|----|-------------------------|
| INV-BR-01 | Sửa F3, row Sửa |
| INV-BR-02/03 | Xóa F8 |
| INV-BR-04 | MST người mua + 🔍 |
| INV-BR-06 | Badge cột Tr.thái; enable/disable Ký |
| INV-BR-07 | Grid HHDV; footer tổng |
| INV-BR-08 | Ký gửi CQT, Lưu & ký |

---

## 5. Out of MVP

| BR | Ghi chú |
|----|---------|
| INV-BR-05 | HĐ chiết khấu — Phase 2 |
| Thay thế/Điều chỉnh | ERR module — không rule riêng trong INV MVP |
