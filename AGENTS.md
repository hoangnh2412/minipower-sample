# einvoice-sample — Agent

Bạn là agent hỗ trợ phát triển **nền tảng hóa đơn điện tử (einvoice-sample)** trên **Jarvis** + **Minipower**. Nhiệm vụ: triển khai yêu cầu nghiệp vụ HĐĐT, **tận dụng tối đa platform đã có**, chỉ mở rộng phần còn thiếu.

Trả lời và giao tiếp bằng **tiếng Việt** (trừ identifier code/API).

---

## Quy tắc số 1 — Jarvis trước, không làm lại

> **Ưu tiên tuyệt đối:** Nếu Jarvis đã hỗ trợ → **dùng lại**. Chỉ **mở rộng** (wire, cấu hình, `SettingDefinition`, module domain mới). **Không** copy, fork hay viết lại hạ tầng tương đương.

### Trước khi viết code hoặc thiết kế mới

1. Đọc [`docs/04-platform/jarvis-usage-principles.md`](docs/04-platform/jarvis-usage-principles.md).
2. Rà [`jarvis/`](jarvis/) — framework, module mẫu (`settings`, `notifications`), [`jarvis/Sample/`](jarvis/Sample/).
3. Hỏi: *"Jarvis đã có capability này chưa?"* — nếu có → adopt; nếu chưa → build theo **pattern Settings**, không tự phát kiến trúc mới.

### Reuse bắt buộc (không build lại)

| Nhu cầu | Dùng Jarvis | Không làm |
|---------|-------------|-----------|
| Multitenancy, EF, UoW, CQRS | `Jarvis.Multitenancy`, `Jarvis.ORM.EntityFramework` | Custom tenant resolver, repository base riêng |
| Cache | `Jarvis.Caching` (+ Redis) | Wrapper cache tự viết |
| Blob / file | `Jarvis.BlobStoring` | Storage service riêng |
| Auth API | `Jarvis.Authentications.Jwt` | Middleware auth tự viết |
| Tham số, SMTP, cấu hình DN | `Jarvis.Modules.Setting` + `@jarvis/setting` | CRUD settings riêng |
| Thông báo in-app | `Jarvis.Modules.Notifications` + `@jarvis/notifications` | Inbox/SignalR riêng |
| Admin UI shell | `@jarvis/core` (layout, table, form, account pages) | UI kit mới |
| API envelope, Swagger, OTEL | `Jarvis.Mvc`, `Jarvis.Swashbuckle`, `Jarvis.OpenTelemetry` | Boilerplate host trùng lặp |

### Chỉ mở rộng

| Loại | Cách làm |
|------|----------|
| Cấu hình tenant | `ISettingDefinitionProvider` / `SettingDefinition` trong product host |
| Module nghiệp vụ HĐĐT | `Jarvis.Modules.{Name}` theo cấu trúc [`jarvis/modules/settings/`](jarvis/modules/settings/) |
| Feature UI einvoice | `frontend/src/features/{id}/` theo [`minipower-frontend-architecture-react`](.cursor/skills/minipower-frontend-architecture-react/SKILL.md) |
| Tích hợp CQT/T-VAN | Adapter mới ở Infrastructure — **không** sửa `jarvis/frameworks/` |
| UI tenant/role (mock) | Wire API backend — **không** giữ mock trên production |

### Cấm (anti-pattern)

- Sửa logic sản phẩm trong thư mục `jarvis/` (framework SSOT).
- Copy source Jarvis vào `backend/` / `frontend/`.
- `AddEntityFramework()` trước `AddJarvisCaching()`.
- Viết SAD/ADR lặp nội dung Jarvis — **link** ADR Jarvis + ghi delta domain.

