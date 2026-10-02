# Nguyên tắc sử dụng Jarvis — einvoice-sample

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | SA | Draft |

> **Phạm vi:** Hướng dẫn bắt buộc khi scaffold, thiết kế và triển khai **einvoice-sample** trên nền **Jarvis**.  
> **SSOT kỹ thuật Jarvis:** [`jarvis/`](../../jarvis/) — ADR, SAD module, Sample host. Tài liệu này **không thay** ADR Jarvis; chỉ quy định cách dự án einvoice áp dụng.

**Liên quan:** [DOC-03-brd.md](../01-project/DOC-03-brd.md) · [DOC-10-erd-einvoice-platform.md](DOC-10-erd-einvoice-platform.md) · [DOC-08-sad.md](DOC-08-sad.md)

---

## 1. Jarvis là gì trong dự án này

Jarvis là **platform framework** (backend .NET 9 + frontend React 19) nằm trong monorepo:

```text
einvoice-sample/
├── jarvis/                 ← Platform SSOT (framework + module mẫu + ADR)
├── backend/                ← Product host (scaffold từ Jarvis)
├── frontend/               ← SPA host (@jarvis/core)
└── docs/                   ← Yêu cầu & thiết kế einvoice
```

**Nguyên tắc cốt lõi:** einvoice **mở rộng** Jarvis — không fork, không viết lại hạ tầng đã có (multitenancy, cache, blob, setting, notification…).

---

## 2. Hai trục kiến trúc (bắt buộc hiểu)

Jarvis tách **hai trục bổ sung**, không thay thế nhau:

| Trục | Câu hỏi trả lời | einvoice áp dụng |
|------|-----------------|------------------|
| **Clean Architecture** (dọc) | File đặt ở layer nào? Reference hướng nào? | `Host → Infrastructure → Application → Domain → Domain.Shared` |
| **Atomic modules** (ngang) | Cần capability nào? Bật package nào? | Chỉ reference `Jarvis.*` cần dùng; đăng ký qua `Add*` / `Use*` |

```text
  Chiều dọc (product layers)          Chiều ngang (Jarvis packages)
  ─────────────────────────           ─────────────────────────────
  einvoice.Host                       Jarvis.Mvc · Caching · EF · Blob …
    ↑                                     ↓ cắm vào layer phù hợp
  einvoice.Infrastructure
    ↑
  einvoice.Application
    ↑
  einvoice.Domain
```

**Skill:** `minipower-backend-architecture-dotnet` (layer) · `minipower-backend-scaffold-dotnet` (scaffold + catalog package).

---

## 3. Nguyên tắc backend

### 3.1 Phụ thuộc một chiều

| Layer | Được làm | Không được làm |
|-------|----------|----------------|
| **Domain** | Entity, aggregate, repository interface, domain event | Reference EF, Redis, HTTP |
| **Application** | Command/Query/Handler, DTO, mapping | Inject `DbContext`, `HttpClient` |
| **Infrastructure** | EF config, repository impl, adapter ngoài | Logic nghiệp vụ HĐĐT |
| **Host** | Controller mỏng, DI composition, middleware | Business rule trong controller |

- Handler **chỉ điều phối** — invariant nằm trong aggregate/entity.
- Controller gọi **dispatcher**, không query `DbSet` trực tiếp.
- API **không trả domain entity** — chỉ DTO / primitive / ID.

### 3.2 Thứ tự đăng ký DI (Host)

Thứ tự sai → runtime lỗi hoặc cache/tenant không hoạt động:

```text
1. AddJarvisCaching()                    ← bắt buộc trước EF
2. AddCurrentUser<TUser>()
3. AddCurrentTenant<TTenant>()
4. AddEntityFramework()
5. AddMultitenancyEntityFramework()      ← nếu dùng per-tenant DB / interceptor
6. AddJarvisAuthentication()             ← JWT / API Key theo môi trường
7. AddCoreSetting() / AddNotificationModule() / …
8. UseAuthentication → UseAuthorization → MapControllers / MapHub
```

**Blueprint:** [`jarvis/Sample/Program.cs`](../../jarvis/Sample/Program.cs)

### 3.3 Entity & multitenancy

- Entity nghiệp vụ einvoice implement `ITenantEntity` (cùng contract Jarvis / Minipower core trong ERD).
- Trường audit (`TenantId`, `CreatedAt`, `DeletedAt`…) theo [`DOC-10-erd-einvoice-platform.md`](DOC-10-erd-einvoice-platform.md) — **không vẽ lại**; framework xử lý filter/soft-delete.
- `ICurrentTenant<T>` là **ambient context** — module domain không đọc `TenantId` từ UoW trực tiếp.

