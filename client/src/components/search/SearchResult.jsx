import React, { useState, useEffect, memo } from 'react';

import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/w500';

const SearchResult = ({ query, genre, mediaType, language, year }) => {
  const [movies, setMovies] = useState([]);

  const urlSearch = 'http://localhost:8080/api/movies/search';
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(urlSearch, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 8qlOkxz4wq',
        },
        body: JSON.stringify({
          keyword: query,
          genre: genre,
          mediaType: mediaType,
          language: language,
          year: year,
        }),
      });
      const resData = await res.json();
      setMovies(resData);
    };

    if (query) {
      fetchData();
    }
  }, [query, genre, mediaType, language, year]);

  return (
    <div className="row">
      <h2>Search Result</h2>
      <div className="row_posters search-resul-container sc2">
        {movies.results?.map(movie => {
          return (
            <img
              key={movie.id}
              className={`row_poster row_posterLarge`}
              src={`${base_url}${movie.poster_path}`}
              alt={movie.name}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(SearchResult);
