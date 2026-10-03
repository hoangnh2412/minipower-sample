import { CrudListPage } from '../../../app/ui'
import { nd70Config } from '../configs'

export function Nd70DeclarationPage() {
  return (
    <CrudListPage
      config={nd70Config}
      mapFormToRow={(values, editing) => ({
        id: editing?.id ?? crypto.randomUUID(),
        declarationType: String(values.declarationType ?? ''),
        createdDate: String(values.createdDate ?? ''),
        cqtStatus: editing?.cqtStatus ?? 'Nháp',
        cqtCode: editing?.cqtCode ?? '',
      })}
    />
  )
}
