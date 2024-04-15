import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIService } from "../../../services/api.service";
import "./Detail.css";
import Layout from "../../Layout/Layout";

const TVShowDetailPage = () => {
  const { id } = useParams();

  const [tvShow, setTVShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading((prev) => true);
      await APIService.fetchTVShowById(id)
        .then((res) => {
          if (!res?.status) {
            return;
          }
          setTVShow(res);
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
        ) : tvShow ? (
          <>
            <div className="tv-show-detail">
              <img
                src={`https://image.tmdb.org/t/p/w1280/${tvShow.poster_path}`}
                alt=""
              />
              <section>
                <h1>{tvShow.name}</h1>
                <i>{tvShow.type}</i>
                <div>
                  <h3>Overview</h3>
                  {tvShow.overview}
                </div>
                <div>
                  <h3>Genres</h3>
                  <div className="tv-show-flex-wrapper">
                    {tvShow.genres?.map((genre) => (
                      <span className="tv-show-genre-badge">{genre.name}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3>Production Companies</h3>
                  <div className="tv-show-flex-wrapper">
                    {tvShow.production_companies?.map((company) => (
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
                          <b>First Aired Date</b>
                        </td>
                        <td>: {tvShow.first_air_date}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Season(s)</b>
                        </td>
                        <td>: {tvShow.number_of_seasons}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Episode(s)</b>
                        </td>
                        <td>: {tvShow.number_of_episodes}</td>
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

export default TVShowDetailPage;
