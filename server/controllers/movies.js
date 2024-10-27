const movie = require('../models/movie');
const movieGenre = require('../models/genre');
const videoList = require('../models/video');

// GET movie trending
exports.getMoviesTrend = (req, res) => {
  const queryPage = req.query.page || 1;

  // datas movie from file json
  const dataMovies = movie.all();

  // film được sắp xếp theo trường popularity giảm dần
  const dataMoviesSort = dataMovies.sort((a, b) => b.popularity - a.popularity);

  const datasTrend = dataMoviesSort.slice((queryPage - 1) * 20, queryPage * 20);

  const dataTrend = {
    results: datasTrend || [],
    page: queryPage,
    total_pages: Math.ceil(dataMovies.length / 20),
  };
  res.status(200).json(dataTrend);
};

// GET movie rating
exports.getMoviesRating = (req, res) => {
  const queryPage = req.query.page || 1;

  // datas movie from file json
  const dataMovies = movie.all();

  const dataMoviesSort = dataMovies.sort(
    (a, b) => b.vote_average - a.vote_average
  );
  const datasRating = dataMoviesSort.slice(
    (queryPage - 1) * 20,
    queryPage * 20
  );

  const dataRating = {
    results: datasRating || [],
    page: queryPage,
    total_pages: Math.ceil(dataMovies.length / 20),
  };
  res.status(200).json(dataRating);
};

// GET movie genre
exports.getMoviesGenre = (req, res) => {
  const queryGenreId = +req.params.genreId;
  const queryPage = req.query.page || 1;

  // datas movie from file json
  const dataMovies = movie.all();

  // data genre from file genre.js
  const listGenre = movieGenre.genre();

  const listMoviesGenre = dataMovies.filter(movie =>
    movie.genre_ids.includes(+queryGenreId)
  );

  const datasGenre = listMoviesGenre.slice(
    (queryPage - 1) * 20,
    queryPage * 20
  );

  const genreName = listGenre.find(movie => movie.id === +queryGenreId);

  const dataGenre = {
    results: datasGenre || [],
    page: queryPage,
    total_pages: Math.ceil(listMoviesGenre.length / 20),
    genre_name: genreName?.name || '',
  };

  if (queryGenreId === '') {
    res.status(400).json({ message: 'Not found gerne parram' });
  }
  if (genreName === undefined) {
    res.status(400).json({ message: 'Not found that gerne id' });
  }

  res.status(200).json(dataGenre);
};

// POST trailer
exports.postMoviesTrailer = (req, res) => {
  const videoId = req.body.film_id;

  if (!videoId) {
    return res.status(400).json({ message: 'Not found film_id parramter' });
  }

  // datas video from file json
  const dataVideos = videoList.videoList();

  const videoTrailers = dataVideos.find(item => item.id === videoId);

  if (!videoTrailers) {
    return res.status(404).json({ message: 'Not found video' });
  }

  const videoPublishedAt = { ...videoTrailers?.videos[0] };

  if (videoTrailers?.length >= 1) {
    const trailer = videoTrailers?.videos.filter(item => {
      if (
        item.official === true &&
        item.site === 'YouTube' &&
        (item.type === 'Trailer' || item.type === 'Teaser')
      ) {
        return item;
      }
    });

    let publishedAt = null;
    videoPublishedAt = trailer?.find(item => {
      if (publishedAt === null || Date.parse(item.published_at) > publishedAt) {
        return item;
      }
    });
  }

  res.status(200).json(videoPublishedAt);
};

// Search movie
exports.postMoviesSearch = (req, res) => {
  const { keyword, genre, mediaType, language, year } = req.body;
  const queryPage = +req.query.page || 1;

  const allMovies = movie.all();

  if (!keyword) {
    return res.status(400).json({ message: 'Not found keyword parram' });
  }

  let filteredMovies = allMovies.filter(item => {
    const normalizedKeyword = keyword.toLowerCase();
    return (
      item.overview?.toLowerCase().includes(normalizedKeyword) ||
      item.title?.toLowerCase().includes(normalizedKeyword)
    );
  });

  if (genre || mediaType || language || year) {
    filteredMovies = filteredMovies.filter(item => {
      const matchesGenre = genre
        ? item.genre_ids.includes(Number(genre))
        : true;
      const matchesMediaType = mediaType ? item.media_type === mediaType : true;
      const matchesLanguage = language
        ? item.original_language === language
        : true;
      const matchesYear =
        year &&
        (item.release_date?.startsWith(year) ||
          item.first_air_date?.startsWith(year));

      return (
        matchesGenre &&
        matchesMediaType &&
        matchesLanguage &&
        (matchesYear || !year)
      );
    });
  }

  const datasMovieSearch = filteredMovies.slice(
    (queryPage - 1) * 20,
    queryPage * 20
  );

  const resultSearch = {
    results: datasMovieSearch || [],
    page: queryPage,
    total_pages: Math.ceil(datasMovieSearch.length / 20),
  };

  res.status(200).json(resultSearch);
};
