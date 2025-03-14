export type UserDetails = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
} | null;

export type AddPostFormType = {
  base64Image: string | null;
  title: string;
  desc: string;
  name: string;
};
