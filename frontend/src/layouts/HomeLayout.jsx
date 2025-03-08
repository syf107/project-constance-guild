import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <main className="container mx-auto">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}
