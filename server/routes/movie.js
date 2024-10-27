const express = require('express');

const router = express.Router();

const moviesController = require('../controllers/movies');

router.get('/movies/trending', moviesController.getMoviesTrend);

router.get('/movies/top-rate', moviesController.getMoviesRating);

router.get('/movies/discover/:genreId', moviesController.getMoviesGenre);

router.post('/movies/video', moviesController.postMoviesTrailer);

router.post('/movies/search', moviesController.postMoviesSearch);

module.exports = router;
