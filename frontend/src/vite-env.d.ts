/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_API_PROXY_TARGET?: string
  readonly VITE_API_KEY?: string
  readonly VITE_API_KEY_NAME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
