import { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, title, overview, id, type }) => {
  const moreButtonStyle = {
    background: "none",
    boxShadow: "none",
    color: "blue",
    border: "none",
    cursor: "pointer",
  };

  const [isMoreClick, setIsMoreClick] = useState(false);
  return (
    <div className="movie-card">
      <Link to={`/${type === "movies" ? "movies" : "tv-shows"}/${id}`}>
        <img
          className="cover"
          src={`https://image.tmdb.org/t/p/w1280/${posterPath}`}
          alt={title}
        />
      </Link>
      <Link
        to={`/${type === "movies" ? "movies" : "tv-shows"}/${id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <h4 className="title">{title}</h4>
      </Link>
      <p>
        {isMoreClick ? overview : overview?.substring(0, 60) + "..."}
        <button
          style={moreButtonStyle}
          onClick={() => setIsMoreClick(!isMoreClick)}
          type="button"
        >
          {isMoreClick ? "collapse" : "more"}
        </button>
      </p>
    </div>
  );
};

export default MovieCard;
