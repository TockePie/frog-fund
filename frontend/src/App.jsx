// src/App.jsx

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home/index.jsx'
import CampaignsPage from './pages/Campaigns/index.jsx'
// НЕ ПОТРІБНО: import RegisterPage from './pages/Register/index.jsx';

const RafflesPage = () => <h2>Сторінка Розіграшів (заглушка)</h2>

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* НЕ ПОТРІБНО: <Route path="/register" element={<RegisterPage />} /> */}
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/raffles" element={<RafflesPage />} />
    </Routes>
  )
}

export default App