import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import History from "../pages/History";
import GuildMembers from "../pages/GuildMembers";
import Quests from "../pages/Quests";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import DashboardMembers from "../pages/DashboardMembers";
import DashboardQuests from "../pages/DashboardQuests";
import DashboardParty from "../pages/DashboardParty";
import HomeLayout from "../layouts/HomeLayout";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index element={<Home />} />
        <Route path="history" element={<History />} />
        <Route path="members" element={<GuildMembers />} />
        <Route path="quests" element={<Quests />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="party" element={<DashboardParty />} />
        <Route path="members" element={<DashboardMembers />} />
        <Route path="quests" element={<DashboardQuests />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
