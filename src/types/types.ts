export type UserDetails = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
} | null;

export type AddPostFormType = {
  title: string;
  desc: string;
  name: string;
  imageFile: File | null;
};
