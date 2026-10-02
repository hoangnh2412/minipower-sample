# DOC-10 — ERD — register (REG)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.2 | 2026-10-02 | BA | Draft |

---

## Quy ước audit & multi-tenant (Minipower core)

Mọi bảng nghiệp vụ kế thừa trường chuẩn từ **Minipower core framework**. Không vẽ trong diagram — filter tenant/org, audit trail và soft-delete do framework xử lý.

| Field | Kiểu | Mô tả |
|-------|------|-------|
| TenantId | UUID | Phân vùng tenant (doanh nghiệp) |
| OrgId | UUID | Đơn vị tổ chức trong tenant |
| CreatedBy | UUID | Người tạo |
| CreatedAt | TIMESTAMP | Thời điểm tạo |
| UpdatedBy | UUID | Người cập nhật |
| UpdatedAt | TIMESTAMP | Thời điểm cập nhật |
| DeletedAt | TIMESTAMP | Thời điểm xóa mềm (nullable) |
| DeletedBy | UUID | Người xóa (nullable) |
| DeletedId | UUID | Định danh xóa mềm / bản ghi thay thế (nullable) |

---

## Thực thể

```mermaid
erDiagram
    TENANT ||--o{ INVOICE_TEMPLATE : owns
    INVOICE_TEMPLATE ||--o{ INVOICE_SERIES : defines
    TENANT ||--o{ TAX_DECLARATION : files
    TAX_DECLARATION ||--|{ TAX_DECLARATION_LINE : contains
    TAX_DECLARATION ||--o{ TRANSMISSION_LOG : transmitted
    DIGITAL_CERTIFICATE ||--o{ TAX_DECLARATION : signs

    INVOICE_TEMPLATE {
        uuid id PK
        uuid tenant_id FK
        string template_code UK
        string template_name
        enum invoice_kind
        boolean has_cqt_code
        enum status
    }

    INVOICE_SERIES {
        uuid id PK
        uuid template_id FK
        string series_code UK
        int current_number
        date effective_from
        date effective_to
        enum number_generation
    }

    TAX_DECLARATION {
        uuid id PK
        uuid tenant_id FK
        enum declaration_type
        enum legal_basis
        date submission_date
        enum cqt_status
        uuid signed_by_cert_id FK
    }

    TAX_DECLARATION_LINE {
        uuid id PK
        uuid declaration_id FK
        uuid series_id FK
        int line_no
        string description
    }
```

## Quan hệ

| Từ | Đến | Cardinality | Ghi chú |
|----|-----|-------------|---------|
| invoice_template | invoice_series | 1—N | Một mẫu nhiều ký hiệu |
| tax_declaration | tax_declaration_line | 1—N | Chi tiết tờ khai |
| tax_declaration | transmission_log | 1—N | Log gửi CQT (TXN) |
| invoice_series | invoice | 1—N | HĐ dùng ký hiệu (INV) |
