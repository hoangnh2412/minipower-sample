import { notify } from '@jarvis/core'

/** Format lỗi/thành công theo DOC-20 §9 — `[code] message` */
export function formatNotifyMessage(code: string, message: string) {
  return `[${code}] ${message}`
}

export function notifyError(code: string, message: string) {
  notify.error(formatNotifyMessage(code, message))
}

export function notifySuccess(code: string, message: string) {
  notify.success(formatNotifyMessage(code, message))
}
