// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/Home'
import CampaignsPage from './pages/Campaigns'
import CreateBank from './pages/CreateBank' 

const RafflesPage = () => <h2>Сторінка Розіграшів (заглушка)</h2>

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/raffles" element={<RafflesPage />} />

      {/* Сторінка створення нової банки */}
      <Route path="/new-bank" element={<CreateBank />} />
    </Routes>
  )
}

export default App
