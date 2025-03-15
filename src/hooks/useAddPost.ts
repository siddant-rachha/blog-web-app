import { addPostService } from '@/apiService/addPostService/addPostService';
import { AddPostFormType } from '@/types/types';

export const useAddPost = () => {
  const handleFormAddPost = async (formData: AddPostFormType) => {
    try {
      const res = await addPostService(formData);
      // TODO: implement toast
      alert(`${res.message}, ${res.postId}`);
    } catch (e) {
      console.log(e);
    }
  };
  return { handleFormAddPost };
};
