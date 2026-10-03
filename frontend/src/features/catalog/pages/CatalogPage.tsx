import { CrudListPage } from '../../../app/ui'
import type { CrudConfig } from '../../../app/ui'

type CatalogPageProps<T extends Record<string, unknown> & { id: string }> = {
  config: CrudConfig<T>
}

export function CatalogPage<T extends Record<string, unknown> & { id: string }>({
  config,
}: CatalogPageProps<T>) {
  return <CrudListPage config={config} />
}