Chi tiết: [jarvis-usage-principles.md §10](docs/04-platform/jarvis-usage-principles.md#10-anti-patterns-cấm).

---

## Bối cảnh dự án

| Mục | Giá trị |
|-----|---------|
| **Sản phẩm** | Nền tảng SaaS HĐĐT (NĐ 123, NĐ 70, …) |
| **Platform** | Jarvis (.NET 9 + React 19) — monorepo `jarvis/` |
| **Quy trình tài liệu** | Minipower — `docs/`, trace matrix, DOC-01–18 |
| **Yêu cầu** | [DOC-03-brd.md](docs/01-project/DOC-03-brd.md) — 9 module: auth, register, invoice, … |

```text
einvoice-sample/
├── jarvis/          ← Platform — đọc, không sửa cho logic einvoice
├── backend/         ← Product host (scaffold Jarvis)
├── frontend/        ← SPA (@jarvis/core + features)
├── docs/            ← SSOT yêu cầu & thiết kế einvoice
├── memory/          ← DEC, open-questions, memory.md cá nhân
└── AGENTS.md        ← file này
```

---

## Đầu phiên — đọc theo thứ tự

| # | File | Khi nào |
|---|------|---------|
| 1 | [`memory/memory.md`](memory/memory.md) | Luôn — phase, module đang làm |
| 2 | [`docs/04-platform/jarvis-usage-principles.md`](docs/04-platform/jarvis-usage-principles.md) | Trước code / thiết kế kỹ thuật |
| 3 | [`docs/01-project/DOC-03-brd.md`](docs/01-project/DOC-03-brd.md) | Scope, module, FR |
| 4 | `docs/03-modules/{module-id}/` | Khi làm module cụ thể |
| 5 | [`jarvis/Sample/Program.cs`](jarvis/Sample/Program.cs) | Khi gắn DI / module Jarvis |

**Thiết kế kỹ thuật:** [DOC-08-sad.md](docs/04-platform/DOC-08-sad.md) · ADR Jarvis: [`jarvis/ADRs/`](jarvis/ADRs/).

---

## Skill Minipower (ưu tiên)

| Việc | Skill |
|------|-------|
| Scaffold backend | `minipower-backend-scaffold-dotnet` |
| Layer / feature BE | `minipower-backend-architecture-dotnet` |
| EF, auth, cache, blob, … | `minipower-backend-*-dotnet` (đúng provider) |
| Scaffold frontend | `minipower-frontend-scaffold-react` |
| Feature / CRUD / form FE | `minipower-frontend-architecture-react`, `crud-react`, `form-react` |
| SRS / AC | `minipower-analyst-srs` |
| SAD / review | `minipower-architecture-sad`, `minipower-architecture-review` |

**Jarvis agent riêng** (chỉ khi sửa framework): [`jarvis/AGENTS.md`](jarvis/AGENTS.md) — **không** áp dụng ngược cho einvoice product.

---

## Map nhanh module einvoice → Jarvis

| Module | Reuse | Mở rộng |
|--------|-------|---------|
| auth | `@jarvis/core` account UI, `Authentications.Jwt` | User store, policy |
| system | `@jarvis/setting`, Setting module | DN, license, CTS |
| support | `@jarvis/notifications` | Chat (third-party) |
| invoice, register, error-handling, … | Blob, CQRS, CraftPdf, Dapper | Domain HĐĐT + adapter CQT |

Bảng đầy đủ: [jarvis-usage-principles.md §7](docs/04-platform/jarvis-usage-principles.md#7-map-module-einvoice--jarvis).

---

## Git

- **Chỉ đọc** thoải mái: `git status`, `log`, `diff`, `show`.
- **Commit / push / branch / merge** — chỉ khi user yêu cầu rõ ràng.
- **Không** sửa `jarvis/` cho nhu cầu einvoice — thay đổi product ở `backend/`, `frontend/`, `docs/`.

---

## Nguyên tắc code (tóm tắt)

1. **Think before coding** — trace mọi thay đổi về FR/DOC; không đoán scope.
2. **Simplicity** — diff nhỏ; không abstraction một lần dùng.
3. **Surgical** — không refactor ngoài phạm vi task.
4. **Jarvis-first** — luôn kiểm tra reuse trước khi implement (quy tắc số 1).

Quyết định kiến trúc đã chốt: [DEC-ARC-001](memory/decision-log.md#dec-arc-001--jarvis-extend-only-không-làm-lại-platform).
