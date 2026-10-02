# DOC-10 — ERD — catalog (CAT)

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
    TENANT ||--o{ CUSTOMER : masters
    TENANT ||--o{ PRODUCT : masters
    TENANT ||--o{ UNIT_OF_MEASURE : masters
    TENANT ||--o{ CURRENCY : masters
    TENANT ||--o{ PAYMENT_METHOD : masters
    TENANT ||--o{ BANK : masters
    TENANT ||--o{ BUSINESS_LOCATION : masters
    TENANT ||--o{ EMAIL_TEMPLATE : masters
    TENANT ||--o{ INTEGRATION_DEVICE : registers
    PRODUCT }o--|| UNIT_OF_MEASURE : measured_in
    PRODUCT }o--o| CURRENCY : priced_in

    CUSTOMER {
        uuid id PK
        uuid tenant_id FK
        string tax_code UK
        string name
        string address
        string email
        string phone
        string bank_account
        boolean is_active
    }

    PRODUCT {
        uuid id PK
        uuid tenant_id FK
        string product_code UK
        string product_name
        uuid uom_id FK
        decimal default_price
        decimal tax_rate
        string currency_code FK
        boolean is_active
    }

    UNIT_OF_MEASURE {
        uuid id PK
        uuid tenant_id FK
        string uom_code UK
        string uom_name
    }

    CURRENCY {
        string code PK
        uuid tenant_id FK
        string name
        decimal exchange_rate
        date rate_date
    }

    PAYMENT_METHOD {
        uuid id PK
        uuid tenant_id FK
        string code UK
        string name
    }

    BANK {
        uuid id PK
        uuid tenant_id FK
        string bank_code
        string bank_name
        string branch
    }

    BUSINESS_LOCATION {
        uuid id PK
        uuid tenant_id FK
        string location_code UK
        string location_name
        string address
    }

    EMAIL_TEMPLATE {
        uuid id PK
        uuid tenant_id FK
        string template_code UK
        string subject
        text body_html
    }

    INTEGRATION_DEVICE {
        uuid id PK
        uuid tenant_id FK
        enum device_type
        string device_code UK
        string device_name
        enum status
        timestamp last_sync_at
    }
```

## Quan hệ với INV

| Catalog | Sử dụng tại |
|---------|-------------|
| customer | invoice.buyer_customer_id, invoice_party |
| product | invoice_line.product_id |
| currency | invoice.currency_code |
| payment_method | invoice.payment_method_id |
| uom | invoice_line.unit_code |
