'use client';

import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { base64Logo } from '@/assets/base64Logo';
import { AvatarItem, NavItem, RoutesWC } from '@/constants/globalConstants';
import { useAuthSlice } from '@/hooks/useAuthSlice';
import { useHeaderNavSlice } from '@/hooks/useHeaderNavSlice';
import { useToast } from '@/hooks/useToast';
import { AuthModal } from '../CommonComponents/AuthModal';
import { EventConsumer, RemoveEvent } from './CustomEventHanlder';

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

  const handleNavItem = useCallback((navItem: string) => {
    changeNav(navItem as NavItem);
  }, []);

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

  const handleSearchInput = useCallback((item: string) => {
    setNoResults(false);
    resetSearchItems();
    debouncedSearch(item);
  }, []);

  const handleSearchItem = useCallback(
    (item: { id: string; title: string }) => {
      router.push(`${RoutesWC['Read Post']}?id=${item.id}`);
    },
    []
  );

  const handleAvatarItem = useCallback((item: string) => {
    const avatarItem = item as AvatarItem;
    if (avatarItem === AvatarItem.LOGIN) {
      setShowAuthModal(true);
    } else if (avatarItem === AvatarItem.LOGOUT) {
      authSignOut();
    }
  }, []);

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

  useEffect(() => {
    // register custom events
    EventConsumer('handleAvatarItemWC', handleAvatarItem);
    EventConsumer('handleNavItemWC', handleNavItem);
    EventConsumer('handleSearchItemWC', handleSearchItem);
    EventConsumer('handleSearchInputWC', handleSearchInput);
    return () => {
      RemoveEvent('handleAvatarItemWC');
      RemoveEvent('handleNavItemWC');
      RemoveEvent('handleSearchItemWC');
      RemoveEvent('handleSearchInputWC');
    };
  }, []);

  return (
    <>
      <blog-nav-container
        logo-src={base64Logo}
        avatar-src={userDetails?.photoURL || ''}
        nav-items={JSON.stringify(navItems)}
        nav-active={navActive}
        avatar-name={userDetails?.displayName || 'Anonymous'}
        avatar-items={JSON.stringify(avatarItems)}
        search-items={JSON.stringify(updatedSearchItems)}
        no-results={noResults}
        search-item-loading={searchLoading}
      />
      <Box width="100%" sx={{ padding: { xs: 1, sm: 2, md: 3 } }}>
        <AuthModal />
        {children}
      </Box>
      <Typography
        color="text.disabled"
        fontStyle={'italic'}
        position={'fixed'}
        sx={{ bottom: { xs: '5%', md: '10%' }, right: { xs: '5%', md: '10%' } }}
        fontFamily={'fantasy'}
      >
        These are web components
      </Typography>
    </>
  );
}
