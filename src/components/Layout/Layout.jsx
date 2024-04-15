import { useEffect, useState } from "react";
import "./Layout.css";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <header>
        <div className="container mx-auto">
          <div className="header">
            <Link to="/">
              <h1>Movies App</h1>
            </Link>
            <nav>
              <a href="/movies">Movies</a>
              <a href="/tv-shows">TV Shows</a>
            </nav>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>
      </header>
      <main>
        {search}
        {children}
      </main>
    </>
  );
};

export default Layout;
