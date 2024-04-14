import { useParams } from "react-router-dom";

const MovieDetailPage = () => {
  let { id } = useParams();

  return <span>{id}</span>;
};

export default MovieDetailPage;
