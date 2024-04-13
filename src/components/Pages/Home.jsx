import { useCallback, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "./Home.css";
import MovieCard from "../MovieCard";
import { APIService } from "../../services/api.service";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
        await APIService.fetchMovies()
            .then(data => setMovies(data))
            .catch(err => {
                console.log(err);
            });
    })()
  }, []);

  return (
    <Layout>
      <div className="movies-wrapper container mx-auto">
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
