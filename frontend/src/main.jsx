// @ts-check
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import CreateBank from './pages/Campaign/NewCampaign/index.jsx'
import Campaigns from './pages/Campaigns/index.jsx'
import RafflesPage from './pages/Raffles/index.js'
import App from './App.jsx'

import './index.css'

const queryClient = new QueryClient()

// @ts-ignore
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index element={<App />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="campaign">
            {/* TODO: Implement index route */}
            <Route path="new" element={<CreateBank />} />
          </Route>
          <Route path="raffles" element={<RafflesPage />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
