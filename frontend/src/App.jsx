import { BrowserRouter, useLocation } from "react-router";
import AppRouter from "./routes/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="bg-amber-500 w-full mx-auto font-serif">
          <p className="bg-amber-500 text-black text-3xl font-bold text-center py-4">
            ⚔️ Constance Guild ⚔️
          </p>
          <AppRouter />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
