import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AvatarItem, NavItem, Routes } from '@/constants/globalConstants';
import { AppDispatch, GlobalRootState } from '@/globalState/rootState/store';
import { headerNavSliceActions } from '@/globalState/stateSlices/headerNavSlice/headerNavSlice';
import { searchPostsService } from '@/apiService/searchPostsService/searchPostsService';
import emptyImg from '@/assets/no-img.png';
import { getLowResCloudinaryImg } from '@/utils/getLowResCloudinaryImg/getLowResCloudinaryImg';

export const useHeaderNavSlice = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const navActive = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.navActive
  );

  const avatarItems = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.avatarItems
  );

  const searchItems = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.searchItems
  );

  const navItems = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.navItems
  );

  const searchLoading = useSelector(
    (state: GlobalRootState) => state.headerNavSlice.searchLoading
  );

  const changeNav = (navItem: NavItem) => {
    dispatch(headerNavSliceActions.setNavActive(navItem));
    if (navItem) router.push(Routes[navItem]);
  };

  const setAvatarItemsAsLogin = () => {
    dispatch(headerNavSliceActions.setAvatarItems([AvatarItem.LOGOUT]));
  };

  const setAvatarItemsAsLogout = () => {
    dispatch(headerNavSliceActions.setAvatarItems([AvatarItem.LOGIN]));
  };

  const setSearchLoading = (bool: boolean) => {
    dispatch(headerNavSliceActions.setSearchLoading(bool));
  };

  const resetSearchItems = () => {
    dispatch(headerNavSliceActions.setSearchItems([]));
  };

  const handleSearchPosts = async (query: string) => {
    if (query.length < 3) {
      dispatch(headerNavSliceActions.setSearchItems([]));
      return;
    }
    try {
      const res = await searchPostsService({ query });
      const searchItemsObj = res?.posts?.map((post) => {
        return {
          id: post.id,
          title: post.title,
          author: post.author,
          desc: post.desc,
          imageUrl: getLowResCloudinaryImg(post.imageUrl, 50) || emptyImg.src,
          authorPic: post.authorPic || '',
          createdAt: post.createdAt,
        };
      });
      dispatch(headerNavSliceActions.setSearchItems(searchItemsObj || []));
      return searchItemsObj;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    selectors: { navActive, navItems, avatarItems, searchItems, searchLoading },
    actions: {
      changeNav,
      setAvatarItemsAsLogin,
      setAvatarItemsAsLogout,
      handleSearchPosts,
      setSearchLoading,
      resetSearchItems,
    },
  };
};
