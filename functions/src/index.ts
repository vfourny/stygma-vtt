import admin from 'firebase-admin';
import functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const createFirestoreUser = functions.https.onCall((data, context) => {
  console.log(data);
  console.log(context);
  admin.firestore().collection('users').doc(data.uid).set({
    email: data.email,
    username: data.username,
  });
});
