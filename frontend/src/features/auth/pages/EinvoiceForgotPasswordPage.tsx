import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Label } from 'primereact/label'
import { z } from 'zod'
import {
  AccountAuthLink,
  AuthShell,
  Logo,
  ACCOUNT_ROUTES,
  callForgotPassword,
  getErrorMessage,
  notify,
} from '@jarvis/core'
import { errorClass, inputClass, inputInvalidClass, labelClass } from '../../../app/ui/fieldStyles'

const schema = z.object({
  taxCode: z.string().trim().min(1, 'Vui lòng nhập mã số thuế'),
  email: z.string().trim().email('Email không hợp lệ'),
})

type FormData = z.infer<typeof schema>

export type EinvoiceForgotPasswordPageProps = {
  onBackToLogin?: () => void
}

export function EinvoiceForgotPasswordPage({ onBackToLogin }: EinvoiceForgotPasswordPageProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { taxCode: '', email: '' },
  })

  const submit = handleSubmit(async (data) => {
    try {
      await callForgotPassword({ email: data.email })
      notify.success('Đã gửi yêu cầu — kiểm tra email')
      onBackToLogin?.()
    } catch (error) {
      notify.error(getErrorMessage(error, 'Gửi yêu cầu thất bại'))
    }
  })

  const brand = (
    <div className="flex items-center gap-3">
      <Logo size="md" showText={false} />
      <p className="m-0 text-sm font-semibold">einvoice-sample</p>
    </div>
  )

  return (
    <AuthShell
      variant="forgot"
      title="Quên mật khẩu"
      description="Nhập mã số thuế và email đã đăng ký."
      submitLabel="Gửi yêu cầu"
      logo={brand}
      isSubmitting={isSubmitting}
      onSubmit={submit}
      footer={
        <AccountAuthLink href={ACCOUNT_ROUTES.login} onClick={onBackToLogin}>
          Quay lại đăng nhập
        </AccountAuthLink>
      }
    >
      <div>
        <Label htmlFor="fp-tax" className={labelClass}>
          Mã số thuế <span className="text-red-500">*</span>
        </Label>
        <InputText
          id="fp-tax"
          unstyled
          className={errors.taxCode ? inputInvalidClass : inputClass}
          {...register('taxCode')}
        />
        {errors.taxCode?.message ? <p className={errorClass}>{errors.taxCode.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="fp-email" className={labelClass}>
          Email <span className="text-red-500">*</span>
        </Label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputText
              id="fp-email"
              type="email"
              unstyled
              className={errors.email ? inputInvalidClass : inputClass}
              value={field.value}
              onChange={(e: { target: { value: string } }) => field.onChange(e.target.value)}
              onBlur={field.onBlur}
            />
          )}
        />
        {errors.email?.message ? <p className={errorClass}>{errors.email.message}</p> : null}
      </div>
    </AuthShell>
  )
}
