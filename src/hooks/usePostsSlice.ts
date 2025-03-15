import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { getPostsService } from '@/apiService/getPostsService/getPostsService';
import { postsSliceActions } from '@/globalState/stateSlices/postsSlice/postsSlice';
import { PostType } from '@/types/types';

export const usePostsSlice = () => {
  const dispatch = useDispatch<AppDispatch>();

  const allPosts = useSelector(
    (state: GlobalRootState) => state.postsSlice.allPosts
  );

  const getAllPosts = async () => {
    try {
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
    }
  };

  return {
    selectors: { allPosts },
    actions: {
      getAllPosts,
    },
  };
};
