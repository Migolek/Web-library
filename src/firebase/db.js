import { db } from './firebase';

export const doCreateUser = (id, userData) => {
  db.ref().child('users').child(id).set({
    ...userData
  });
}

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const updateUser = (id, newData) =>
  db.ref('users').child(id).update(newData);

export const countUsers = () =>
  db.ref('users').once('value').then(snapshot => {
    return snapshot.numChildren();
  });

export const onceGetVideos = () =>
  db.ref('movies').once('value');

export const countMovies = () =>
  db.ref('movies').once('value').then(snapshot => {
    return snapshot.numChildren();
  });