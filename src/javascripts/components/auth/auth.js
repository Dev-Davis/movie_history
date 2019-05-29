/* Import of the modules needed for this JavaScript file */
import firebase from 'firebase/app';
import 'firebase/auth';

import util from '../../helpers/util';

import login from './login.png';

const logMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const domStringBuilder = () => {
  let domString = '<button id="google-auth" class="btn btn-danger">';
  domString += `<img src="${login}" />`;
  domString += '</button>';
  util.printToDom('auth', domString);
  document.getElementById('google-auth').addEventListener('click', logMeIn);
};

export default { domStringBuilder };
