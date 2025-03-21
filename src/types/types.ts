import { FirebaseTimestampType } from '@/firebase/firebaseClient';

export type UserDetails = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
} | null;

export type PostType = {
  id: string;
  title: string;
  desc: string;
  author: string;
  imageUrl: string;
  authorPic: string;
  createdAt: FirebaseTimestampType;
  writePermission: boolean;
};

export type SearchedPostType = {
  id: string;
  title: string;
  desc: string;
  author: string;
  imageUrl: string;
  authorPic: string;
  createdAt: FirebaseTimestampType;
};

export type AddPostFormType = {
  title: string;
  desc: string;
  imageFile: File | null;
};
