import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Leaderboard from "../pages/Leaderboard";
import Quests from "../pages/Quests";
import Register from "../pages/Register";
import Login from "../pages/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome";
import DashboardMembers from "../pages/DashboardMembers";
import DashboardQuests from "../pages/DashboardQuests";
import DashboardParty from "../pages/DashboardParty";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/quests" element={<Quests />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

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
