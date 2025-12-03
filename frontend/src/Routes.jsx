import { Route, Routes, useLocation } from "react-router";

import LoginModal from "./components/AuthModal/login";
import CreateBank from "./pages/Campaign/NewCampaign";
import OpenCampaign from "./pages/Campaign/OpenCampaign";
import WinnerPage from "./pages/Campaign/Winner";
import CampaignsPage from "./pages/Campaigns";
import NotificationsPage from "./pages/Notifications"; // ⭐ НОВЕ
import RafflesPage from "./pages/Raffles";
import App from "./App";

export default function AppRoutes() {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<App />} />
        <Route path="/campaigns" element={<CampaignsPage />} />

        <Route path="/campaign">
          <Route path="new" element={<CreateBank />} />
          <Route path=":id" element={<OpenCampaign />} />
        </Route>

        <Route path="/raffles" element={<RafflesPage />} />

        {/* сторінка переможця */}
        <Route path="/campaigns/:id/winner" element={<WinnerPage />} />

        {/* ⭐ НОВА СТОРІНКА СПОВІЩЕНЬ */}
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
