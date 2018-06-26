import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDygqgveP6_PTGVd2Z9IhN0eVBU0Z76MV0",
  authDomain: "movies-303ef.firebaseapp.com",
  databaseURL: "https://movies-303ef.firebaseio.com",
  projectId: "movies-303ef",
  storageBucket: "movies-303ef.appspot.com",
  messagingSenderId: "598070175024",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
  auth,
};