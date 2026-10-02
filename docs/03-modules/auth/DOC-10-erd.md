# DOC-10 — ERD — auth (AUTH)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.2 | 2026-10-02 | BA | Draft |

> **ERD platform:** [DOC-10-erd-einvoice-platform.md](../../04-platform/DOC-10-erd-einvoice-platform.md)

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
    TENANT ||--o{ USER : has
    USER ||--o{ USER_SESSION : opens
    USER ||--o{ PASSWORD_RESET_TOKEN : requests
    TENANT ||--o{ REGISTRATION_REQUEST : applies
    USER ||--o| USER_PREFERENCE : prefers
    TENANT ||--o{ SUPPORT_LEAD : captures

    USER {
        uuid id PK
        uuid tenant_id FK
        string username UK
        string password_hash
        string email
        string full_name
        enum status
        timestamp last_login_at
    }

    USER_SESSION {
        uuid id PK
        uuid user_id FK
        string token_hash
        boolean remember_me
        timestamp expires_at
        string ip_address
    }

    PASSWORD_RESET_TOKEN {
        uuid id PK
        uuid user_id FK
        string token_hash
        timestamp expires_at
        boolean used
    }

    REGISTRATION_REQUEST {
        uuid id PK
        string tax_code
        string company_name
        string contact_email
        string contact_phone
        enum status
        timestamp created_at
    }

    USER_PREFERENCE {
        uuid user_id PK_FK
        string locale
        string theme
    }

    SUPPORT_LEAD {
        uuid id PK
        uuid tenant_id FK
        string campaign_code
        string contact_info
        timestamp created_at
    }
```

## Quan hệ

| Từ | Đến | Cardinality | Ghi chú |
|----|-----|-------------|---------|
| tenant | user | 1—N | User thuộc một DN |
| user | user_session | 1—N | Nhiều session, một active |
| user | password_reset_token | 1—N | Token one-time use |
| tenant | registration_request | 1—N | Đăng ký tài khoản mới |
| user | user_preference | 1—1 | Ngôn ngữ, theme |
