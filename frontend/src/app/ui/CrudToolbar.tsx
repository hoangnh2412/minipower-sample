import { KitButton } from './KitButton'
import type { ToolbarAction } from './types'

export type CrudToolbarProps = {
  onReload: () => void
  onCreate: () => void
  onEdit: () => void
  onDelete: () => void
  onCopy?: () => void
  showCopy?: boolean
  showExcel?: boolean
  extra?: ToolbarAction[]
  editDisabled?: boolean
  deleteDisabled?: boolean
}

/** Chỉ nút — đặt trong CompactPageHeader.actions */
export function CrudToolbarActions({
  onReload,
  onCreate,
  onEdit,
  onDelete,
  onCopy,
  showCopy = true,
  showExcel = true,
  extra = [],
  editDisabled,
  deleteDisabled,
}: CrudToolbarProps) {
  return (
    <>
      <KitButton label="Tải DL" outlined onClick={onReload} />
      <KitButton label="Tạo F4" icon="pi pi-plus" variant="primary" onClick={onCreate} />
      <KitButton
        label="Sửa F3"
        icon="pi pi-pencil"
        outlined
        disabled={editDisabled}
        onClick={onEdit}
      />
      <KitButton
        label="Xóa F8"
        icon="pi pi-trash"
        variant="danger"
        outlined
        disabled={deleteDisabled}
        onClick={onDelete}
      />
      {showCopy ? <KitButton label="Sao chép" outlined onClick={onCopy} /> : null}
      {showExcel ? (
        <>
          <KitButton label="Nhập Excel" outlined disabled />
          <KitButton label="Xuất Excel" outlined disabled />
        </>
      ) : null}
      {extra.map((action) => (
        <KitButton
          key={action.id}
          label={action.label}
          icon={action.icon}
          variant={
            action.severity === 'primary'
              ? 'primary'
              : action.severity === 'danger'
                ? 'danger'
                : 'secondary'
          }
          outlined={action.outlined ?? action.severity !== 'primary'}
          disabled={action.disabled}
          onClick={action.onClick}
        />
      ))}
    </>
  )
}

/** @deprecated Dùng CompactPageHeader + CrudToolbarActions */
export function CrudToolbar(props: CrudToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <CrudToolbarActions {...props} />
    </div>
  )
}
