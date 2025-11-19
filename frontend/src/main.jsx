// @ts-check
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'

import CreateBank from './pages/Campaign/NewCampaign/index.jsx'
import OpenCampaign from './pages/Campaign/OpenCampaign.jsx'
import Campaigns from './pages/Campaigns/index.jsx'
import RafflesPage from './pages/Raffles/index.js'
import App from './App.jsx'

import './index.css'

// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="campaign">
          {/* TODO: Implement index route */}
          <Route path="new" element={<CreateBank />} />
          <Route path=":id" element={<OpenCampaign />} />
        </Route>
        <Route path="raffles" element={<RafflesPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
