import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIService } from "../../../services/api.service";
import "./Detail.css";
import Layout from "../../Layout/Layout";

const MovieDetailPage = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);
      await APIService.fetchMovieById(id)
        .then((res) => {
          if (res?.status_code) {
            return;
          }
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
        ) : movie ? (
          <>
            <div className="movie-detail">
              <img
                src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                alt=""
              />
              <section>
                <h1>{movie.title}</h1>
                <i>{movie.tagline}</i>
                <div>
                  <h3>Overview</h3>
                  {movie.overview}
                </div>
                <div>
                  <h3>Genres</h3>
                  <div className="movie-flex-wrapper">
                    {movie.genres?.map((genre) => (
                      <span className="movie-genre-badge">{genre.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Production Companies</h3>
                  <div className="movie-flex-wrapper">
                    {movie.production_companies?.map((company) => (
                      <div>
                        <img
                          style={{
                            maxHeight: "100px",
                            maxWidth: "150px",
                          }}
                          src={`https://image.tmdb.org/t/p/w1280/${company.logo_path}`}
                          alt={`${company.name} (${company.origin_country})`}
                          title={`${company.name} (${company.origin_country})`}
                        />
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
        ) : (
          "Not found"
        )}
      </div>
    </Layout>
  );
};

export default MovieDetailPage;
