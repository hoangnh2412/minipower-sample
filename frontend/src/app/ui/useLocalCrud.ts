import { useCallback, useMemo, useState } from 'react'
import { notify } from '@jarvis/core'

export function useLocalCrud<T extends { id: string }>(initialData: T[]) {
  const [items, setItems] = useState(initialData)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<T | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})

  const filteredItems = useMemo(() => {
    return items.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value.trim()) return true
        const cell = String(row[key as keyof T] ?? '').toLowerCase()
        return cell.includes(value.trim().toLowerCase())
      }),
    )
  }, [filters, items])

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )
  }, [])

  const toggleSelectAll = useCallback(
    (pageIds: string[]) => {
      const allSelected = pageIds.every((id) => selectedIds.includes(id))
      if (allSelected) {
        setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)))
      } else {
        setSelectedIds((prev) => [...new Set([...prev, ...pageIds])])
      }
    },
    [selectedIds],
  )

  const openCreate = useCallback(() => {
    setEditing(null)
    setDialogOpen(true)
  }, [])

  const openEdit = useCallback((row: T) => {
    setEditing(row)
    setDialogOpen(true)
  }, [])

  const closeDialog = useCallback(() => {
    setDialogOpen(false)
    setEditing(null)
  }, [])

  const saveRow = useCallback(
    (payload: T) => {
      setItems((prev) => {
        const exists = prev.some((x) => x.id === payload.id)
        if (exists) {
          return prev.map((x) => (x.id === payload.id ? payload : x))
        }
        return [payload, ...prev]
      })
      notify.success(editing ? 'Cập nhật thành công' : 'Tạo mới thành công')
      closeDialog()
    },
    [closeDialog, editing],
  )

  const deleteSelected = useCallback(() => {
    if (selectedIds.length === 0) {
      notify.error('Chọn ít nhất một bản ghi')
      return
    }
    setItems((prev) => prev.filter((x) => !selectedIds.includes(x.id)))
    setSelectedIds([])
    notify.success('Đã xóa bản ghi đã chọn')
  }, [selectedIds])

  const deleteById = useCallback((id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id))
    setSelectedIds((prev) => prev.filter((x) => x !== id))
    notify.success('Đã xóa bản ghi')
  }, [])

  const copySelected = useCallback(() => {
    if (selectedIds.length !== 1) {
      notify.error('Chọn một bản ghi để sao chép')
      return
    }
    const source = items.find((x) => x.id === selectedIds[0])
    if (!source) return
    const copy = {
      ...source,
      id: crypto.randomUUID(),
    } as T
    setItems((prev) => [copy, ...prev])
    notify.success('Đã sao chép bản ghi')
  }, [items, selectedIds])

  const reload = useCallback(() => {
    notify.success('Đã tải lại dữ liệu')
  }, [])

  const setFilter = useCallback((key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  return {
    items: filteredItems,
    allItems: items,
    selectedIds,
    dialogOpen,
    editing,
    filters,
    toggleSelect,
    toggleSelectAll,
    openCreate,
    openEdit,
    closeDialog,
    saveRow,
    deleteSelected,
    deleteById,
    copySelected,
    reload,
    setFilter,
    setSelectedIds,
  }
}
