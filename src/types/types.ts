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
  imgSrc: string;
  avatarSrc: string;
  author: string;
  writePermission: boolean;
  date: string;
};

export type AddPostFormType = {
  title: string;
  desc: string;
  name: string;
  imageFile: File | null;
};
