import util from '../../util';

import collection from './movieData';

/* Creates the domString to display the movies on the webpage. The movies.getMovies()
uses the movieData.js and calls the movies from the firebase database. Then build
your domStringBuilder. */


const movieStringBuilder = () => {
  collection.getMovies().then((movies) => {
    let domString = '';
    domString += '<div class="row">';
    movies.forEach((movie) => {
      domString += '<div class="col-4">';
      domString += '<div class="card text-center border" style="width: 18rem;">';
      domString += `<img src="${movie.imgUrl}" class="card-img-top" alt="Movie Image">`;
      domString += '<div class="card-body">';
      domString += `<h4 class="movieTitle">${movie.title}</h4>`;
      domString += `<p class="card-text">Rated ${movie.movieRating}</p>`;
      domString += '<div id="watchBtn" class="btn btn-primary">Watch Later</a>';
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
    });
    util.printToDom('moviesDisplay', domString);
  })
    .catch(err => console.error('Could not get movies', err));
};

export default { movieStringBuilder };
