# Decision Log — einvoice-sample

> Quyết định **có phương án bị loại** (lưu "tại sao"). **Một file cho cả dự án** — không chia phase (ADR-035 QĐ-7). ID vẫn `DEC-{PHASE}-NNN` trong từng entry.
> Schema đầy đủ: minipower pack `docs/decision-log.md`.

<!-- Thêm entry mới phía trên (mới nhất trước). -->

## DEC-ARC-001 — Jarvis extend-only, không làm lại platform

| Mục | Nội dung |
|-----|----------|
| **Ngày** | 2026-10-03 |
| **Trạng thái** | Accepted |
| **Bối cảnh** | einvoice-sample xây trên monorepo Jarvis (`jarvis/`). Cần quy ước rõ cho agent và dev tránh duplicate hạ tầng. |

**Quyết định:** Mọi tính năng đã có trong Jarvis (multitenancy, cache, blob, settings, notifications, `@jarvis/core`, …) được **dùng lại as-is**. einvoice chỉ **mở rộng**: module domain HĐĐT, `SettingDefinition`, adapter CQT, wire UI mock → API thật.

**Phương án bị loại:**

| Phương án | Lý do loại |
|-----------|------------|
| Fork / copy Jarvis vào `backend/` | Mất đồng bộ platform, duplicate maintenance |
| Viết lại setting, notification, cache riêng | Jarvis modules đã production-ready + có SAD |
| Sửa `jarvis/` cho logic einvoice | Ranh giới framework vs product bị phá |

**Artifact:** [`AGENTS.md`](../AGENTS.md) · [`docs/04-platform/jarvis-usage-principles.md`](../docs/04-platform/jarvis-usage-principles.md) · [`DOC-08-sad.md`](../docs/04-platform/DOC-08-sad.md)
