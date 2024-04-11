import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <h1>Movies App</h1>
        <nav>
          <a href="/movies">Movies</a>
          <a href="/tv-shows">TV Shows</a>
        </nav>
        <input type="text" name="search" />
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;
