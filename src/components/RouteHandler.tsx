import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NavItem, Routes } from '@/constants/globalConstants';
import { useBlogNav } from '@/hooks/useBlogNav';

export const RouteHandler = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const {
    actions: { changeNav },
  } = useBlogNav();

  useEffect(() => {
    if ((pathname as NavItem) === Routes[NavItem.HOME]) {
      changeNav(NavItem.HOME);
    }

    if ((pathname as NavItem) === Routes[NavItem.CREATE_POST]) {
      changeNav(NavItem.CREATE_POST);
    }
    console.log(Routes[NavItem.CREATE_POST]);
  }, []);

  return <>{children}</>;
};
