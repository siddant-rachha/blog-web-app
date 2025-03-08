import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider as GoogleAuthFirebase,
  onAuthStateChanged as authChangeEventListener,
  User,
  signInWithPopup as firebaseSignIn,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_apiKey,
  authDomain: process.env.NEXT_PUBLIC_authDomain,
  projectId: process.env.NEXT_PUBLIC_projectId,
  storageBucket: process.env.NEXT_PUBLIC_storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
  appId: process.env.NEXT_PUBLIC_appId,
  measurementId: process.env.NEXT_PUBLIC_measurementId,
};

const firebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();
const firebaseAuth = getAuth(firebaseApp);
const firebaseDb = getFirestore(firebaseApp);

const googleAuthProvider = new GoogleAuthFirebase();

export {
  firebaseApp,
  firebaseAuth,
  firebaseDb,
  googleAuthProvider,
  firebaseSignIn,
  authChangeEventListener,
  firebaseSignOut,
  GoogleAuthFirebase,
};
export type { User as FirebaseUser };
