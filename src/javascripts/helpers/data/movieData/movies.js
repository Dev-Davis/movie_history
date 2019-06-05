import firebase from 'firebase/app';
import 'firebase/auth';

// import $ from 'jquery';
import util from '../../util';

import collection from './movieData';
import watch from '../watchListData/watchListData';


/* Adding a new movie in the firebase database and the movieStringBuilder reloads
everything on the DOM including the new movie */
const createMovie = (e) => {
  e.preventDefault();
  const newMovie = {
    imgUrl: document.getElementById('imgUrl').value,
    title: document.getElementById('title').value,
    movieRating: document.getElementById('rating').value,
  };
  collection.addNewMovie(newMovie)
    .then(() => {
      document.getElementById('title').value = '';
      document.getElementById('rating').value = '';
      document.getElementById('movies').classList.remove('hide');
      document.getElementById('new-movie').classList.add('hide');
      movieStringBuilder(); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no movies added', err));
};

const addMovieButton = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createMovie);
};

// How to add to the movieUser in firebase database

const addMovieToWatchList = (e) => {
  e.preventDefault();
  const newUserMovie = {
    isWatched: false,
    movieId: e.target.id,
    rating: '',
    uid: firebase.auth().currentUser.uid,
  };
  watch.addNewUserMovie(newUserMovie);
};

const addWatchList = () => {
  const buttons = document.querySelectorAll('.watchBtn');

  buttons.forEach((button) => {
    button.addEventListener('click', addMovieToWatchList);
  });
};
const addEvents = () => {
  document.getElementById('createMovieButton').addEventListener('click', addMovieButton);
  addWatchList();
};

/* Creates the domString to display the movies on the webpage. The movies.getMovies()
uses the movieData.js and calls the movies from the firebase database. Then build
your domStringBuilder. */

const movieStringBuilder = () => {
  collection.getMovies().then((movies) => {
    let domString = '';
    domString += '<div class="row">';
    movies.forEach((movie) => {
      domString += '<div class="col-lg-3 col-md-4 col-sm-2">';
      domString += '<div class="card text-center border" style="width: 15rem;">';
      domString += `<img src="${movie.imgUrl}" id="poster" class="card-img-top" alt="Movie Image">`;
      domString += '<div class="card-body">';
      domString += `<h4 class="movieTitle">${movie.title}</h4>`;
      domString += `<p class="card-text rating">Rated ${movie.movieRating}</p>`;
      domString += `<div id="${movie.id}" class="btn btn-primary watchBtn">Watch Later</div>`;
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
    });
    domString += '</div>';
    util.printToDom('moviesDisplay', domString);
    addEvents();
  })
    .catch(err => console.error('Could not get movies', err));
};

export default { movieStringBuilder };
