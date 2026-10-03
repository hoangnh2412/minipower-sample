import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PrimeReactProvider } from '@primereact/core'
import { Toaster, kitPrimeReactConfig } from '@jarvis/core'
import App from './App'
import { configureAppHttp } from './app/http'
import './index.css'

configureAppHttp()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PrimeReactProvider {...kitPrimeReactConfig}>
        <App />
        <Toaster />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>,
)
