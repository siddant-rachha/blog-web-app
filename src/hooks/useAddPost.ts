import { addPostService } from '@/apiService/addPostService/addPostService';
import { AddPostFormType } from '@/types/types';
import { useCommonSlice } from './useCommonSlice';
import { useToast } from './useToast';

export const useAddPost = () => {
  const {
    actions: { setRootLoading },
  } = useCommonSlice();
  const { successNotify, errorNotify } = useToast();

  const handleFormAddPost = async (formData: AddPostFormType) => {
    setRootLoading(true);

    try {
      const res = await addPostService(formData);
      successNotify(`Post created: ${res.postId}`);
    } catch (error) {
      console.error(error);
      errorNotify('Post creation failed');
      throw error;
    } finally {
      setRootLoading(false);
    }
  };
  return { handleFormAddPost };
};
