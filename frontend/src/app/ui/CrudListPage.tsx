import { useEffect, useMemo } from 'react'
import { ListPagination, RowActions, useListPagination } from '@jarvis/core'
import type { RowActionItem } from '@jarvis/core'
import { CompactPageHeader } from './CompactPageHeader'
import { CrudToolbarActions } from './CrudToolbar'
import { EntityFormDialog } from './EntityFormDialog'
import { useLocalCrud } from './useLocalCrud'
import type { CrudConfig } from './types'
import { inputClass } from './fieldStyles'
import { footerBarClass, footerPaginationClass, pageStackClass, tableWrapClass } from './layout'

type CrudListPageProps<T extends Record<string, unknown> & { id: string }> = {
  config: CrudConfig<T>
  renderFormExtra?: React.ReactNode
  mapFormToRow?: (
    values: Record<string, string | number | boolean>,
    editing: T | null,
  ) => T
}

function rowToFormValues<T extends Record<string, unknown>>(
  row: T,
  fields: CrudConfig<T>['formFields'],
) {
  const values: Record<string, string | number | boolean> = {}
  for (const field of fields) {
    values[field.name] = String(row[field.name as keyof T] ?? '')
  }
  return values
}

export function CrudListPage<T extends Record<string, unknown> & { id: string }>({
  config,
  renderFormExtra,
  mapFormToRow,
}: CrudListPageProps<T>) {
  const crud = useLocalCrud(config.initialData)
  const pagination = useListPagination({ total: crud.items.length, initialSize: 50 })

  const pagedRows = useMemo(() => {
    const start = (pagination.page - 1) * pagination.size
    return crud.items.slice(start, start + pagination.size)
  }, [crud.items, pagination.page, pagination.size])

  const pageIds = pagedRows.map((r) => r.id)
  const allPageSelected = pageIds.length > 0 && pageIds.every((id) => crud.selectedIds.includes(id))

  const handleEditSelected = () => {
    if (crud.selectedIds.length !== 1) return
    const row = crud.allItems.find((x) => x.id === crud.selectedIds[0])
    if (row) crud.openEdit(row)
  }

  const handleSave = (values: Record<string, string | number | boolean>) => {
    const row =
      mapFormToRow?.(values, crud.editing) ??
      ({
        ...(crud.editing ?? config.getEmptyRow()),
        ...values,
        id: crud.editing?.id ?? crypto.randomUUID(),
      } as T)
    crud.saveRow(row)
  }

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F4') {
        e.preventDefault()
        crud.openCreate()
      }
      if (e.key === 'F3') {
        e.preventDefault()
        handleEditSelected()
      }
      if (e.key === 'F8') {
        e.preventDefault()
        crud.deleteSelected()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  })

  const dialogTitle = crud.editing
    ? `Sửa ${config.entityName}`
    : `Tạo mới ${config.entityName}`

  const formInitial = crud.editing
    ? rowToFormValues(crud.editing, config.formFields)
    : rowToFormValues(config.getEmptyRow(), config.formFields)

  const toolbarProps = {
    onReload: crud.reload,
    onCreate: crud.openCreate,
    onEdit: handleEditSelected,
    onDelete: crud.deleteSelected,
    onCopy: config.showCopy === false ? undefined : crud.copySelected,
    showCopy: config.showCopy !== false,
    showExcel: config.showExcel !== false,
    extra: config.toolbarExtra,
    editDisabled: crud.selectedIds.length !== 1,
    deleteDisabled: crud.selectedIds.length === 0,
  }

  return (
    <div className={pageStackClass}>
      <CompactPageHeader
        title={config.title}
        actions={<CrudToolbarActions {...toolbarProps} />}
      />

      <div className={tableWrapClass}>
        <table className="w-full min-w-[960px] border-collapse text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50/90">
            <tr>
              <th className="w-8 px-2 py-1.5">
                <input
                  type="checkbox"
                  className="size-3.5 rounded border-slate-300"
                  checked={allPageSelected}
                  onChange={() => crud.toggleSelectAll(pageIds)}
                  aria-label="Chọn tất cả"
                />
              </th>
              <th className="w-8 px-2 py-1.5 text-xs font-medium text-slate-600">#</th>
              {config.columns.map((col) => (
                <th
                  key={col.key}
                  className="px-2 py-1.5 text-xs font-medium text-slate-600"
                  style={{ width: col.width, textAlign: col.align ?? 'left' }}
                >
                  {col.header}
                </th>
              ))}
              <th className="px-2 py-1.5 text-xs font-medium text-slate-600">Thao tác</th>
            </tr>
            <tr className="border-b border-slate-100 bg-white">
              <th colSpan={2} />
              {config.columns.map((col) => (
                <th key={`filter-${col.key}`} className="px-2 py-1">
                  {col.filterable !== false ? (
                    <input
                      className={`${inputClass} h-7 text-xs`}
                      placeholder="Lọc…"
                      value={crud.filters[col.key] ?? ''}
                      onChange={(e) => crud.setFilter(col.key, e.target.value)}
                    />
                  ) : null}
                </th>
              ))}
              <th />
            </tr>
          </thead>
          <tbody>
            {pagedRows.map((row, index) => {
              const actions: RowActionItem[] = [
                {
                  id: 'edit',
                  label: 'Sửa F3',
                  onClick: () => crud.openEdit(row),
                },
                {
                  id: 'delete',
                  label: 'Xóa',
                  danger: true,
                  onClick: () => crud.deleteById(row.id),
                },
              ]
              return (
                <tr key={row.id} className="border-b border-slate-100 hover:bg-teal-50/30">
                  <td className="px-2 py-1.5">
                    <input
                      type="checkbox"
                      className="size-3.5 rounded border-slate-300"
                      checked={crud.selectedIds.includes(row.id)}
                      onChange={() => crud.toggleSelect(row.id)}
                      aria-label={`Chọn ${row.id}`}
                    />
                  </td>
                  <td className="px-2 py-1.5 text-xs text-slate-500">
                    {(pagination.page - 1) * pagination.size + index + 1}
                  </td>
                  {config.columns.map((col) => (
                    <td
                      key={col.key}
                      className="px-2 py-1.5 text-sm"
                      style={{ textAlign: col.align ?? 'left' }}
                    >
                      {col.render
                        ? col.render(row)
                        : String(row[col.key as keyof T] ?? '—')}
                    </td>
                  ))}
                  <td className="px-2 py-1.5">
                    <RowActions actions={actions} />
                  </td>
                </tr>
              )
            })}
            {pagedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={config.columns.length + 3}
                  className="px-2 py-8 text-center text-sm text-slate-500"
                >
                  Không có bản ghi
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className={footerBarClass}>
        <ListPagination
          className={footerPaginationClass}
          total={crud.items.length}
          page={pagination.page}
          size={pagination.size}
          pageInput={pagination.pageInput}
          totalPages={pagination.totalPages}
          onPageChange={pagination.setPage}
          onSizeChange={pagination.setSize}
          onPageInputChange={pagination.setPageInput}
          onCommitPageInput={pagination.commitPageInput}
        />
      </div>

      <EntityFormDialog
        open={crud.dialogOpen}
        title={dialogTitle}
        fields={config.formFields}
        initialValues={formInitial}
        size={config.dialogSize ?? 'lg'}
        onClose={crud.closeDialog}
        onSave={handleSave}
      >
        {renderFormExtra}
      </EntityFormDialog>
    </div>
  )
}
