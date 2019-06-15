import axios from 'axios';

import apiKeys from '../../apiKeys';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

/* axios.get in this function is getting the firebase database and searching the call by using the
get function in  NEW PROMISE so it'll get that information for the movies.
And always be sure to put the .json at the end of the axios.get() call.
Ex: axios.get(`${firebaseUrl}/movies.json`) */

// Object.keys(movieResults) makes the key the id for the moviesResults.
// moviesResults[movieId].id = movieId which movieId is the input for the forEach method.

// movies.push are the movies being pushed into the created movies array

const getMovies = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/movies.json`)
    .then((results) => {
      const movieResults = results.data;
      const movies = [];
      // Object.keys is the weird string in your firebase database
      Object.keys(movieResults).forEach((movieId) => {
        movieResults[movieId].id = movieId;
        movies.push(movieResults[movieId]);
      });
      resolve(movies);
    })
    .catch(err => reject(err));
});

const addNewMovie = yourMovies => axios.post(`${firebaseUrl}/movies.json`, yourMovies);
const deleteMovie = movieId => axios.delete(`${firebaseUrl}/movies/${movieId}.json`);

export default { getMovies, addNewMovie, deleteMovie };
