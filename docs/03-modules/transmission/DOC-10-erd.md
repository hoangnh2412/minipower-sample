# DOC-10 — ERD — transmission (TXN)

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
    TENANT ||--o{ TRANSMISSION_LOG : owns
    TRANSMISSION_LOG ||--|{ TRANSMISSION_DETAIL : contains
    TRANSMISSION_BATCH ||--o{ TRANSMISSION_LOG : groups
    TAX_DECLARATION ||--o{ TRANSMISSION_LOG : source
    INVOICE ||--o{ TRANSMISSION_LOG : source
    ERROR_NOTIFICATION ||--o{ TRANSMISSION_LOG : source
    SUMMARY_TABLE ||--o{ TRANSMISSION_LOG : source

    TRANSMISSION_LOG {
        uuid id PK
        uuid tenant_id FK
        uuid batch_id FK
        enum document_type
        uuid document_id
        enum direction
        enum status
        timestamp sent_at
        timestamp received_at
        string request_ref
        string response_code
        text response_message
        string xml_payload_ref
    }

    TRANSMISSION_DETAIL {
        uuid id PK
        uuid log_id FK
        string field_name
        string cqt_error_code
        text cqt_error_message
        enum severity
    }

    TRANSMISSION_BATCH {
        uuid id PK
        uuid tenant_id FK
        enum batch_type
        date period_from
        date period_to
        int total_count
        int success_count
        int error_count
        timestamp completed_at
    }

    QR_PAYMENT_LOG {
        uuid id PK
        uuid tenant_id FK
        uuid invoice_id FK
        string qr_ref
        decimal amount
        enum status
        timestamp paid_at
    }
```

## Quan hệ

| document_type | Thực thể nguồn | Module |
|---------------|----------------|--------|
| declaration | tax_declaration | REG |
| invoice | invoice | INV |
| error_notice | error_notification | ERR |
| summary | summary_table | RPT |

| Từ | Đến | Cardinality | Ghi chú |
|----|-----|-------------|---------|
| transmission_batch | transmission_log | 1—N | Ký/gửi hàng loạt |
| transmission_log | transmission_detail | 1—N | Chi tiết lỗi từng trường/HĐ |
| invoice | qr_payment_log | 1—N | Lịch sử thanh toán QR |
