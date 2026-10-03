/** Mock tra MST — INV-BR-04 (demo; wire CQT sau) */

const MST_REGEX = /^\d{10}(-\d{3})?$/

const DEMO_BUYERS: Record<string, { name: string; address: string }> = {
  '0100000000': { name: 'CÔNG TY DEMO', address: 'Hà Nội' },
  '0100000001': { name: 'KHÁCH HÀNG A', address: 'TP. Hồ Chí Minh' },
  '0100000002': { name: 'KHÁCH HÀNG B', address: 'Đà Nẵng' },
}

export type MstLookupResult =
  | { ok: true; name: string; address: string; source: 'catalog' | 'cqt' }
  | { ok: false; code: string; message: string; allowManual?: boolean }

export function validateMstFormat(mst: string): MstLookupResult | null {
  const trimmed = mst.trim()
  if (!trimmed) return null
  if (!MST_REGEX.test(trimmed)) {
    return {
      ok: false,
      code: 'INV-VAL-001',
      message: 'Mã số thuế phải có 10 hoặc 13 chữ số',
    }
  }
  return null
}

export async function lookupBuyerByMst(mst: string): Promise<MstLookupResult> {
  const formatError = validateMstFormat(mst)
  if (formatError) return formatError

  const trimmed = mst.trim()
  await new Promise((r) => window.setTimeout(r, 300))

  const cached = DEMO_BUYERS[trimmed.slice(0, 10)]
  if (cached) {
    return { ok: true, ...cached, source: trimmed in DEMO_BUYERS ? 'catalog' : 'cqt' }
  }

  return {
    ok: false,
    code: 'CQT-ERR-102',
    message: 'Không tìm thấy MST trên CQT',
    allowManual: true,
  }
}
