import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { getAllPostsService } from '@/apiService/getPostsService/getPostsService';
import { postsSliceActions } from '@/globalState/stateSlices/postsSlice/postsSlice';
import { useCommonSlice } from './useCommonSlice';
import emptyImg from '@/assets/no-img.png';
import { useToast } from './useToast';
import { PostType } from '@/types/types';

export const usePostsSlice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    actions: { setRootLoading },
  } = useCommonSlice();

  const { successNotify, errorNotify } = useToast();

  const allPosts = useSelector(
    (state: GlobalRootState) => state.postsSlice.allPosts
  );

  const editPost = useSelector(
    (state: GlobalRootState) => state.postsSlice.editPost
  );

  const getAllPosts = async () => {
    try {
      setRootLoading(true);
      const res = await getAllPostsService();

      const posts =
        res.posts && res.posts.length
          ? res.posts.map((post) => {
              return {
                id: post.id,
                title: post.title,
                author: post.author,
                authorPic: post.authorPic || '.',
                createdAt: post.createdAt,
                desc: post.desc,
                imageUrl: post.imageUrl || emptyImg.src,
                writePermission: post.writePermission,
              };
            })
          : [];
      dispatch(postsSliceActions.setAllPosts(posts));
      successNotify('Posts fetched');
    } catch (error) {
      console.error(error);
      errorNotify('Posts fetch failed');
      throw error;
    } finally {
      setRootLoading(false);
    }
  };

  const setEditPost = (post: PostType) => {
    dispatch(postsSliceActions.setEditPost(post));
  };

  return {
    selectors: { allPosts, editPost },
    actions: {
      getAllPosts,
      setEditPost,
    },
  };
};
