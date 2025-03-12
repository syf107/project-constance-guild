import { Link } from "react-router";

const navbarStyling =
  "hover:text-amber-300 hover:bg-amber-700 px-4 py-2 transition-colors duration-200";

function Navbar() {
  return (
    <nav className="bg-amber-400 text-amber-700 p-2 border-b-4">
      <div className="container mx-auto flex justify-center p-3">
        <ul className="flex space-x-6 text-xl">
          <li>
            <Link to="/" className={navbarStyling}>
              Home 🏚️
            </Link>
          </li>
          <li>
            <Link to="/history" className={navbarStyling}>
              History 📜🖋️
            </Link>
          </li>
          <li>
            <Link to="/leaderboard" className={navbarStyling}>
              Guild Members 👨👩
            </Link>
          </li>
          <li>
            <Link to="/quests" className={navbarStyling}>
              Quests 🗡️🛡️
            </Link>
          </li>
          <li>
            <Link to="/register" className={navbarStyling}>
              Join Us 🔒🔑
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
