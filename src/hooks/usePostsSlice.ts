import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import {
  getAllPostsService,
  getPostByIdService,
} from '@/apiService/getPostsService/getPostsService';
import { postsSliceActions } from '@/globalState/stateSlices/postsSlice/postsSlice';
import { useCommonSlice } from './useCommonSlice';
import { useToast } from './useToast';
import { PostType } from '@/types/types';
import { deletePostService } from '@/apiService/deletePostService/deletePostService';

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

  const readPost = useSelector(
    (state: GlobalRootState) => state.postsSlice.readPost
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
                authorPic: post.authorPic || '',
                createdAt: post.createdAt,
                desc: post.desc,
                imageUrl: post.imageUrl || '',
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

  const getPostById = async (postId: string) => {
    try {
      setRootLoading(true);
      const postData = await getPostByIdService(postId);
      if (postData.post) {
        dispatch(postsSliceActions.setReadPost(postData.post));
      }
    } catch (error) {
      console.error(error);
      errorNotify('Post fetch failed');
      throw error;
    } finally {
      setRootLoading(false);
    }
  };

  const setEditPost = (post: PostType) => {
    dispatch(postsSliceActions.setEditPost(post));
  };

  const setReadPost = (post: PostType) => {
    dispatch(postsSliceActions.setReadPost(post));
  };

  const handleDeletePost = async (postId: string) => {
    try {
      setRootLoading(true);
      await deletePostService(postId);
      successNotify('Post deleted');
      getAllPosts();
    } catch (error) {
      console.error(error);
      errorNotify('Post delete failed');
      throw error;
    } finally {
      setRootLoading(false);
    }
  };

  return {
    selectors: { allPosts, editPost, readPost },
    actions: {
      getAllPosts,
      setEditPost,
      handleDeletePost,
      setReadPost,
      getPostById,
    },
  };
};
