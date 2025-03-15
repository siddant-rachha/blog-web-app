import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { getPostsService } from '@/apiService/getPostsService/getPostsService';
import { postsSliceActions } from '@/globalState/stateSlices/postsSlice/postsSlice';
import { PostType } from '@/types/types';
import { useCommonSlice } from './useCommonSlice';

export const usePostsSlice = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    actions: { setRootLoading },
  } = useCommonSlice();

  const allPosts = useSelector(
    (state: GlobalRootState) => state.postsSlice.allPosts
  );

  const getAllPosts = async () => {
    try {
      setRootLoading(true);
      const res = await getPostsService();
      const posts: PostType[] =
        res && res.posts
          ? res.posts.map((post) => {
              return {
                id: post.id,
                title: post.title,
                author: post.name,
                avatarSrc: '.',
                date: '12 Mar 2025',
                desc: post.desc,
                imgSrc: post.imageUrl,
                writePermission: false,
              };
            })
          : [];
      dispatch(postsSliceActions.setAllPosts(posts));
    } catch (e) {
      console.log(e);
    } finally {
      setRootLoading(false);
    }
  };

  return {
    selectors: { allPosts },
    actions: {
      getAllPosts,
    },
  };
};
