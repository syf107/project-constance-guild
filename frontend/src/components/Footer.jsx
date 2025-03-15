import { Link } from "react-router";

function Footer() {
  return (
    <footer className="mt-auto bg-amber-400 text-amber-700 py-2 px-4 border-t-4 border-amber-700">
      <section className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-amber-800">Constance Guild</h2>
        <p>Forged in unity, standing strong for centuries.</p>
      </section>

      <div className="flex justify-between items-end">
        <p className="text-sm">
          &copy; 2025 Constance Guild. All rights reserved.
        </p>
        <nav aria-label="Footer Navigation">
          <ul className="flex gap-4 font-bold text-amber-800">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/history">History</Link>
            </li>
            <li>
              <Link to="/leaderboard">Leaderboard</Link>
            </li>
            <li>
              <Link to="/quests">Quests</Link>
            </li>
            <li>
              <Link to="/register">Join Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
