import { useState } from 'react'
import { Popover } from 'primereact/popover'
import { btnOutlinedClass, btnSizeSm } from './fieldStyles'

export type FunctionMenuItem = {
  id: string
  label: string
  onClick?: () => void
  disabled?: boolean
  separatorBefore?: boolean
}

type FunctionMenuButtonProps = {
  label?: string
  items: FunctionMenuItem[]
}

const triggerClass = [btnOutlinedClass, btnSizeSm].join(' ')

const itemClass =
  'flex w-full items-center border-0 bg-transparent px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'

export function FunctionMenuButton({ label = 'Chức năng', items }: FunctionMenuButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <Popover.Root open={open} onOpenChange={(e: { value?: boolean }) => setOpen(Boolean(e.value))}>
      <Popover.Trigger type="button" className={triggerClass}>
        {label} ▾
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner className="z-[200]" side="bottom" align="end" sideOffset={4}>
          <Popover.Popup className="min-w-[12rem] overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            {items.map((item) => (
              <span key={item.id} className="contents">
                {item.separatorBefore ? (
                  <div className="my-1 border-t border-slate-100" role="separator" />
                ) : null}
                <button
                  type="button"
                  className={itemClass}
                  disabled={item.disabled}
                  onClick={() => {
                    if (item.disabled) return
                    item.onClick?.()
                    setOpen(false)
                  }}
                >
                  {item.label}
                </button>
              </span>
            ))}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
