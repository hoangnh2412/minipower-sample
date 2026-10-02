# DOC-10 — ERD — error-handling (ERR)

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
    INVOICE ||--o{ ERROR_NOTIFICATION : source
    INVOICE ||--o{ INVOICE : "adjusts/replaces"
    INVOICE ||--o{ MINUTES : documented
    INVOICE ||--o{ ATTACHMENT_LIST : has
    ATTACHMENT_LIST ||--|{ ATTACHMENT_LIST_LINE : contains
    ERROR_NOTIFICATION ||--o{ TRANSMISSION_LOG : transmitted
    MINUTES ||--o{ MINUTES_FILE : uploaded

    ERROR_NOTIFICATION {
        uuid id PK
        uuid tenant_id FK
        uuid source_invoice_id FK
        string notice_no
        date notice_date
        enum error_type
        text error_description
        enum cqt_status
        timestamp submitted_at
    }

    MINUTES {
        uuid id PK
        uuid tenant_id FK
        uuid invoice_id FK
        enum minutes_type
        text reason
        enum sign_status
        uuid signed_by_user_id FK
        timestamp signed_at
    }

    MINUTES_FILE {
        uuid id PK
        uuid minutes_id FK
        string file_path
        enum file_type
        timestamp uploaded_at
    }

    ATTACHMENT_LIST {
        uuid id PK
        uuid tenant_id FK
        uuid invoice_id FK
        enum list_type
        string list_no
        date list_date
    }

    ATTACHMENT_LIST_LINE {
        uuid id PK
        uuid list_id FK
        int line_no
        uuid invoice_id FK
        string description
        decimal amount
    }
```

## Quan hệ

| Từ | Đến | Cardinality | Ghi chú |
|----|-----|-------------|---------|
| invoice (gốc) | invoice (ĐC/TT) | 1—N | Qua `root_invoice_id` / `parent_invoice_id` |
| invoice | error_notification | 1—N | 04/SS cho sai sót nhỏ |
| invoice | minutes | 1—N | Biên bản kèm ĐC/TT |
| invoice | attachment_list | 1—N | Bảng kê thường / ĐC-TT / chiết khấu |
| minutes | minutes_file | 1—N | Upload biên bản đã ký 2 bên |

**Lưu ý:** HĐ điều chỉnh/thay thế lưu trong bảng `invoice` (INV) với `invoice_type` và liên kết chuỗi; module ERR quản lý metadata xử lý sai sót.
