# DOC-05 — Use Cases — support (SUP)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-01 | BA | Draft |

---

## 1. Actor Catalog

| Actor ID | Tên | Loại |
|----------|-----|------|
| ACT-SUP-01 | Người dùng | Primary |
| ACT-SYS-02 | Bộ phận hỗ trợ kỹ thuật | External |

## 2. Use Case List

| UC ID | Tên | Priority | FR |
|-------|-----|----------|-----|
| SUP-UC-001 | Truy cập hướng dẫn sử dụng | Must | SUP-FR-01 |
| SUP-UC-002 | Tải công cụ hỗ trợ | Must | SUP-FR-02 |
| SUP-UC-003 | Xem thông báo hệ thống | Must | SUP-FR-03 |
| SUP-UC-004 | Chat hỗ trợ kỹ thuật | Must | SUP-FR-04 |

---

## 3. Use Case Specifications

### SUP-UC-001 — Truy cập hướng dẫn sử dụng

| Mục | Nội dung |
|-----|----------|
| **Trigger** | Menu header → **Hướng dẫn** |
| **Luồng chính** | Mở cổng hướng dẫn sử dụng nội bộ theo chủ đề |

### SUP-UC-002 — Tải công cụ hỗ trợ

| Mục | Nội dung |
|-----|----------|
| **Trigger** | Menu header → **Tải xuống** |
| **Luồng chính** | Tải plugin ký số, tool hỗ trợ cài đặt |

### SUP-UC-003 — Xem thông báo hệ thống

| Mục | Nội dung |
|-----|----------|
| **Trigger** | Menu header → **Thông báo** |
| **Luồng chính** | Xem danh sách TB: cập nhật pháp luật, bảo trì, tính năng mới |

### SUP-UC-004 — Chat hỗ trợ kỹ thuật

| Mục | Nội dung |
|-----|----------|
| **Trigger** | Nút **Hỗ trợ** (góc phải dưới) |
| **Luồng chính** | Mở widget chat → kết nối bộ phận kỹ thuật (SUP-BR-01) |
| **Hotline** | Theo cấu hình triển khai |
