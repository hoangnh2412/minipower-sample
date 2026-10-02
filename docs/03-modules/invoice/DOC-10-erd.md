# DOC-10 — ERD — invoice (INV)

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
    INVOICE_SERIES ||--o{ INVOICE : issues
    INVOICE ||--|{ INVOICE_LINE : contains
    INVOICE ||--|| INVOICE_PARTY : has_parties
    INVOICE ||--o| INVOICE : root_of_chain
    INVOICE ||--o| INVOICE : parent_in_chain
    CUSTOMER ||--o{ INVOICE : buyer
    PRODUCT ||--o{ INVOICE_LINE : item
    CURRENCY ||--o{ INVOICE : denominated
    PAYMENT_METHOD ||--o{ INVOICE : paid_by
    USER ||--o{ INVOICE : created_by
    INVOICE ||--o{ TRANSMISSION_LOG : transmitted
    INVOICE ||--o{ EMAIL_DELIVERY : emailed

    INVOICE {
        uuid id PK
        uuid tenant_id FK
        uuid series_id FK
        string invoice_no
        date invoice_date
        enum invoice_type
        enum cqt_status
        string cqt_code
        uuid root_invoice_id FK
        uuid parent_invoice_id FK
        decimal total_before_tax
        decimal total_tax
        decimal total_amount
        string currency_code FK
        decimal exchange_rate
        uuid payment_method_id FK
        uuid buyer_customer_id FK
        uuid created_by FK
        timestamp signed_at
    }

    INVOICE_LINE {
        uuid id PK
        uuid invoice_id FK
        int line_no
        uuid product_id FK
        string item_name
        string unit_code
        decimal quantity
        decimal unit_price
        decimal tax_rate
        decimal amount_before_tax
        decimal tax_amount
    }

    INVOICE_PARTY {
        uuid invoice_id PK_FK
        string seller_tax_code
        string seller_name
        string seller_address
        string buyer_tax_code
        string buyer_name
        string buyer_address
        string buyer_email
        string buyer_phone
        string buyer_bank_account
    }

    EMAIL_DELIVERY {
        uuid id PK
        uuid invoice_id FK
        string recipient_email
        enum status
        timestamp sent_at
        string error_message
    }
```

## Quan hệ & ràng buộc

| Ràng buộc | Mô tả |
|-----------|-------|
| INV-BR-01 | `cqt_status = success` → không UPDATE trực tiếp invoice/line |
| INV-BR-02 | `invoice_no` unique trong `(tenant_id, series_id)` khi đã sinh số |
| INV-BR-03 | `invoice_type = discount` → `total_amount` âm |
| Chuỗi ĐC/TT | `root_invoice_id` → HĐ gốc; `parent_invoice_id` → bước trước |
