import { useCallback, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "./Home.css";
import MovieCard from "../MovieCard";
import { APIService } from "../../services/api.service";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
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
  }, []);

  return (
    <Layout>
      <div
        className="container mx-auto"
        style={{
          padding: "10px 30px",
        }}
      >
        <h1>Movies</h1>
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
    </Layout>
  );
};

export default HomePage;
