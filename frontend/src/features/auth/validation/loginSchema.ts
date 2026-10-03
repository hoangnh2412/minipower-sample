import { z } from 'zod'

export const einvoiceLoginSchema = z.object({
  taxCode: z
    .string()
    .trim()
    .min(1, 'Vui lòng nhập mã số thuế')
    .max(14, 'Mã số thuế tối đa 14 ký tự'),
  username: z.string().trim().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
  rememberMe: z.boolean(),
})

export type EinvoiceLoginFormData = z.infer<typeof einvoiceLoginSchema>

export const einvoiceLoginDefaultValues: EinvoiceLoginFormData = {
  taxCode: '',
  username: '',
  password: '',
  rememberMe: false,
}
