import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <span className="text-lg font-bold">MyApp</span>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-400">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-400">
              About
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-gray-400">
              Leaderboard
            </Link>
          </li>
          <li>
            <Link to="/quests" className="hover:text-gray-400">
              Quests
            </Link>
          </li>
          <li>
            <Link to="/register" className="hover:text-gray-400">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
