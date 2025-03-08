import { Link } from "react-router";

function DashboardNavbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/dashboard/party" className="hover:text-gray-400">
            Raiding Party
          </Link>
        </li>
        <li>
          <Link to="/dashboard/quests" className="hover:text-gray-400">
            List of Quest
          </Link>
        </li>
        <li>
          <Link to="/dashboard/members" className="hover:text-gray-400">
            Guild Members
          </Link>
        </li>
        <li>
          <Link to="/logout" className="hover:text-gray-400">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default DashboardNavbar;
