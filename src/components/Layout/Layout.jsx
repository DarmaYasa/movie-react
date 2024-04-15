import { useEffect, useMemo, useState } from "react";
import "./Layout.css";
import { Link } from "react-router-dom";
import { APIService } from "../../services/api.service";
import { useDebounce } from "@uidotdev/usehooks";

const Layout = ({ children }) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState({
    movies: [],
    tvShows: [],
  });
  const debounceSearch = useDebounce(search, 300);
  const allResults = useMemo(() => {
    return [
      ...results.movies.map((item) => ({
        ...item,
        type: "movies",
        title: item.title,
      })),
      ...results.tvShows.map((item) => ({
        ...item,
        type: "tv-shows",
        title: item.name,
      })),
    ].sort((a, b) => a.title.localeCompare(b.title));
  }, [results]);

  useEffect(() => {
    (async () => {
      await APIService.searchMovies(debounceSearch).then((res) =>
        setResults((prev) => ({
          ...prev,
          movies: [...res.results],
        }))
      );
    })();
    (async () => {
      await APIService.searchTVShows(debounceSearch).then((res) =>
        setResults((prev) => ({
          ...prev,
          tvShows: [...res.results],
        }))
      );
    })();
  }, [debounceSearch]);

  return (
    <>
      <header>
        <div
          className="container mx-auto"
          style={{
            padding: "10px 30px",
          }}
        >
          <div className="header">
            <Link to="/">
              <h1>Movies App</h1>
            </Link>
            <nav>
              <a href="/movies">Movies</a>
              <a href="/tv-shows">TV Shows</a>
            </nav>

            <a href="/contact">Contact</a>
          </div>

          <div style={{ position: "relative" }}>
            <input
              type="text"
              name="search"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value)}
              onBlur={() => {
                setTimeout(() => setResults({ movies: [], tvShows: [] }), 200);
              }}
              value={search}
            />
            {results.movies.length + results.tvShows.length > 0 && (
              <div className="search-results-wrapper">
                {allResults?.map((item) => (
                  <Link key={item.id} to={`/${item.type}/${item.id}`}>
                    {item.title}{" "}
                    <i>({item.type === "movies" ? "Movies" : "TV Shows"})</i>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer>React + MovieDB API</footer>
    </>
  );
};

export default Layout;
