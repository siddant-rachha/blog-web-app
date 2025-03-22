import { firebaseAdminAuth } from '@/firebase/firebaseAdmin';

export const decodeToken = async (token: string) => {
  try {
    const res = await firebaseAdminAuth.verifyIdToken(token);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
