// @ts-check
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Campaigns from './pages/Campaigns/index.jsx'
import App from './App.jsx'

import './index.css'

// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="campaigns" element={<Campaigns />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
