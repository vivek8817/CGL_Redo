import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'iconify-icon';
import { BrowserRouter } from 'react-router' // 1. Import wrapper
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>

    <App />

    </BrowserRouter>
  </StrictMode>
)
