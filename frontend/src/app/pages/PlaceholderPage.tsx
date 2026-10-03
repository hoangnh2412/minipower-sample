import { PageHeader } from '@jarvis/core'

type PlaceholderPageProps = {
  title: string
  description?: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <PageHeader
      title={title}
      description={
        description ??
        'Màn hình đang được triển khai theo DOC-19 — sẽ nối API backend ở bước tiếp theo.'
      }
    />
  )
}
