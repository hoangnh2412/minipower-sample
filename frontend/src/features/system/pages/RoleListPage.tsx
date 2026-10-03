import { CrudListPage } from '../../../app/ui'
import { PERMISSION_GROUPS, roleConfig } from '../configs'
import { PermissionTree } from '../components/PermissionTree'

export function RoleListPage() {
  return (
    <CrudListPage
      config={roleConfig}
      renderFormExtra={<PermissionTree groups={PERMISSION_GROUPS} />}
      mapFormToRow={(values, editing) => ({
        id: editing?.id ?? crypto.randomUUID(),
        code: String(values.code ?? ''),
        name: String(values.name ?? ''),
        description: String(values.description ?? ''),
        userCount: editing?.userCount ?? '0',
      })}
    />
  )
}
