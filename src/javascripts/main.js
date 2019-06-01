import firebase from 'firebase/app';
import 'bootstrap';
import '../styles/main.scss';

import auth from './components/auth/auth';
import myNavbar from './components/myNavbar/myNavbar';
import authData from './helpers/data/authData/authData';

import apiKeys from './helpers/apiKeys.json';

/* Run navbarEvents, domStringBuilder, and checkLoginStatus to run JavaScript
changes when logged in or out */

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  myNavbar.navbarEvents();
  auth.domStringBuilder();
  authData.checkLoginStatus();
};

init();
