import { Outlet } from "react-router";
import DashboardNavbar from "../components/DashboardNavbar";
import Footer from "../components/Footer";

function DashboardLayout() {
  return (
    <main>
      <DashboardNavbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default DashboardLayout;