**ADR tham chiếu:** `jarvis/ADRs/2026-08-06-adr-jarvis-multitenancy-package.md`, `...-entityframework.md`, `2026-08-01-adr-current-user-tenant.md`

### 3.4 CQRS (không MediatR)

- Command/Query trong `Application/Commands/`, `Application/Queries/`.
- Dispatch qua `ICommandDispatcher` / `IQueryDispatcher` (`AddCoreDomain()`).
- **Chưa có** `CrudAppService` generic (ADR proposed) — module mới theo **pattern Settings**.

### 3.5 Module domain mới (einvoice)

Cấu trúc chuẩn — **copy từ** [`jarvis/modules/settings/`](../../jarvis/modules/settings/):

```text
modules/{name}/
├── Jarvis.Modules.{Name}/              Core · I*Manager · definitions
├── Jarvis.Modules.{Name}.EntityFramework/
├── Jarvis.Modules.{Name}.API/
└── frontend/                           → @jarvis/{name} (tùy chọn)
```

Đăng ký Host:

```csharp
builder.AddCore{Name}()
    .UseEntityFramework<IUnitOfWork, CurrentTenantInfo>()
    .UseHttpApi();
```

### 3.6 Cài Jarvis: ProjectReference vs NuGet

| Cách | Khi nào |
|------|---------|
| **ProjectReference** `../../jarvis/frameworks/...` | Monorepo hiện tại (khuyến nghị) |
| **NuGet** `Jarvis.*` | Repo tách riêng, CI feed nội bộ |

**Lưu ý PackageId:** folder `Jarvis.Authentication.*` → NuGet `Jarvis.Authentications.*` (có **s**).

---

## 4. Nguyên tắc frontend

### 4.1 Ba tầng import

```text
App host (frontend/src/)     ghép route, menu, configureJarvisHttp
  ↑ import barrel only
Feature module               pages · components · services · validation
  ↑
@jarvis/core                 primitive UI · AdminLayout · account pages
```

| Quy tắc | Chi tiết |
|---------|----------|
| Feature **không** import `react-router` / `useParams` | Host inject navigation |
| Host **không** đâm vào ruột feature | Chỉ import từ `index.ts` barrel |
| `configureJarvisHttp()` **một lần** trước render | Mọi `call*` dùng chung instance |

**Skill:** `minipower-frontend-architecture-react` · `minipower-frontend-scaffold-react`

### 4.2 Cấu trúc feature (bắt buộc)

```text
src/features/{feature}/
├── pages/{Name}Page.tsx
├── components/
├── services/api.ts          call* → jarvisHttp
├── validation/              Zod + react-hook-form
├── routes/paths.ts
├── menu/items.ts
├── permission/              (khi có RBAC)
└── index.ts                 public API
```

Mẫu tham chiếu: [`jarvis/modules/settings/frontend/`](../../jarvis/modules/settings/frontend/)

### 4.3 Package feature có sẵn

| Package | Dùng cho einvoice | Gắn vào host |
|---------|-------------------|--------------|
| `@jarvis/core` | Layout, form, table, account UI, CraftPdf, query builder | `file:../jarvis/frameworks/frontend` |
| `@jarvis/setting` | SYS — tham số, SMTP, giá trị mặc định | `file:../jarvis/modules/settings/frontend` |
| `@jarvis/notifications` | SUP — thông báo, SignalR | `file:../jarvis/modules/notifications/frontend` |

### 4.4 UI mock vs API thật

`@jarvis/core` có **tenant, role, file manager** với **mock HTTP** — einvoice **không** dùng mock cho production:

- Giữ UI kit; implement API backend theo pattern Settings.
- Lint **M1** (architecture) chặn page gọi mock khi merge — bật `eslint.architecture.js` sau scaffold.

---

## 5. Reuse — không build lại

### 5.1 Framework backend (dùng as-is)

| Capability | Jarvis package | Module einvoice liên quan |
|------------|----------------|---------------------------|
| Multitenancy | `Jarvis.Multitenancy` + `.EntityFramework` | Tất cả |
| ORM + UoW | `Jarvis.ORM.EntityFramework` | Tất cả |
| Cache | `Jarvis.Caching` + `.Redis` | CAT, tra MST, settings |
| Blob | `Jarvis.BlobStoring` (+ MinIO/S3) | INV PDF/XML, ERR biên bản |
| Auth | `Jarvis.Authentications.Jwt` | AUTH |
| Email | `Jarvis.Notification.Mailkit` | INV gửi email, SYS SMTP |
| API shell | `Jarvis.Mvc`, `Jarvis.Swashbuckle` | Toàn API |
| OTEL / Health | `Jarvis.OpenTelemetry`, `Jarvis.HealthChecks` | NFR |
| Dapper read | `Jarvis.ORM.Dapper` | RPT |

