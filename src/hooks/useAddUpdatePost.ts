import { addPostService } from '@/apiService/addPostService/addPostService';
import { updatePostService } from '@/apiService/updatePostService/updatePostService';
import { AddPostFormType, UpdatePostFormType } from '@/types/types';
import { useCommonSlice } from './useCommonSlice';
import { useToast } from './useToast';

export const useAddUpdatePost = () => {
  const {
    actions: { setRootLoading },
  } = useCommonSlice();
  const { successNotify, errorNotify } = useToast();

  const handleFormAddPost = async (formData: AddPostFormType) => {
    setRootLoading(true);

    try {
      await addPostService(formData);
      successNotify(`Post created`);
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
      await updatePostService(formData);
      successNotify(`Post updated`);
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
