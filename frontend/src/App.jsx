// src/App.jsx

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CampaignsPage from './pages/Campaigns';
const RafflesPage = () => <h2>Сторінка Розіграшів (заглушка)</h2>

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/campaigns" element={<CampaignsPage />} />
      <Route path="/raffles" element={<RafflesPage />} />
    </Routes>
  )
}

export default App