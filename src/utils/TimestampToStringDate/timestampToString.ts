import { FirebaseTimestamp } from '@/firebase/firebaseClient';

export function timestampToString(seconds: number, nanoseconds: number) {
  const timestamp = new FirebaseTimestamp(seconds, nanoseconds);
  return timestamp.toDate().toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour12: true,
  });
}
