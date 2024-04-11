import { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import "./Home.css";
import MovieCard from "../MovieCard";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const apiKey =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMTA2ZjA1NmY1N2IwOWE0YjNlMjJkZDk5NzQyMWFjMyIsInN1YiI6IjVkODhjN2ZmYjc2Y2JiMDAxZmU0NTM0ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gYhpRjxbqfXaXbuxKgPkvw9gcpOMfZU6U7cevl9ol7Y";

  const url =
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  useEffect(() => {
    fetch(url, options)
      .then((res) => res.json())
      .then((json) => setMovies(json.results))
      .catch((err) => console.error("error:" + err));
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
