import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = document.getElementById('auth');
const authLogin = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const myMovies = document.getElementById('navbar-button-history');

/* adds and takes away elements from the page and navbar for when the user is logged in or not
and add takes it away from the page and remove adds it to the page */
const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      authLogin.classList.add('hide');
      myMovies.classList.remove('hide');
      logoutNavbar.classList.remove('hide');
    } else {
      authDiv.classList.remove('hide');
      authLogin.classList.remove('hide');
      myMovies.classList.add('hide');
      logoutNavbar.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
