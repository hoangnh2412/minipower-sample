# DOC-10 — ERD — system (SYS)

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
    TENANT ||--|| TENANT_PROFILE : profile
    TENANT ||--o{ LICENSE : licensed
    TENANT ||--o{ USER : employs
    TENANT ||--o{ ROLE : defines
    TENANT ||--o{ SYSTEM_PARAMETER : configures
    TENANT ||--o{ EMAIL_SERVER_CONFIG : mails_via
    TENANT ||--o{ DEFAULT_VALUE : defaults
    TENANT ||--o{ DIGITAL_CERTIFICATE : signs_with
    USER }o--o{ ROLE : via_USER_ROLE
    ROLE }o--o{ PERMISSION : via_ROLE_PERMISSION

    TENANT {
        uuid id PK
        string tax_code UK
        string name
        enum status
        timestamp created_at
    }

    TENANT_PROFILE {
        uuid tenant_id PK_FK
        string address
        string phone
        string email
        string logo_url
        string representative
    }

    LICENSE {
        uuid id PK
        uuid tenant_id FK
        string plan_code
        date valid_from
        date valid_to
        int invoice_quota_monthly
        int invoice_used_monthly
    }

    USER {
        uuid id PK
        uuid tenant_id FK
        string username UK
        string password_hash
        string email
        enum status
    }

    ROLE {
        uuid id PK
        uuid tenant_id FK
        string role_code UK
        string role_name
    }

    PERMISSION {
        uuid id PK
        string permission_code UK
        string module
        string action
    }

    USER_ROLE {
        uuid user_id PK_FK
        uuid role_id PK_FK
    }

    ROLE_PERMISSION {
        uuid role_id PK_FK
        uuid permission_id PK_FK
    }

    SYSTEM_PARAMETER {
        uuid id PK
        uuid tenant_id FK
        string param_key UK
        string param_value
        string data_type
    }

    EMAIL_SERVER_CONFIG {
        uuid tenant_id PK_FK
        string smtp_host
        int smtp_port
        string smtp_user
        string smtp_password_enc
        boolean use_tls
    }

    DEFAULT_VALUE {
        uuid id PK
        uuid tenant_id FK
        string field_key UK
        string default_value
        string placeholder
    }

    DIGITAL_CERTIFICATE {
        uuid id PK
        uuid tenant_id FK
        string serial_number UK
        string subject_name
        date valid_from
        date valid_to
        enum cert_type
        enum status
    }
```

## Tham số hệ thống quan trọng

| param_key | Ảnh hưởng |
|-----------|-----------|
| invoice_number_generation | Sinh số khi lập / khi ký (INV-BR-02) |
| default_currency | Mặc định lập HĐ |
| cqt_integration_mode | T-VAN / hub |