### 5.2 Module Jarvis hoàn chỉnh

| Module Jarvis | Thay cho build einvoice | Tài liệu SSOT |
|---------------|-------------------------|---------------|
| **Settings** | SYS-FR-06, 07, 08 (tham số, email server, default) | [`modules/settings/.../doc/SAD.md`](../../jarvis/modules/settings/Jarvis.Modules.Setting/doc/SAD.md) |
| **Notifications** | SUP-FR-03 (thông báo hệ thống) | [`modules/notifications/README.md`](../../jarvis/modules/notifications/README.md) |

### 5.3 Frontend kit

| @jarvis/core feature | Module einvoice |
|----------------------|-----------------|
| `LoginPage`, `RegisterPage`, `ForgotPasswordPage` | AUTH |
| `AdminLayout`, `DataTable`, `ListPagination` | Shell toàn app |
| `CraftPdf` | Mẫu HĐ / xem in (INV) |
| `queryBuilder` | Lọc danh sách HĐ (INV-FR-01) |
| `import` flow | Import Excel (INV-FR-15) |

---

## 6. Build mới — domain HĐĐT

Jarvis **không có** — einvoice phải implement theo pattern Settings:

| Module einvoice | Nội dung build |
|-----------------|----------------|
| **invoice** | Entity, workflow ký/gửi CQT, PDF/XML |
| **register** | Tờ khai NĐ123/70, mẫu HĐ |
| **error-handling** | 04/SS, thay thế, điều chỉnh |
| **transmission** | Log truyền nhận CQT |
| **report** | Báo cáo thuế (Dapper) |
| **catalog** | Master KH/HH/DV |
| **Adapter CQT/T-VAN** | Tích hợp bên ngoài |
| **Ký số / XML UBL** | Compliance |

### 6.1 Wire — có UI/framework, chưa có backend

| Thành phần | Trạng thái Jarvis | Việc einvoice |
|------------|-------------------|---------------|
| Tenant admin | FE `@jarvis/core` (mock) | API tenant hoặc module `tenants` (ADR proposed) |
| Role / RBAC | FE mock | Module `identity` + policy |
| Account JWT | FE có, Sample API Key | `Authentications.Jwt` + user store |
| File browser | FE mock | API trên `IBlobStoringService` |

---

## 7. Map module einvoice → Jarvis

| MOD | Folder | Reuse Jarvis | Build / wire |
|-----|--------|--------------|--------------|
| AUTH | `auth/` | FE account + `Authentications.Jwt` | User store, session |
| REG | `register/` | Multitenancy, blob | Domain REG + CQT |
| INV | `invoice/` | CraftPdf, blob, CQRS, query builder FE | Domain INV + adapter |
| ERR | `error-handling/` | Blob, notifications | Domain ERR |
| TXN | `transmission/` | EF log pattern | Domain TXN |
| RPT | `report/` | Dapper | Report queries |
| CAT | `catalog/` | CRUD pattern (Sample Employee) | Entity + API |
| SYS | `system/` | **`@jarvis/setting` + Setting module** | DN info, license, CTS |
| SUP | `support/` | **`@jarvis/notifications`** | Chat (third-party) |

---

## 8. Tài liệu thiết kế — trích dẫn, không copy

Khi viết SAD/ADR einvoice (`DOC-08`, `DOC-09`), **link** tới Jarvis SSOT:

### 8.1 Cross-cutting ADR (platform)

| Chủ đề | Path |
|--------|------|
| Index | [`jarvis/ADRs/README.md`](../../jarvis/ADRs/README.md) |
| Multitenancy | `jarvis/ADRs/2026-08-06-adr-jarvis-multitenancy-*.md` |
| ORM | `jarvis/ADRs/2026-08-07-adr-jarvis-orm-packages.md` |
| Notifications | `jarvis/ADRs/2026-08-11-adr-jarvis-notifications.md` |
| Realtime vs inbox | `jarvis/ADRs/2026-08-12-adr-jarvis-realtime-inbox-boundary.md` |
| Settings | `jarvis/ADRs/2026-08-13-adr-jarvis-setting-abstractions.md` |
| Cache | `jarvis/ADRs/refactor-cache-plan.md` |
| Auth / Blob | `jarvis/ADRs/refactor-authentication.md`, `refactor-blob-storing.md` |
| Kiến trúc tổng | `jarvis/ADRs/architecture-software.md` |

