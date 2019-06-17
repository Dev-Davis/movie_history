import axios from 'axios';
import apiKeys from '../../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

// function to add objects to the firebase database to the userMovie category
const getUserMovie = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/userMovie.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const watchListResults = results.data;
      const watchList = [];
      Object.keys(watchListResults).forEach((movieId) => {
        watchListResults[movieId].id = movieId;
        watchList.push(watchListResults[movieId]);
      });
      resolve(watchList);
    })
    .catch(err => reject(err));
});

const addNewUserMovie = newUserMovie => axios.post(`${firebaseUrl}/userMovie.json`, newUserMovie);
const deleteMovie = movieId => axios.delete(`${firebaseUrl}/userMovie/${movieId}.json`);

export default { getUserMovie, addNewUserMovie, deleteMovie };
