import { Route, Routes, useLocation } from "react-router";

import LoginModal from "./components/AuthModal/login";
import CreateBank from "./pages/Campaign/NewCampaign";
import OpenCampaign from "./pages/Campaign/OpenCampaign";
import WinnerPage from "./pages/Campaign/Winner";
import CampaignsPage from "./pages/Campaigns";
import NotificationsPage from "./pages/Notifications";
import RafflesPage from "./pages/Raffles";
import App from "./App";

export default function AppRoutes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        
        <Route path="/" element={<App />} />

        {/* Список зборів */}
        <Route path="/campaigns" element={<CampaignsPage />} />

        {/* Новий збір */}
        <Route path="/campaign/new" element={<CreateBank />} />

        {/* Відкритий збір */}
        <Route path="/campaign/:id" element={<OpenCampaign />} />

        {/* Переможець */}
        <Route path="/campaign/:id/winner" element={<WinnerPage />} />

        {/* Розіграші */}
        <Route path="/raffles" element={<RafflesPage />} />

        {/* Сповіщення */}
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>

      {background && (
        <Routes>
          <Route path="/login" element={<LoginModal />} />
        </Routes>
      )}
    </>
  );
}
