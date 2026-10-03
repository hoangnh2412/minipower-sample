import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Label } from 'primereact/label'
import {
  AccountAuthLink,
  AuthShell,
  Logo,
  PasswordInput,
  callLogin,
  getErrorMessage,
  notify,
} from '@jarvis/core'
import {
  einvoiceLoginDefaultValues,
  einvoiceLoginSchema,
  type EinvoiceLoginFormData,
} from '../validation/loginSchema'

const inputClass =
  'box-border h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-800 shadow-sm outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70'

const inputInvalidClass =
  `${inputClass} !border-red-500 focus:!border-red-500 focus:!ring-red-500/20`

export type EinvoiceLoginPageProps = {
  onSuccess?: () => void
  onForgotClick?: () => void
  onRegisterClick?: () => void
  forgotHref?: string
  registerHref?: string
}

export function EinvoiceLoginPage({
  onSuccess,
  onForgotClick,
  onRegisterClick,
  forgotHref = '/forgot-password',
  registerHref = '/register',
}: EinvoiceLoginPageProps) {
  const [locale] = useState('VI')

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<EinvoiceLoginFormData>({
    resolver: zodResolver(einvoiceLoginSchema),
    defaultValues: einvoiceLoginDefaultValues,
    mode: 'onChange',
  })

  const submit = handleSubmit(async (data) => {
    try {
      await callLogin({
        email: data.username,
        password: data.password,
      })
      if (data.rememberMe) {
        localStorage.setItem('einvoice.rememberTaxCode', data.taxCode)
      } else {
        localStorage.removeItem('einvoice.rememberTaxCode')
      }
      notify.success('Đăng nhập thành công')
      onSuccess?.()
    } catch (error) {
      notify.error(getErrorMessage(error, 'Đăng nhập thất bại. Vui lòng thử lại.'))
    }
  })

  const brand = (
    <div className="flex items-center gap-3">
      <Logo size="md" showText={false} />
      <div className="min-w-0">
        <p className="m-0 text-sm font-semibold tracking-tight text-inherit">einvoice-sample</p>
        <p className="m-0 text-xs text-zinc-400">Hóa đơn điện tử</p>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-dvh">
      <div className="absolute right-5 top-5 z-10 flex items-center gap-2 text-sm font-medium text-slate-600">
        <span aria-hidden>🌐</span>
        <span>{locale}</span>
      </div>

      <AuthShell
        variant="login"
        title="Đăng nhập"
        description="Nhập thông tin doanh nghiệp và tài khoản để tiếp tục."
        submitLabel="Đăng nhập"
        logo={brand}
        isSubmitting={isSubmitting}
        onSubmit={submit}
        beforeSubmit={
          <div className="flex w-full items-center justify-between gap-3">
            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600/30"
                    checked={field.value}
                    onChange={(e) => field.onChange(e.target.checked)}
                    onBlur={field.onBlur}
                  />
                  Ghi nhớ
                </label>
              )}
            />
            <AccountAuthLink href={forgotHref} onClick={onForgotClick}>
              Quên mật khẩu?
            </AccountAuthLink>
          </div>
        }
        footer={
          <>
            Chưa có tài khoản?{' '}
            <AccountAuthLink href={registerHref} onClick={onRegisterClick}>
              Đăng ký
            </AccountAuthLink>
          </>
        }
      >
        <div>
          <Label htmlFor="login-tax-code" className="mb-1.5 block text-sm font-medium text-slate-700">
            Mã số thuế <span className="text-red-500">*</span>
          </Label>
          <InputText
            id="login-tax-code"
            autoComplete="organization"
            placeholder="0100000000"
            unstyled
            className={errors.taxCode ? inputInvalidClass : inputClass}
            {...register('taxCode')}
          />
          {errors.taxCode?.message && (
            <p className="mt-1.5 text-sm text-red-600">{errors.taxCode.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="login-username" className="mb-1.5 block text-sm font-medium text-slate-700">
            Tên đăng nhập <span className="text-red-500">*</span>
          </Label>
          <InputText
            id="login-username"
            autoComplete="username"
            placeholder="admin"
            unstyled
            className={errors.username ? inputInvalidClass : inputClass}
            {...register('username')}
          />
          {errors.username?.message && (
            <p className="mt-1.5 text-sm text-red-600">{errors.username.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="login-password" className="mb-1.5 block text-sm font-medium text-slate-700">
            Mật khẩu <span className="text-red-500">*</span>
          </Label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordInput
                id="login-password"
                autoComplete="current-password"
                placeholder="••••••••"
                invalid={Boolean(errors.password)}
                value={field.value ?? ''}
                onValueChange={(e: { value?: string | null }) => field.onChange(e.value ?? '')}
                onBlur={field.onBlur}
              />
            )}
          />
          {errors.password?.message && (
            <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* AUTH-BR-01: disabled khi thiếu trường bắt buộc — AuthShell submit luôn enabled; hint qua validation */}
        {!isValid && !isSubmitting && (
          <p className="m-0 text-xs text-slate-500">Điền đủ các trường bắt buộc để đăng nhập.</p>
        )}
      </AuthShell>
    </div>
  )
}
