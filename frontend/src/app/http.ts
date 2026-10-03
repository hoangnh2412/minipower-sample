import { configureJarvisHttp } from '@jarvis/core'

/** Gọi MỘT lần ở main.tsx, trước render. Mọi feature dùng chung axios instance này. */
export function configureAppHttp() {
  configureJarvisHttp({
    baseURL: import.meta.env.VITE_API_URL,
    apiKey: import.meta.env.VITE_API_KEY,
    apiKeyHeader: import.meta.env.VITE_API_KEY_NAME,
  })
}
