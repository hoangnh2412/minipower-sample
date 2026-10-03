import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Button } from 'primereact/button'
import {
  btnDangerClass,
  btnDangerOutlinedClass,
  btnOutlinedClass,
  btnPrimaryClass,
  btnSizeMd,
  btnSizeSm,
  btnSpecialClass,
  btnTextClass,
} from './fieldStyles'

export type KitButtonVariant = 'primary' | 'secondary' | 'danger' | 'text' | 'special'

export type KitButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  label?: string
  children?: ReactNode
  icon?: string
  variant?: KitButtonVariant
  outlined?: boolean
  size?: 'sm' | 'md'
  loading?: boolean
}

function resolveButtonClass(variant: KitButtonVariant, outlined: boolean, size: 'sm' | 'md') {
  const sizeClass = size === 'sm' ? btnSizeSm : btnSizeMd
  let tone = btnOutlinedClass
  if (variant === 'primary') tone = btnPrimaryClass
  else if (variant === 'special') tone = btnSpecialClass
  else if (variant === 'danger') tone = outlined ? btnDangerOutlinedClass : btnDangerClass
  else if (variant === 'text') tone = btnTextClass
  else if (outlined) tone = btnOutlinedClass
  return [tone, sizeClass].join(' ')
}

/** Wrapper PrimeReact 11 — hiển thị label/icon qua children, không dùng API PR10. */
export function KitButton({
  label,
  children,
  icon,
  variant = 'secondary',
  outlined = false,
  size = 'sm',
  loading = false,
  disabled,
  className = '',
  type = 'button',
  ...rest
}: KitButtonProps) {
  const content = children ?? label
  return (
    <Button
      type={type}
      unstyled
      disabled={disabled || loading}
      className={[resolveButtonClass(variant, outlined, size), className].filter(Boolean).join(' ')}
      {...rest}
    >
      {icon ? <i className={[icon, 'text-[0.85em]'].join(' ')} aria-hidden /> : null}
      {loading ? 'Đang xử lý…' : content}
    </Button>
  )
}