### 8.2 SAD module (mẫu cho domain einvoice)

| Module | Path |
|--------|------|
| Settings (SYS) | [`jarvis/modules/settings/Jarvis.Modules.Setting/doc/SAD.md`](../../jarvis/modules/settings/Jarvis.Modules.Setting/doc/SAD.md) |
| OpenAPI Settings | `jarvis/modules/settings/Jarvis.Modules.Setting/doc/openapi.md` |

**Quy ước:** ADR/SAD einvoice chỉ ghi **delta** so với Jarvis (domain HĐĐT, adapter CQT). Phần hạ tầng → “Adopt Jarvis ADR-xxx”.

---

## 9. Skill Minipower — khi nào dùng

| Tác vụ | Skill |
|--------|-------|
| Scaffold backend | `minipower-backend-scaffold-dotnet` |
| Thêm feature / layer | `minipower-backend-architecture-dotnet` |
| EF pattern (single DB / hybrid) | `minipower-backend-entityframework-dotnet` |
| JWT / API Key | `minipower-backend-authentication-dotnet` |
| Redis cache | `minipower-backend-caching-dotnet` |
| MinIO blob | `minipower-backend-blobstoring-dotnet` |
| Email / notification | `minipower-backend-notification-dotnet` |
| SignalR realtime | `minipower-backend-realtime-dotnet` |
| Swagger | `minipower-backend-swashbuckle-dotnet` |
| OTEL | `minipower-backend-telemetry-dotnet` |
| Scaffold frontend | `minipower-frontend-scaffold-react` |
| Thêm màn hình / feature | `minipower-frontend-architecture-react` + `crud-react` / `form-react` |
| API client | `minipower-frontend-api-react` |
| Review | `minipower-backend-review-dotnet`, `minipower-frontend-review-react` |

---

## 10. Anti-patterns (cấm)

| # | Không làm | Làm đúng |
|---|-----------|----------|
| AP-01 | Copy source Jarvis vào `backend/src` | ProjectReference / NuGet |
| AP-02 | Sửa file trong `jarvis/` cho logic einvoice | Module einvoice riêng hoặc `SettingDefinition` |
| AP-03 | Query `DbSet` trong controller | Handler + repository |
| AP-04 | `AddEntityFramework()` trước `AddJarvisCaching()` | Theo §3.2 |
| AP-05 | Feature import `useParams` trực tiếp | Host wrapper + inject navigation |
| AP-06 | Dùng mock tenant/role API trên production | Wire API thật |
| AP-07 | Viết lại Setting/Notification module | `AddCoreSetting()`, `@jarvis/setting` |
| AP-08 | SAD einvoice lặp lại nội dung ADR Jarvis | Link + delta domain |

---

## 11. Quy trình khởi tạo (khuyến nghị)

```text
1. Đọc jarvis/Sample/Program.cs + clients/web/
2. Scaffold backend/ (minipower-backend-scaffold-dotnet) — ProjectReference jarvis
3. Scaffold frontend/ (minipower-frontend-scaffold-react) — @jarvis/core file:
4. Gắn @jarvis/setting + @jarvis/notifications (SYS, SUP)
5. Module domain đầu tiên: auth (JWT) → invoice (vertical slice)
6. SAD module einvoice: pattern Settings + link ADR Jarvis
7. Cập nhật trace-matrix + doc-registry
```

---

## 12. Traceability

| Artifact | Path |
|----------|------|
| Agent rules (Jarvis-first) | [AGENTS.md](../../AGENTS.md) |
| Decision | [DEC-ARC-001](../../memory/decision-log.md#dec-arc-001--jarvis-extend-only-không-làm-lại-platform) |
| BRD / module | [DOC-03-brd.md](../01-project/DOC-03-brd.md) |
| ERD platform | [DOC-10-erd-einvoice-platform.md](DOC-10-erd-einvoice-platform.md) |
| SAD einvoice (delta) | [DOC-08-sad.md](DOC-08-sad.md) |
| Jarvis platform README | [`jarvis/README.md`](../../jarvis/README.md) |

---

## Approval

| Vai trò | Tên | Ngày | Sign-off |
|---------|-----|------|----------|
| Solution Architect | *TBD* | — | ☐ |
| REQ owner | *TBD* | — | ☐ |
