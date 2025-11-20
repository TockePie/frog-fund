import { Route, Routes, useLocation } from 'react-router'

import LoginModal from './components/AuthModal/login'
import CreateBank from './pages/Campaign/NewCampaign'
import OpenCampaign from './pages/Campaign/OpenCampaign'
import Campaigns from './pages/Campaigns'
import RafflesPage from './pages/Raffles'
import App from './App'

export default function AppRoutes() {
  const location = useLocation()
  const background = location.state?.background

  return (
    <>
      <Routes location={background || location}>
        <Route index element={<App />} />
        <Route path="campaigns" element={<Campaigns />} />
        <Route path="campaign">
          <Route path="new" element={<CreateBank />} />
          <Route path=":id" element={<OpenCampaign />} />
        </Route>
        <Route path="raffles" element={<RafflesPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/login" element={<LoginModal />} />
        </Routes>
      )}
    </>
  )
}
