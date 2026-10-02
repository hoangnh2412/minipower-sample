# DOC-10 — ERD — report (RPT)

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
    TENANT ||--o{ REPORT_DEFINITION : configures
    REPORT_DEFINITION ||--o{ REPORT_RUN : executes
    REPORT_RUN ||--o{ REPORT_EXPORT : outputs
    TENANT ||--o{ SUMMARY_TABLE : creates
    SUMMARY_TABLE ||--|{ SUMMARY_TABLE_LINE : contains
    INVOICE ||--o{ SUMMARY_TABLE_LINE : aggregated
    SUMMARY_TABLE ||--o{ TRANSMISSION_LOG : transmitted
    TENANT ||--o{ MST_LOOKUP_CACHE : caches

    REPORT_DEFINITION {
        uuid id PK
        uuid tenant_id FK
        string report_code UK
        string report_name
        enum report_type
        text parameter_schema
        boolean is_system
    }

    REPORT_RUN {
        uuid id PK
        uuid definition_id FK
        uuid run_by FK
        date period_from
        date period_to
        json filter_params
        enum status
        timestamp started_at
        timestamp finished_at
    }

    REPORT_EXPORT {
        uuid id PK
        uuid run_id FK
        enum format
        string file_path
        timestamp exported_at
    }

    SUMMARY_TABLE {
        uuid id PK
        uuid tenant_id FK
        string table_no
        enum period_type
        date period_from
        date period_to
        enum cqt_status
        decimal total_before_tax
        decimal total_tax
        decimal total_amount
        uuid created_by FK
    }

    SUMMARY_TABLE_LINE {
        uuid id PK
        uuid summary_table_id FK
        uuid invoice_id FK
        enum line_type
        decimal amount_before_tax
        decimal tax_amount
    }

    MST_LOOKUP_CACHE {
        uuid id PK
        string tax_code UK
        string company_name
        string address
        enum status
        timestamp looked_up_at
    }
```

## Loại báo cáo → nguồn dữ liệu

| report_code | Nguồn chính |
|-------------|-------------|
| RPT_USAGE | invoice, license |
| RPT_SUMMARY | invoice (aggregate) |
| RPT_DETAIL | invoice, invoice_line |
| RPT_PL01 | invoice, attachment_list |
| RPT_PL101 | invoice (theo mẫu PL101) |
| RPT_01_TH | summary_table |
