import { BrowserRouter } from "react-router";
import Navbar from "./components/Navbar";
import AppRouter from "./routes/Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container mx-auto p-4">
          <AppRouter />
        </div>
        <h1 className="text-red-700 text-3xl">Just a freaking applications.</h1>
        <h1>Just a freaking applications.</h1>
      </BrowserRouter>
    </>
  );
}

export default App;
