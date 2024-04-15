const fetchMovies = async (page = 1) => {
    const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
    const params = new URLSearchParams({
        include_adult: false,
        include_video: false,
        language: 'en-US',
        page: page,
        sort_by: 'popularity.desc'
    });
    const url =
      "https://api.themoviedb.org/3/discover/movie?" + params;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    return await fetch(url, options)
      .then((res) => res.json())
      .then((json) => json.results)
      .catch((err) => console.error("error:" + err));
}

const fetchMovieById = async (id) => {
    const apiKey = import.meta.env.VITE_MOVIE_API_KEY;
    const params = new URLSearchParams({
        language: 'en-US',
    });
    const url =
      `https://api.themoviedb.org/3/movie/${id}?` + params;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };

    return await fetch(url, options)
      .then((res) => res.json())
      .then((json) => json)
      .catch((err) => console.error("error:" + err));
}

export const APIService = {
    fetchMovies,
    fetchMovieById,
}