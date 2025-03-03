'use client';
import { BlogNavContainer } from '@siddant-rachha/blog-components';
import { base64Logo } from '@/assets/base64Logo';
import { NavItem } from './constants/globalConstants';
import { useBlogNav } from './hooks/useBlogNav';

export default function Page() {
  const {
    selectors: { navActive, navItems, avatarItems, avatarSrc },
    actions: { changeNav },
  } = useBlogNav();

  const handleNavItem = (navItem: string) => {
    changeNav(navItem as NavItem);
  };

  const handleAvatarItem = (item: string) => {
    console.log(item);
  };

  const handleSearchInput = (item: string) => {
    console.log(item);
  };

  const handleSearchItem = (item: string) => {
    console.log(item);
  };

  return (
    <BlogNavContainer
      logoSrc={base64Logo}
      avatarSrc={avatarSrc}
      avatarItems={avatarItems}
      navItems={navItems}
      navActive={navActive}
      searchItems={[]}
      handleNavItem={handleNavItem}
      handleAvatarItem={handleAvatarItem}
      handleSearchInput={handleSearchInput}
      handleSearchItem={handleSearchItem}
    >
      <h1>Home</h1>
    </BlogNavContainer>
  );
}
