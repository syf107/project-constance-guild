import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

export default function HomeLayout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Outlet />
      </div>
    </>
  );
}
