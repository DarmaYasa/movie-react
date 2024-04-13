import { useCallback, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "./Home.css";
import MovieCard from "../MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error("error:" + err));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Layout>
      <div className="movies-wrapper">
        {movies?.map((movie) => (
          <MovieCard
            posterPath={movie.poster_path}
            title={movie.title}
            overview={movie.overview}
          />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;
