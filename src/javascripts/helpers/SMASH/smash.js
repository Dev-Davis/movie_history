const movieInfo = (userMovies, movies) => userMovies.map((userMovie) => {
  const lib = userMovie;
  const movie = movies.find(m => m.id === lib.movieId);
  if (movie) {
    lib.movieTitle = movie.title;
    lib.movieRating = movie.rating;
    lib.img = movie.imgUrl;
  }
  return lib;
});

export default { movieInfo };
