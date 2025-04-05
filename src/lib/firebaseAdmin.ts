import * as admin from 'firebase-admin';
const serviceAccount = require('../../firebase-key.json');
// console.log("serviceAccount",serviceAccount);
// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential:  admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

export { admin, db };
