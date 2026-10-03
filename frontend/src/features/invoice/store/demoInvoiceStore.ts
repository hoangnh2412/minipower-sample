import { createDemoInvoiceRows, DEMO_SEED_VERSION } from '../../../app/mock/seedData'
import type { InvoiceRow } from '../types'

const STORAGE_KEY = `einvoice-demo-invoices-v${DEMO_SEED_VERSION}`

export function loadDemoInvoices(): InvoiceRow[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as InvoiceRow[]
  } catch {
    /* ignore */
  }
  return createDemoInvoiceRows()
}

export function saveDemoInvoices(rows: InvoiceRow[]) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

export function getDemoInvoiceById(id: string): InvoiceRow | undefined {
  return loadDemoInvoices().find((r) => r.id === id)
}

export function upsertDemoInvoice(row: InvoiceRow, isEdit: boolean) {
  const rows = loadDemoInvoices()
  if (isEdit) {
    saveDemoInvoices(rows.map((r) => (r.id === row.id ? row : r)))
  } else {
    saveDemoInvoices([{ ...row, id: row.id || crypto.randomUUID() }, ...rows])
  }
}

export function deleteDemoInvoices(ids: string[]) {
  const idSet = new Set(ids)
  saveDemoInvoices(loadDemoInvoices().filter((r) => !idSet.has(r.id)))
}
