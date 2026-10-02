# DOC-08 — Software Architecture Document (SAD)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | SA | Draft |

> **Platform baseline:** [Jarvis](../../jarvis/)  
> **Nguyên tắc sử dụng Jarvis (bắt buộc):** [jarvis-usage-principles.md](jarvis-usage-principles.md)

---

## 1. Tóm tắt

**einvoice-sample** triển khai nền tảng HĐĐT ([DOC-03](../01-project/DOC-03-brd.md)) trên **Jarvis** — không thiết kế lại hạ tầng SaaS (multitenancy, cache, blob, settings, notifications, admin UI).

| Mục | Quyết định |
|-----|------------|
| Runtime backend | ASP.NET Core .NET 9 |
| Runtime frontend | React 19 + Vite + PrimeReact 11 (`@jarvis/core`) |
| Persistence | PostgreSQL + EF Core (Jarvis.ORM.EntityFramework) |
| Multitenancy | Ambient `ICurrentTenant<T>` — single DB (mặc định) |
| Cross-cutting | Adopt Jarvis ADR — xem [jarvis-usage-principles.md §8](jarvis-usage-principles.md#8-tài-liệu-thiết-kế--trích-dẫn-không-copy) |

Chi tiết nguyên tắc, reuse map, anti-pattern, skill → **[jarvis-usage-principles.md](jarvis-usage-principles.md)**.

---

## 2. Logical architecture (einvoice trên Jarvis)

```text
┌─────────────────────────────────────────────────────────────┐
│  frontend/ (SPA host)                                        │
│  @jarvis/core · @jarvis/setting · @jarvis/notifications     │
│  + features einvoice (auth, invoice, …)                      │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS /api/v1
┌──────────────────────────▼──────────────────────────────────┐
│  backend/ (einvoice Host)                                    │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ Jarvis framework (Mvc, Auth, Caching, EF, Blob, OTEL)   │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ Jarvis modules: Setting · Notifications (reuse)         │ │
│  ├─────────────────────────────────────────────────────────┤ │
│  │ einvoice modules: Invoice · Register · … (build new)    │ │
│  └─────────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
    PostgreSQL          Redis            MinIO/S3
    (tenant data)    (cache, inbox)    (PDF/XML)
         │
         ▼
    T-VAN / CQT (adapter — build new)
```

---

## 3. Module mapping

Xem bảng đầy đủ: [jarvis-usage-principles.md §7](jarvis-usage-principles.md#7-map-module-einvoice--jarvis).

| Layer | Reuse Jarvis | Build einvoice |
|-------|--------------|----------------|
| Infrastructure | Caching, Blob, Mailkit, Multitenancy EF | CQT adapter |
| Platform modules | Settings, Notifications | — |
| Domain modules | — | auth, invoice, register, error-handling, transmission, report, catalog |
| Frontend shell | @jarvis/core, setting, notifications | Feature packages per module |

---

## 4. Data architecture

- ERD tổng: [DOC-10-erd-einvoice-platform.md](DOC-10-erd-einvoice-platform.md)
- Entity contract: `ITenantEntity` + audit fields (Jarvis / Minipower core) — không redefine
- ERD chi tiết: `docs/03-modules/{module-id}/DOC-10-erd.md`

---

## 5. Security

| Mục | Approach |
|-----|----------|
| Transport | HTTPS |
| API auth | `Jarvis.Authentications.Jwt` (production SPA) |
| Tenant isolation | `ICurrentTenant` + EF filter / interceptor |
| Secrets | Setting module encrypt at rest; không secret trong `VITE_*` |
| RBAC | Wire `@jarvis/core` role UI → policy (module identity TBD) |

ADR: `jarvis/ADRs/refactor-authentication.md`

---

## 6. Integration

| Hệ thống | Hướng | Ghi chú |
|----------|-------|---------|
| CQT / T-VAN | Outbound | Adapter mới — không có trong Jarvis |
| SMTP | Outbound | `Jarvis.Notification.Mailkit` + Setting SMTP |
| SignalR | Inbound push | `Jarvis.Realtime.SignalR` + Notifications |

Chi tiết API: `DOC-12-api-spec/` (chưa có).

---

## 7. ADR einvoice (delta)

ADR riêng einvoice đặt trong [`DOC-09-adr/`](DOC-09-adr/README.md). Chỉ ghi quyết định **không** có trong Jarvis ADR.

| ID | Chủ đề | Trạng thái |
|----|--------|------------|
| — | *(chưa có)* | — |

Jarvis ADR adopt-as-is → [jarvis-usage-principles.md §8](jarvis-usage-principles.md#8-tài-liệu-thiết-kế--trích-dẫn-không-copy).

---

## 8. Traceability

| Artifact | Path |
|----------|------|
| Jarvis principles | [jarvis-usage-principles.md](jarvis-usage-principles.md) |
| BRD | [DOC-03-brd.md](../01-project/DOC-03-brd.md) |
| ERD | [DOC-10-erd-einvoice-platform.md](DOC-10-erd-einvoice-platform.md) |
| Sample host | [`jarvis/Sample/`](../../jarvis/Sample/) |

---

## Approval

| Vai trò | Tên | Ngày | Sign-off |
|---------|-----|------|----------|
| Solution Architect | *TBD* | — | ☐ |
| REQ owner | *TBD* | — | ☐ |
