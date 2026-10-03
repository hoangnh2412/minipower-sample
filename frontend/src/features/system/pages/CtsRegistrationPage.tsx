import { KitButton, SettingsFormPage } from '../../../app/ui'
import { ctsConfig } from '../configs'

export function CtsRegistrationPage() {
  return (
    <SettingsFormPage
      config={ctsConfig}
      headerPrefix={
        <KitButton label="Quét / Chọn chứng thư" icon="pi pi-search" variant="primary" size="md" />
      }
    />
  )
}
