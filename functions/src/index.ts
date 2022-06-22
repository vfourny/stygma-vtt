import admin from 'firebase-admin';
import { https } from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

export const createFirestoreUser = https.onCall((data, context) => {
  admin.database().ref('/users').push({ email: data.email });
});
