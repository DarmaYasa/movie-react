import { useEffect, useState } from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <>
      <header>
        <h1>Movies App</h1>
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
      </header>
      <main>
        {search}
        {children}
      </main>
    </>
  );
};

export default Layout;
