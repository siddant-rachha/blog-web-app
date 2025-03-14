import { addPostService } from '@/apiService/addPostService/addPostService';
import { AddPostFormType } from '@/types/types';

export const useAddPost = () => {
  const handleFormAddPost = async (formData: AddPostFormType) => {
    try {
      const res = await addPostService({
        desc: formData.desc,
        name: formData.name,
        title: formData.title,
      });
      console.log(res.error, res.message, res.postId);
      // TODO: implement toast
      alert(`${res.message}, ${res.postId}`);
    } catch (e) {
      debugger;
      console.log(e);
    }
  };
  return { handleFormAddPost };
};
