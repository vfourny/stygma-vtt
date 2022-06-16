import admin from 'firebase-admin';
import { auth } from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const createFirestoreUser = auth.user().onCreate((user) => {
  console.log(user);
  admin.firestore().collection('users').doc(user.uid).set({
    email: user.email,
  });
});
