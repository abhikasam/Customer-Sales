import { RouteInfo } from './sidebar.metadata';

export const SIDEBAR_ROUTES: RouteInfo[] = [
 
  {
    path: '/dashboard',
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: [],
    roles: []
  },
  {
    path: '/authors',
    title: 'Authors',
    icon: 'bi bi-file-earmark-person',
    class: '',
    extralink: false,
    submenu: [],
    roles: []
  },
  {
    path: '/books/all',
    title: 'books',
    icon: 'bi bi-book',
    class: '',
    extralink: false,
    submenu: [],
    roles: []
  }
];

