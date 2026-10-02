# DOC-19 — Prototype / Wireframe — auth (AUTH)

| Version | Date | Author | Status |
|---------|------|--------|--------|
| 0.1 | 2026-10-03 | BA | Draft |

> **Nguồn UI:** [M-Invoice `#/login`](https://hddt.minvoice.com.vn/#/login) · 03/10/2026  
> **SRS:** [DOC-06-srs.md](DOC-06-srs.md) · **Shell:** [DOC-19-prototype-shell.md](../../04-platform/DOC-19-prototype-shell.md)

---

## 1. Phạm vi wireframe

| Màn hình | Route | FR |
|----------|-------|-----|
| Đăng nhập | `#/login` | AUTH-FR-01 |
| Đăng ký | `#/register` | AUTH-FR-02 |
| Quên mật khẩu | `#/forgot-password` | AUTH-FR-03 |

---

## 2. Layout — Đăng nhập

Layout 2 cột: trái minh họa, phải form card.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│                                                          [ 🌐 VI ]           │
│                                                                              │
│   ┌─────────────────────┐      ┌─────────────────────────────────────┐    │
│   │                     │      │         [Logo / Brand]              │    │
│   │   Illustration      │      │                                     │    │
│   │   (laptop + HÓA ĐƠN)│      │  Mã số thuế *    [________________] │    │
│   │                     │      │  Tên đăng nhập * [________________] │    │
│   │                     │      │  Mật khẩu *      [________________] 👁│    │
│   │                     │      │  ☐ Ghi nhớ          Quên mật khẩu?   │    │
│   │                     │      │                                     │    │
│   │                     │      │         [  🔐  Đăng nhập  ]          │    │
│   │                     │      │   Chưa có tài khoản?  [Đăng ký]      │    │
│   └─────────────────────┘      └─────────────────────────────────────┘    │
│                                                                              │
└──────────────────────────────────────────────────────────────────────────────┘
```

**Hành vi UI:**

| Thành phần | Quy tắc |
|------------|---------|
| Nút Đăng nhập | Disabled khi thiếu trường bắt buộc (AUTH-BR-01) |
| Ghi nhớ đăng nhập | Checkbox — AUTH-BR-03 |
| Ngôn ngữ VI | Header góc phải — AUTH-FR-04 |

---

## 3. Layout — Quên mật khẩu

```text
┌─────────────────────────────────────┐
│         [Logo / Brand]              │
│                                     │
│  Mã số thuế *    [________________] │
│  Email *         [________________] │
│                                     │
│         [ Gửi yêu cầu ]             │
│         [ Quay lại đăng nhập ]      │
│                                     │
│  (Bước USB Token — nếu cấu hình)    │
└─────────────────────────────────────┘
```

---

## 4. Layout — Đăng ký tài khoản

```text
┌─────────────────────────────────────┐
│         Đăng ký tài khoản           │
│                                     │
│  {Form fields — TBD theo host}      │
│                                     │
│         [ Đăng ký ]                 │
│         [ Quay lại đăng nhập ]      │
└─────────────────────────────────────┘
```

> Chi tiết field đăng ký wire theo `@jarvis/core` account pages khi scaffold frontend.

---

## 5. Map component (gợi ý)

| Vùng | Jarvis / PrimeReact |
|------|---------------------|
| Form card | `@jarvis/core` auth layout |
| Input MST/user/password | `InputText`, `Password` |
| Ngôn ngữ | `Select` / locale switcher |
