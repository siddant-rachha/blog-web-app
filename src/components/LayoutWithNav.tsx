'use client';

import { BlogNavContainer } from '@siddant-rachha/blog-components';
import { base64Logo } from '@/assets/base64Logo';
import { AvatarItem, NavItem } from '@/constants/globalConstants';
import { AuthModal } from './AuthModal';
import { useHeaderNavSlice } from '@/hooks/useHeaderNavSlice';
import { useAuthSlice } from '@/hooks/useAuthSlice';

export default function LayoutWithNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    selectors: { navActive, navItems, avatarItems },
    actions: { changeNav },
  } = useHeaderNavSlice();
  const {
    selectors: { userDetails },
    actions: { authSignOut, setShowAuthModal },
  } = useAuthSlice();

  const handleNavItem = (navItem: string) => {
    changeNav(navItem as NavItem);
  };

  const handleSearchInput = (item: string) => {
    console.log(item);
  };

  const handleSearchItem = (item: string) => {
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

  return (
    <BlogNavContainer
      logoSrc={base64Logo}
      avatarSrc={userDetails?.photoURL || '.'}
      avatarName={userDetails?.displayName || 'Anonymous'}
      avatarItems={avatarItems}
      navItems={navItems}
      navActive={navActive}
      searchItems={[]}
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
