import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="bg-amber-400 text-amber-700 p-2 border-b-4">
      <div className="container mx-auto flex justify-center p-3">
        <ul className="flex space-x-6 text-xl ">
          <li>
            <Link
              to="/"
              className="hover:text-amber-300 hover:bg-amber-700 px-4 py-2"
            >
              🏚️ Home
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="hover:text-amber-300 hover:bg-amber-700 px-4 py-2"
            >
              📜 History
            </Link>
          </li>
          <li>
            <Link
              to="/leaderboard"
              className="hover:text-amber-300 hover:bg-amber-700 px-4 py-2"
            >
              🏆 Leaderboard
            </Link>
          </li>
          <li>
            <Link
              to="/quests"
              className="hover:text-amber-300 hover:bg-amber-700 px-4 py-2"
            >
              🛡️ Quests
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="hover:text-amber-300 hover:bg-amber-700 px-4 py-2"
            >
              🗝️ Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
