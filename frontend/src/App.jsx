// src/App.jsx

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
