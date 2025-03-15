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
    } catch (e) {
      console.log(e);
      errorNotify();
    } finally {
      setRootLoading(false);
    }
  };
  return { handleFormAddPost };
};
