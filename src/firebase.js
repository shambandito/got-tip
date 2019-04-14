import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBTwiQsaaXD6gKmAnLADdcony3qjTbAtXE",
  authDomain: "got-tip.firebaseapp.com",
  databaseURL: "https://got-tip.firebaseio.com",
  projectId: "got-tip",
  storageBucket: "got-tip.appspot.com",
  messagingSenderId: "476735537271"
};

firebase.initializeApp(config);

export default firebase;