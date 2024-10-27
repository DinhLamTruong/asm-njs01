import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';

import './MovieDetail.css';

const opts = {
  height: '400',
  width: '100%',
  playerVars: {
    autoplay: 0,
  },
};
const base_url = 'https://image.tmdb.org/t/p/w500';

const MovieDetail = ({ movieData }) => {
  const [trailerUrl, setTrailerUrl] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  const [backdropImg, setBackdropImg] = useState(false);

  const { id, release_date, title, name, overview, vote_average } = movieData;

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await fetch('http://localhost:8080/api/movies/video', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer 8qlOkxz4wq',
          },
          body: JSON.stringify({ film_id: id }),
        });
        const resData = await request.json();
        if (resData.key) {
          setTrailerUrl(resData.key);
          setShowVideo(true);
          setBackdropImg(false);
        } else {
          setShowVideo(false);
          setBackdropImg(true);
        }
        if (!request.ok) {
          const messageError = resData.message;
          throw new Error(messageError);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="movie_detail">
      <div className="movie_detail_data">
        <h1>{title || name}</h1>
        <hr></hr>
        <h3>Release Date: {release_date}</h3>
        <h3>Vote: {vote_average} / 10</h3>
        <br></br>
        <p>{overview}</p>
      </div>
      <div className="movie_detail_trailer">
        {showVideo && <YouTube videoId={trailerUrl} opts={opts} />}
        {backdropImg && (
          <img
            style={{ width: '100%', height: '360px' }}
            src={`${base_url}${movieData.backdrop_path}`}
            alt={movieData.name}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
