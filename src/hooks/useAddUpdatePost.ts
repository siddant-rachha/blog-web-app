import { addPostService } from '@/apiService/addPostService/addPostService';
import { AddPostFormType, UpdatePostFormType } from '@/types/types';
import { useCommonSlice } from './useCommonSlice';
import { useToast } from './useToast';
import { updatePostService } from '@/apiService/updatePostService/updatePostService';

export const useAddUpdatePost = () => {
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

  const handleFormUpdatePost = async (formData: UpdatePostFormType) => {
    setRootLoading(true);

    try {
      const res = await updatePostService(formData);
      successNotify(`Post updated: ${res.postId}`);
    } catch (error) {
      console.error(error);
      errorNotify('Post update failed');
      throw error;
    } finally {
      setRootLoading(false);
    }
  };
  return { handleFormAddPost, handleFormUpdatePost };
};
