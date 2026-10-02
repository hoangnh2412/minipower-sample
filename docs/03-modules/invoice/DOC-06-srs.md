# DOC-06 — SRS — invoice (INV)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.2 | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · **Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module hóa đơn đầu ra: lập, ký số, gửi CQT, tải XML, quản lý vòng đời HĐ.

**MVP v1.0:** 15 FR. Route: `#/hoa-don`. **Không** HĐ chiết khấu, gửi email, import Excel trong slice này.

**Trạng thái gửi CQT (MVP):**

| Trạng thái | Ý nghĩa |
|------------|---------|
| Chờ ký | Nháp, chưa ký/gửi CQT |
| Thành công | Đã nhận mã CQT |
| Có lỗi | Gửi lỗi — xem chi tiết |

---

## 2. Functional Requirements (MVP v1.0)

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| INV-FR-01 | Hệ thống SHALL hiển thị danh sách HĐ với lọc theo trạng thái CQT, MST NM, ngày, số tiền; hiển thị tổng cộng | Must | INV-UC-001 | INV-BR-06 |
| INV-FR-02 | Hệ thống SHALL cho phép lập HĐ mới (F4) với ký hiệu, ngày, tiền tệ, tỷ giá, HTTT | Must | INV-UC-002 | — |
| INV-FR-03 | Hệ thống SHALL điền mặc định thông tin bên bán từ SYS → Thông tin DN; cho phép sửa trên form | Must | INV-UC-002 | — |
| INV-FR-04 | Hệ thống SHALL tra cứu thông tin người mua theo MST từ dữ liệu CQT | Must | INV-UC-002 | INV-BR-04 |
| INV-FR-05 | Hệ thống SHALL cho phép thêm nhiều dòng HHDV; tính thành tiền và thuế tự động | Must | INV-UC-002 | — |
| INV-FR-06 | Hệ thống SHALL lưu HĐ trạng thái Chờ ký trước ký gửi CQT | Must | INV-UC-002 | — |
| INV-FR-07 | Hệ thống SHALL cho sửa HĐ Chờ ký; SHALL NOT cho sửa HĐ đã ký thành công | Must | INV-UC-003 | INV-BR-01 |
| INV-FR-08 | Hệ thống SHALL cho xóa HĐ Chờ ký theo quy tắc sinh số (F8) | Must | INV-UC-004 | INV-BR-02, 03 |
| INV-FR-09 | Hệ thống SHALL sao chép HĐ tạo bản mới pre-fill | Must | INV-UC-005 | — |
| INV-FR-10 | Hệ thống SHALL xem trước và in PDF HĐ | Must | INV-UC-006 | — |
| INV-FR-11 | Hệ thống SHALL ký số và gửi XML HĐ lên CQT; cập nhật mã/trạng thái | Must | INV-UC-007 | INV-BR-06 |
| INV-FR-14 | Hệ thống SHALL lấy lại mã CQT khi truyền lỗi/treo | Must | INV-UC-010 | — |
| INV-FR-16 | Hệ thống SHALL export/tải XML HĐ sau khi ký thành công | Must | INV-UC-012 | — |
| INV-FR-18 | Hệ thống SHALL đồng bộ/cập nhật trạng thái HĐ từ CQT theo yêu cầu | Must | INV-UC-014 | — |
| INV-FR-20 | Hệ thống SHALL hiển thị tổng cộng số tiền trên danh sách HĐ | Must | INV-UC-001 | — |

---

## 3. Acceptance Criteria

| AC ID | FR | Given / When / Then |
|-------|-----|---------------------|
| INV-AC-001 | INV-FR-01, 20 | **Given** có HĐ trong tenant · **When** mở danh sách + lọc · **Then** hiển thị đúng bộ lọc và tổng tiền |
| INV-AC-002 | INV-FR-02…06 | **Given** danh mục KH/HH/DV đã có · **When** lập HĐ (F4) và lưu · **Then** HĐ trạng thái Chờ ký (AC-MVP-03) |
| INV-AC-003 | INV-FR-03 | **Given** DN đã cấu hình · **When** tạo HĐ mới · **Then** thông tin bên bán pre-fill từ SYS-FR-01 |
| INV-AC-004 | INV-FR-04 | **Given** MST hợp lệ trên CQT · **When** tra cứu người mua · **Then** điền tên, địa chỉ (INV-BR-04) |
| INV-AC-005 | INV-FR-07 | **Given** HĐ Chờ ký · **When** sửa và lưu · **Then** thay đổi persist |
| INV-AC-006 | INV-FR-07 | **Given** HĐ đã ký Thành công · **When** thử sửa · **Then** form disabled / từ chối (INV-BR-01, AC-MVP-07) |
| INV-AC-007 | INV-FR-08 | **Given** HĐ Chờ ký · **When** xóa (F8) · **Then** tuân quy tắc sinh số theo SYS-FR-06 (INV-BR-02/03) |
| INV-AC-008 | INV-FR-09 | **Given** HĐ có sẵn · **When** sao chép · **Then** tạo HĐ mới pre-fill; trạng thái Chờ ký |
| INV-AC-009 | INV-FR-10 | **Given** HĐ bất kỳ · **When** xem in · **Then** preview/PDF đúng mẫu |
| INV-AC-010 | INV-FR-11 | **Given** HĐ Chờ ký + CTS · **When** ký gửi CQT · **Then** nhận mã; trạng thái Thành công (AC-MVP-04) |
| INV-AC-011 | INV-FR-11 | **Given** CQT trả lỗi · **When** ký gửi · **Then** trạng thái Có lỗi; hiển thị chi tiết |
| INV-AC-012 | INV-FR-14 | **Given** truyền lỗi/treo mã · **When** lấy lại mã CQT · **Then** cập nhật mã hoặc báo lỗi rõ (AC-MVP-06) |
| INV-AC-013 | INV-FR-16 | **Given** HĐ đã ký Thành công · **When** tải XML · **Then** file XML hợp lệ chuẩn TCT (AC-MVP-05) |
| INV-AC-014 | INV-FR-18 | **Given** HĐ đã gửi CQT · **When** yêu cầu cập nhật TT · **Then** trạng thái đồng bộ từ CQT |

---

## 4. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| INV-NFR-01 | XML HĐ tuân chuẩn TCT / NĐ 70 |
| INV-NFR-02 | PDF render nhất quán với dữ liệu XML |
| INV-NFR-03 | Phím tắt F4 (tạo mới), F8 (xóa) trên web |

---

## 5. Out of MVP v1.0

| FR ID | Ghi chú |
|-------|---------|
| INV-FR-12 | Gửi email HĐ — Phase 2 |
| INV-FR-13 | Ký hàng loạt — Phase 2 |
| INV-FR-15 | Import Excel — Phase 2 |
| INV-FR-17 | HĐ chiết khấu — Phase 2 (INV-BR-05) |
| INV-FR-19 | Chuyển ký hiệu — Phase 2 |

**Lưu ý MVP:** Module ERR (thay thế/điều chỉnh) ngoài scope — HĐ đã ký chỉ chặn sửa, chưa có luồng xử lý sai sót.
