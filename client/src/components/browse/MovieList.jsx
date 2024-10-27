import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import MovieDetail from '../../components/browse/MovieDetail';
import './MovieList.css';

const base_url = 'https://image.tmdb.org/t/p/w500';

function MovieList({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl, {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer 8qlOkxz4wq',
        },
      });
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = movie => {
    if (selectedMovie && selectedMovie.id === movie.id) {
      setSelectedMovie(null);
    } else {
      setSelectedMovie(movie);
    }
  };

  return (
    <div className="row">
      <h2 className="movie-list-title">{title}</h2>
      <div className="row_posters sc2">
        {movies &&
          movies?.map(movie => {
            return (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            );
          })}
      </div>
      <div style={{ padding: '40px' }}>
        {selectedMovie && <MovieDetail movieData={selectedMovie} />}
      </div>
    </div>
  );
}

export default MovieList;
