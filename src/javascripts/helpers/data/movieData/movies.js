import firebase from 'firebase/app';
import 'firebase/auth';

// import $ from 'jquery';
import util from '../../util';

import collection from './movieData';
import watch from '../watchListData/watchListData';
// import smash from '../../SMASH/smash';


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
      document.getElementById('createMovieButton').classList.remove('hide');
      document.getElementById('backButton').classList.add('hide');
      document.getElementById('backButton').classList.add('hide');
      // the movieStringBuilder adds the actual movie to the site
      movieStringBuilder(); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no movies added', err));
};

// const deleteMovie = (e) => {
//   e.preventDefault();
//   const
// };

/* This function is for  when you click the movie button the form to add a new movie appears.
Once you've entered the information, the form will disappear and you will return to the movies home page */

const addMovieButton = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('new-movie').classList.remove('hide');
  document.getElementById('toWatch').classList.add('hide');
  document.getElementById('createMovieButton').classList.add('hide');
  document.getElementById('backButton').classList.remove('hide');
  document.getElementById('saveNewMovie').addEventListener('click', createMovie);
};

/* This function is for if you go to the add movie page and want to return to the main movie page without
entering any information to prevent you from adding blank information to the database. */

const backToMovie = () => {
  document.getElementById('movies').classList.remove('hide');
  document.getElementById('new-movie').classList.add('hide');
  document.getElementById('createMovieButton').classList.remove('hide');
  document.getElementById('back-from-watch').classList.add('hide');
  document.getElementById('back-from-add').classList.remove('hide');
};

/* How to add to the movieUser in firebase database. The newUserMovie object is the information that will be
entered into the firebase database. */

const addMovieToWatchList = (e) => {
  e.preventDefault();
  const newUserMovie = {
    isWatched: false,
    movieId: e.target.id,
    imgUrl: document.getElementById('imgUrl').src,
    title: document.getElementById('title').text,
    movieRating: document.getElementById('rating').text,
    userRating: document.getElementById('rating').text,
    uid: firebase.auth().currentUser.uid,
  };
  watch.addNewUserMovie(newUserMovie)
    .then(() => {
      watchStringBuilder(); // eslint-disable-line no-use-before-define
    });
};

/* The watchListButton function attaches to each button on each card to add the click event to them to perform
a certain function. */


// The watchListView function simply hides the main movies page and shows your watch list. **WIP**

const watchListView = () => {
  document.getElementById('movies').classList.add('hide');
  document.getElementById('toWatch').classList.remove('hide');
  document.getElementById('createMovieButton').classList.add('hide');
  document.getElementById('back-from-watch').classList.remove('hide');
  document.getElementById('back-from-add').classList.remove('hide');
};

const watchListButton = () => {
  const buttons = document.querySelectorAll('.watchBtn');
  buttons.forEach((button) => {
    button.addEventListener('click', addMovieToWatchList);
    button.addEventListener('click', watchListView);
  });
};

// The addEvents function adds event listeners to the buttons and the functionality comes from the functions.

const addEvents = () => {
  document.getElementById('createMovieButton').addEventListener('click', addMovieButton);
  document.getElementById('back-from-watch').addEventListener('click', backToMovie);
  document.getElementById('back-from-add').addEventListener('click', backToMovie);
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
      domString += '<div class="card text-center border" style="width: 22rem;">';
      domString += `<h4 class="movieTitle">${movie.title}</h4>`;
      domString += `<img src="${movie.imgUrl}" id="poster" class="card-img-top" alt="Movie Image">`;
      domString += '<div class="card-body">';
      domString += `<h4 class="card-text rating">Rated ${movie.movieRating}</h4>`;
      domString += `<div id="${movie.id}" class="btn btn-warning watchBtn">Watch Later</div>`;
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
    });
    domString += '</div>';
    util.printToDom('moviesDisplay', domString);
    addEvents();
    watchListButton();
  })
    .catch(err => console.error('Could not get movies', err));
};

const deleteMovies = (e) => {
  const movieId = e.target.id;
  watch.deleteMovie(movieId)
    .then(() => {
      watchStringBuilder(firebase.auth().currentUser.uid); // eslint-disable-line no-use-before-define
    })
    .catch(err => console.error('no watch list built', err));
};

const deleteEvent = () => {
  const removes = document.querySelectorAll('.deleteBtn');
  removes.forEach((remove) => {
    remove.addEventListener('click', deleteMovies);
  });
};

const watchStringBuilder = () => {
  const uId = firebase.auth().currentUser.uid;
  watch.getUserMovie(uId).then((watchList) => {
    let domString = '';
    domString += '<div class="row">';
    watchList.forEach((movie) => {
      domString += `<div class="col-lg-3 col-md-4 col-sm-2" id="${movie.id}">`;
      domString += '<div class="card text-center border" style="width: 15rem;">';
      domString += `<h4 class="movieTitle">${movie.name}</h4>`;
      domString += `<p class="hasWatched" id="poster" class="card-img-top">${movie.isWatched}</p>`;
      domString += '<div class="card-body">';
      domString += `<div id="${movie.id}" class="btn btn-danger deleteBtn">Delete</div>`;
      domString += '</div>';
      domString += '</div>';
      domString += '</div>';
    });
    domString += '</div>';
    util.printToDom('watchList', domString);
    addEvents();
    deleteEvent();
  })
    .catch(err => console.error('no watch list returned', err));
};

export default { movieStringBuilder, watchStringBuilder };
