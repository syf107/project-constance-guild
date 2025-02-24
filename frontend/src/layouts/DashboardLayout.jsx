import { Outlet } from "react-router";
import DashboardNavbar from "../components/DashboardNavbar";

function DashboardLayout() {
  return (
    <div>
      <DashboardNavbar />
      <div className="container mx-auto p-4">
        <Outlet /> {/* Renders nested routes */}
      </div>
    </div>
  );
}

export default DashboardLayout;
