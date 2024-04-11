import { useState } from "react";

const MovieCard = ({ posterPath, title, overview }) => {
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
      <img
        className="cover"
        src={`https://image.tmdb.org/t/p/w1280/${posterPath}`}
        alt={title}
      />
      <h4 className="title">{title}</h4>
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
