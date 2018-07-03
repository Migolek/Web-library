import { db } from './firebase';

export const doCreateUser = (id, userData) => {
  db.ref().child('users').child(id).set({
    ...userData
  });
}

export const onceGetUsers = () =>
  db.ref('users').once('value');