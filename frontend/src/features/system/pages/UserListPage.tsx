import { CrudListPage } from '../../../app/ui'
import { userConfig } from '../configs'

export function UserListPage() {
  return (
    <CrudListPage
      config={userConfig}
      mapFormToRow={(values, editing) => ({
        id: editing?.id ?? crypto.randomUUID(),
        username: String(values.username ?? ''),
        fullName: String(values.fullName ?? ''),
        email: String(values.email ?? ''),
        roleName: String(values.roleName ?? ''),
        status: String(values.status ?? 'Hoạt động'),
      })}
    />
  )
}
