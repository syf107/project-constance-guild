import { BrowserRouter, useLocation } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AppRouter from "./routes/Router";

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname.startsWith("/dashboard");

  return <> {!hideNavbar && <HomeLayout />}</>;
}
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="container mx-auto p-4">
          <Layout />
          <AppRouter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
