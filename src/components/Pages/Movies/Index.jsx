import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import MovieCard from "../../MovieCard";
import { APIService } from "../../../services/api.service";

const MovieIndex = () => {
  const [movies, setMovies] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    await APIService.fetchMovies(currPage + 1)
      .then((data) => setMovies((prev) => [...prev, ...data]))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setCurrPage(currPage + 1);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await APIService.fetchMovies()
        .then((data) => setMovies(data))
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
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
        <div className="movies-wrapper">
          {movies?.map((movie) => (
            <MovieCard
              posterPath={movie.poster_path}
              title={movie.title}
              overview={movie.overview}
              id={movie.id}
              type="movies"
            />
          ))}
        </div>

        <button
          className="btn-load-more"
          type="button"
          onClick={() => loadMore()}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button>
      </div>
    </Layout>
  );
};

export default MovieIndex;
