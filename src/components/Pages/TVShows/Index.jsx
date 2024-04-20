import { useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import MovieCard from "../../MovieCard";
import { APIService } from "../../../services/api.service";

const TVShowIndex = () => {
  const [tvShows, setTVShows] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = async () => {
    setIsLoading(true);
    await APIService.fetchTVShows(currPage + 1)
      .then((data) => setTVShows((prev) => [...prev, ...data]))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    setCurrPage(currPage + 1);
  };

  const changePage = async (page) => {
    setIsLoading(true);
    await APIService.fetchTVShows(page)
      .then((data) => setTVShows(data))
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    console.log(page);
    setCurrPage(page);
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await APIService.fetchTVShows()
        .then((data) => setTVShows(data))
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
          {tvShows?.map((tvShow) => (
            <MovieCard
              posterPath={tvShow.poster_path}
              title={tvShow.name}
              overview={tvShow.overview}
              id={tvShow.id}
              type="tv-shows"
            />
          ))}
        </div>

        <div>
            <button type="button" disabled={(currPage-1) <= 0} onClick={() => changePage(currPage-1)}>Prev</button>
            Page: {currPage}
            <button type="button" onClick={() => changePage(currPage+1)}>Next</button>
        </div>

        {/* <button
          className="btn-load-more"
          type="button"
          onClick={() => loadMore()}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load More"}
        </button> */}
      </div>
    </Layout>
  );
};

export default TVShowIndex;
