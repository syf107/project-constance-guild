import { Routes, Route } from "react-router";
import Home from "../pages/Home";
import About from "../pages/About";
import Leaderboard from "../pages/Leaderboard";
import Quests from "../pages/Quests";
import Register from "../pages/Register";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/quests" element={<Quests />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AppRouter;
