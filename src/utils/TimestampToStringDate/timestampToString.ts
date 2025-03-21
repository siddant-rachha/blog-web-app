import { FirebaseTimestamp } from '@/firebase/firebaseClient';

export function timestampToString(seconds: number, nanoseconds: number) {
  const timestamp = new FirebaseTimestamp(seconds, nanoseconds);
  return timestamp.toDate().toLocaleDateString();
}
