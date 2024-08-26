import { RouteInfo } from './sidebar.metadata';

export const SIDEBAR_ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
    authenticated: [true,false],
    roles: []
  }
];

