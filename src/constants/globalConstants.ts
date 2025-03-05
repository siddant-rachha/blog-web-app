export enum NavItem {
  HOME = 'Home',
  CREATE_POST = 'Create Post',
}

export enum AvatarItem {
  LOGIN = 'Login',
  LOGOUT = 'Logout',
}

export const Routes = {
  [NavItem.HOME]: '/',
  [NavItem.CREATE_POST]: '/createpost',
};
