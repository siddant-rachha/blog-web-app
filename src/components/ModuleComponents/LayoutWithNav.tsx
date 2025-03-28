'use client';

import { Typography } from '@mui/material';
import { BlogNavContainer } from '@siddant-rachha/blog-components';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { base64Logo } from '@/assets/base64Logo';
import { AvatarItem, NavItem, Routes } from '@/constants/globalConstants';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { useHeaderNavSlice } from '@/hooks/useHeaderNavSlice';
import { useToast } from '@/hooks/useToast';
import { AuthModal } from '../CommonComponents/AuthModal';

export default function LayoutWithNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const {
    selectors: { navActive, navItems, avatarItems, searchItems, searchLoading },
    actions: {
      changeNav,
      handleSearchPosts,
      setSearchLoading,
      resetSearchItems,
    },
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
        setSearchLoading(true);
        setNoResults(false);
        resetSearchItems();
        if (item.length >= 3) {
          // setting the search items in this handler
          const res = await handleSearchPosts(item);
          if (!res?.length) {
            setNoResults(true);
            resetSearchItems();
          }
        }
      } catch (error) {
        errorNotify('Search failed');
        throw error;
      } finally {
        setSearchLoading(false);
      }
    }, 300),
    // do not add dependencies in debounced function
    []
  );

  const handleSearchInput = (item: string) => {
    setNoResults(false);
    resetSearchItems();
    debouncedSearch(item);
  };

  const handleSearchItem = (item: { id: string; title: string }) => {
    router.push(`${Routes['Read Post']}?id=${item.id}`);
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
      avatarSrc={userDetails?.photoURL || ''}
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
      <Typography
        color="text.disabled"
        fontStyle={'italic'}
        position={'fixed'}
        sx={{
          bottom: { xs: '5%', md: '10%' },
          right: { xs: '5%', md: '10%' },
          pointerEvents: 'none',
        }}
        fontFamily={'fantasy'}
      >
        These are npm module components
      </Typography>
    </BlogNavContainer>
  );
}
