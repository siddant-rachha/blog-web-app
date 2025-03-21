export enum NavItem {
  HOME = 'Home',
  CREATE_POST = 'Create Post',
  MY_POST = 'My Posts',
}

export enum AvatarItem {
  LOGIN = 'Login',
  LOGOUT = 'Logout',
}

export const Routes = {
  [NavItem.HOME]: '/',
  [NavItem.CREATE_POST]: '/createpost',
  [NavItem.MY_POST]: '/myposts',
} as const;
