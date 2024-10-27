// const API_KEY = '504b85f6fe0a10a9c7f35945e14e7ddf';

const requests = {
  // api/movies/trending
  // api/movies/discover/:genreId
  // api/movies/top-rate
  // api/movies/search

  fetchTrending: `/api/movies/trending`,
  fetchNetflixOriginals: `/api/movies/discover/28`,
  fetchTopRated: `/api/movies/top-rate`,
  fetchActionMovies: `/api/movies/discover/28`,
  fetchComedyMovies: `/api/movies/discover/35`,
  fetchHorrorMovies: `/api/movies/discover/27`,
  fetchRomanceMovies: `/api/movies/discover/10749`,
  fetchDocumentaries: `/api/movies/discover/99`,
  fetchSearch: `/api/movies/search`,
};

export default requests;
