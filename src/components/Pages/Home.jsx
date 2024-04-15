import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "./Home.css";
import MovieCard from "../MovieCard";
import { APIService } from "../../services/api.service";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTVShows] = useState([]);
  const [isLoading, setIsLoading] = useState({
    movies: false,
    tvShows: false,
  });

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => ({
        ...prev,
        movies: !prev.movies,
      }));
      await APIService.fetchMovies()
        .then((data) => setMovies(data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading((prev) => ({
            ...prev,
            movies: !prev.movies,
          }));
        });
    })();

    (async () => {
      setIsLoading((prev) => ({
        ...prev,
        tvShows: !prev.tvShows,
      }));
      await APIService.fetchTVShows()
        .then((data) => setTVShows(data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading((prev) => ({
            ...prev,
            tvShows: !prev.tvShows,
          }));
        });
    })();
  }, []);

  return (
    <Layout>
      <div
        className="container mx-auto"
        style={{
          padding: "10px 30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>Movies</h1>
          <Link to="/movies">View More</Link>
        </div>
        <div className="movies-wrapper">
          {isLoading.movies ? (
            <span>Loading....</span>
          ) : (
            movies?.map((movie) => (
              <MovieCard
                posterPath={movie.poster_path}
                title={movie.title}
                overview={movie.overview}
                id={movie.id}
              />
            ))
          )}
        </div>
      </div>
      <div
        className="container mx-auto"
        style={{
          padding: "10px 30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1>TV Shows</h1>
          <Link to="/tv-shows">View More</Link>
        </div>
        <div className="movies-wrapper">
          {isLoading.tvShows ? (
            <span>Loading....</span>
          ) : (
            tvShows?.map((tvShow) => (
              <MovieCard
                posterPath={tvShow.poster_path}
                title={tvShow.title}
                overview={tvShow.overview}
                id={tvShow.id}
              />
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
