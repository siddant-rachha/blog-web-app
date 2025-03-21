'use client';

import { BlogNavContainer } from '@siddant-rachha/blog-components';
import { base64Logo } from '@/assets/base64Logo';
import { AvatarItem, NavItem } from '@/constants/globalConstants';
import { AuthModal } from './AuthModal';
import { useHeaderNavSlice } from '@/hooks/useHeaderNavSlice';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { useCallback, useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { useToast } from '@/hooks/useToast';

export default function LayoutWithNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    selectors: { navActive, navItems, avatarItems, searchItems, searchLoading },
    actions: { changeNav, handleSearchPosts, setSearchLoading },
  } = useHeaderNavSlice();
  const {
    selectors: { userDetails },
    actions: { authSignOut, setShowAuthModal },
  } = useAuthSlice();

  const { errorNotify } = useToast();

  const [noResults, setNoResults] = useState(false);

  const handleNavItem = (navItem: string) => {
    changeNav(navItem as NavItem);
  };

  // Debounced search function (waits 1000ms before triggering the search)
  const debouncedSearch = useCallback(
    debounce(async (item: string) => {
      try {
        const res = await handleSearchPosts(item);
        if (!res?.length) setNoResults(true);
      } catch (error) {
        errorNotify('Search failed');
        throw error;
      } finally {
        setSearchLoading(false);
      }
    }, 1000),
    [handleSearchPosts]
  );

  const handleSearchInput = (item: string) => {
    setNoResults(false);
    if (item.length >= 3) setSearchLoading(true);
    debouncedSearch(item);
  };

  const handleSearchItem = (item: { id: string; title: string }) => {
    console.log(item);
  };

  const handleAvatarItem = (item: string) => {
    const avatarItem = item as AvatarItem;
    if (avatarItem === AvatarItem.LOGIN) {
      setShowAuthModal(true);
    } else if (avatarItem === AvatarItem.LOGOUT) {
      authSignOut();
    }
  };

  const updatedSearchItems = useMemo(
    () =>
      searchItems.map((searchItem) => {
        return {
          ...searchItem,
          imgUrl: searchItem.imageUrl,
        };
      }),
    [searchItems]
  );

  return (
    <BlogNavContainer
      logoSrc={base64Logo}
      avatarSrc={userDetails?.photoURL || '.'}
      avatarName={userDetails?.displayName || 'Anonymous'}
      avatarItems={avatarItems}
      navItems={navItems}
      navActive={navActive}
      searchItems={updatedSearchItems}
      noResults={noResults}
      searchItemLoading={searchLoading}
      handleNavItem={handleNavItem}
      handleAvatarItem={handleAvatarItem}
      handleSearchInput={handleSearchInput}
      handleSearchItem={handleSearchItem}
    >
      <AuthModal />
      {children}
    </BlogNavContainer>
  );
}
