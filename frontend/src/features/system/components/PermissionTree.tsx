import { useState } from 'react'

type PermissionTreeProps = {
  groups: Array<{ id: string; label: string }>
  value?: string[]
  onChange?: (value: string[]) => void
}

export function PermissionTree({ groups, value = [], onChange }: PermissionTreeProps) {
  const [selected, setSelected] = useState<string[]>(value)

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((x) => x !== id)
      : [...selected, id]
    setSelected(next)
    onChange?.(next)
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 md:col-span-2">
      <p className="mb-3 text-sm font-semibold text-slate-800">Quyền chức năng</p>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {groups.map((group) => (
          <label
            key={group.id}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-2 py-1.5 text-sm text-slate-700 hover:bg-white"
          >
            <input
              type="checkbox"
              className="size-4 rounded border-slate-300 text-teal-700"
              checked={selected.includes(group.id)}
              onChange={() => toggle(group.id)}
            />
            {group.label}
          </label>
        ))}
      </div>
    </div>
  )
}
