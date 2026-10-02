# DOC-06 — SRS — register (REG)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.2 | 2026-10-03 | BA | Draft |

**Baseline:** MVP v1.0 · [mvp-v1.0-in-scope.md](../../01-project/mvp-v1.0-in-scope.md)  
**Use Cases:** [DOC-05-use-cases.md](DOC-05-use-cases.md) · **BR:** [DOC-04-business-rules.md](DOC-04-business-rules.md)  
**Wireframe:** [DOC-19-prototype.md](DOC-19-prototype.md) · **Out of scope:** [mvp-v1.0-out-of-scope.md](../../01-project/mvp-v1.0-out-of-scope.md)

---

## 1. Phạm vi

Module đăng ký phát hành hóa đơn với CQT: khai báo mẫu HĐ, lập và gửi tờ khai.

**MVP v1.0:** 2 FR (REG-FR-01, 03). **Không** tờ khai NĐ123/2020. Menu: Đăng ký phát hành.

---

## 2. Functional Requirements (MVP v1.0)

| FR ID | Mô tả (SHALL) | Priority | UC | BR |
|-------|---------------|----------|-----|-----|
| REG-FR-01 | Hệ thống SHALL cho phép khai báo, sửa, xem danh sách mẫu hóa đơn theo chuẩn TCT | Must | REG-UC-001 | REG-BR-01 |
| REG-FR-03 | Hệ thống SHALL hỗ trợ lập, ký, gửi tờ khai đăng ký/thay đổi theo NĐ 70/2025, NĐ 254/2026 | Must | REG-UC-003 | REG-BR-03 |

---

## 3. Acceptance Criteria

| AC ID | FR | Given / When / Then |
|-------|-----|---------------------|
| REG-AC-001 | REG-FR-01 | **Given** kế toán có quyền · **When** tạo mẫu HĐ · **Then** mẫu tuân cấu trúc TCT (REG-BR-01); lưu thành công |
| REG-AC-002 | REG-FR-01 | **Given** mẫu HĐ đã có · **When** sửa / xem danh sách · **Then** thay đổi persist; danh sách phân trang/lọc |
| REG-AC-003 | REG-FR-03 | **Given** DN + CTS đã cấu hình · **When** lập tờ khai NĐ70, ký và gửi CQT · **Then** tờ khai truyền thành công; lưu trạng thái (AC-MVP-02) |
| REG-AC-004 | REG-FR-03 | **Given** tờ khai gửi lỗi · **When** xem chi tiết · **Then** hiển thị mã/lý do lỗi từ CQT |
| REG-AC-005 | REG-FR-03 | **Given** chưa có CTS · **When** ký tờ khai · **Then** báo lỗi; không gửi CQT |

---

## 4. Non-Functional (module)

| NFR ID | Yêu cầu |
|--------|---------|
| REG-NFR-01 | XML tờ khai tuân thủ NĐ 70/2025 và TT liên quan |
| REG-NFR-02 | Ký số bắt buộc trước khi gửi CQT |

---

## 5. Out of MVP v1.0

| FR ID | Ghi chú |
|-------|---------|
| REG-FR-02 | Tờ khai NĐ123/2020 — **loại MVP** (REG-BR-02 không áp dụng slice này) |
