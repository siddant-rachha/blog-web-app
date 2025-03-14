import admin from 'firebase-admin';

// get FIREBASE_ADMIN_KEY object from firebase account
// format
// {
//   "type": "",
//   "project_id": "",
//   "private_key_id": "",
//   "private_key": "",
//   "client_email": "",
//   "client_id": "",
//   "auth_uri": "",
//   "token_uri": "",
//   "auth_provider_x509_cert_url": "",
//   "client_x509_cert_url": "",
//   "universe_domain": ""
// }

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY || '{}');

if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}

const firebaseAdminDb = admin.firestore();
const firebaseAdminAuth = admin.auth();

export { firebaseAdminDb, firebaseAdminAuth, admin as firebaseAdmin };
