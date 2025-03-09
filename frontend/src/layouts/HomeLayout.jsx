import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <main className="border-4 border-amber-700 container mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
