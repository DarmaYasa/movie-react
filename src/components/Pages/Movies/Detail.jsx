import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIService } from "../../../services/api.service";
import "./Detail.css";
import Layout from "../../Layout/Layout";

const MovieDetailPage = () => {
  const { id } = useParams();

  const exampleJSON = {
    adult: false,
    backdrop_path: "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    belongs_to_collection: {
      id: 726871,
      name: "Dune Collection",
      poster_path: "/wcVafar6Efk3YgFvh8oZQ4yHL6H.jpg",
      backdrop_path: "/ygVSGv86R0BTOKJIb8RQ1sFxs4q.jpg",
    },
    budget: 190000000,
    genres: [
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 12,
        name: "Adventure",
      },
    ],
    homepage: "https://www.dunemovie.com",
    id: 693134,
    imdb_id: "tt15239678",
    original_language: "en",
    original_title: "Dune: Part Two",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    popularity: 4742.163,
    poster_path: "/czembW0Rk1Ke7lCJGahbOhdCuhV.jpg",
    production_companies: [
      {
        id: 923,
        logo_path: "/8M99Dkt23MjQMTTWukq4m5XsEuo.png",
        name: "Legendary Pictures",
        origin_country: "US",
      },
    ],
    production_countries: [
      {
        iso_3166_1: "US",
        name: "United States of America",
      },
    ],
    release_date: "2024-02-27",
    revenue: 683813734,
    runtime: 167,
    spoken_languages: [
      {
        english_name: "English",
        iso_639_1: "en",
        name: "English",
      },
    ],
    status: "Released",
    tagline: "Long live the fighters.",
    title: "Dune: Part Two",
    video: false,
    vote_average: 8.3,
    vote_count: 2770,
  };

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);
      await APIService.fetchMovieById(id)
        .then((res) => {
          setMovie(res);
        })
        .finally(() => {
          setIsLoading((prev) => false);
        });
    })();
  }, [id]);

  return (
    <Layout>
      <div
        className="container mx-auto"
        style={{
          padding: "10px 30px",
        }}
      >
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <div className="movie-detail">
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                alt=""
              />
              <section>
                <h1>{movie.title}</h1>
                <i>{movie.tagline}</i>
                <p>
                  <h3>Overview</h3>
                  {movie.overview}
                </p>
                <div>
                  <h3>Genres</h3>
                  <div className="movie-genre-wrapper">
                    {movie.genres?.map((genre) => (
                      <span className="movie-genre-badge">{genre.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Production Companies</h3>
                  <div className="movie-genre-wrapper">
                    {movie.production_companies?.map((company) => (
                      <div>
                        <img
                          width={"150px"}
                          src={`https://image.tmdb.org/t/p/w1280/${company.logo_path}`}
                        />
                        <div>
                          <i>{company.name} ({company.origin_country})</i>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>More Information</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <b>IMDB </b>
                        </td>
                        <td>
                          :{" "}
                          <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                          >{`https://www.imdb.com/title/${movie.imdb_id}`}</a>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Released Date</b>
                        </td>
                        <td>: {movie.release_date}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Revenue</b>
                        </td>
                        <td>
                          : $
                          {new Intl.NumberFormat("en-US").format(movie.revenue)}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Budget</b>
                        </td>
                        <td>
                          : $
                          {new Intl.NumberFormat("en-US").format(movie.budget)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MovieDetailPage;
