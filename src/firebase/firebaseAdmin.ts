import admin from 'firebase-admin';

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY || '{}');

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const firebaseAdminDb = admin.firestore();
const firebaseAdminAuth = admin.auth();

export { firebaseAdminDb, firebaseAdminAuth, admin as firebaseAdmin };
