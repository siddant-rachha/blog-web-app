import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

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

let firebaseUIModal: firebaseui.auth.AuthUI | null = null;
if (typeof window !== 'undefined') {
  firebaseUIModal = new firebaseui.auth.AuthUI(firebaseAuth);
}

const authSignOut = () => {
  return signOut(firebaseAuth);
};

export {
  firebaseApp,
  firebaseAuth,
  firebaseDb,
  firebaseUIModal,
  GoogleAuthProvider,
  onAuthStateChanged,
  authSignOut,
};
export type { User as FirebaseUser };
