export enum NavItem {
  HOME = 'Home',
  CREATE_POST = 'Create Post',
  MY_POST = 'My Posts',
  WEB_COMPONENTS = 'Web Components',
  MODULE_COMPONENTS = 'Module Components',
}

export enum AvatarItem {
  LOGIN = 'Login',
  LOGOUT = 'Logout',
}

export const Routes = {
  [NavItem.HOME]: '/',
  [NavItem.CREATE_POST]: '/createpost',
  [NavItem.MY_POST]: '/myposts',
  [NavItem.WEB_COMPONENTS]: '/webcomponents',
  [NavItem.MODULE_COMPONENTS]: '/',
  'Read Post': '/post',
  'Edit Post': '/editpost',
} as const;

export const RoutesWC = {
  [NavItem.HOME]: '/webcomponents',
  [NavItem.CREATE_POST]: '/webcomponents/createpost',
  [NavItem.MY_POST]: '/webcomponents/myposts',
  [NavItem.MODULE_COMPONENTS]: '/',
  [NavItem.WEB_COMPONENTS]: '/webcomponents',
  'Read Post': '/webcomponents/post',
  'Edit Post': '/webcomponents/editpost',
} as const;
