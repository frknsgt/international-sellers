import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Roles } from '../../../models/';

@Injectable({
  providedIn: 'root',
})
export class AdminSidebarItemService {
  constructor(private _router: Router) {}

  _url = this._router.routerState.snapshot.url;
  menu: Array<object> = [
    {
      title: 'User Transactions',
      icon: 'fa fa-user',
      linkActive: ['/admin/users', '/admin/user/add'],
      submenuShowHide: this.getChildUrlActiveState(['user', 'users']),
      submenu: [
        {
          title: 'User List',
          icon: 'fa fa-address-book',
          link: '/admin/users',
        },
        {
          title: 'User Add',
          icon: 'fa fa-user-plus',
          link: '/admin/user/add',
        },
      ],
      authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
    },
    {
      title: 'Institutions',
      icon: 'far fa-building',
      link: '/admin/institutions',
      authorize: [Roles.Root, Roles.Administrator],
    },
    {
      title: 'Competitions',
      icon: 'fa fa-gamepad',
      link: '/admin/competitions',
    },
    {
      title: 'Color List',
      icon: 'fa fa-palette',
      link: '/admin/colors',
    },
    {
      title: 'Card Transactions',
      icon: 'fa fa-building',
      linkActive: ['/admin/cards', '/admin/card/add'],
      submenu: [
        {
          title: 'Card List',
          icon: 'fa fa-map',
          link: '/admin/cards',
        },
        {
          title: 'Card Add',
          icon: 'fa fa-plus-square',
          link: '/admin/card/add',
        },
      ],
    },
    {
      title: 'Icon Transactions',
      icon: 'fa fa-user',
      linkActive: ['/admin/icons', '/admin/icons/add'],
      submenuShowHide: this.getChildUrlActiveState(['user', 'users']),
      submenu: [
        {
          title: 'Icon List',
          icon: 'fa fa-address-book',
          link: '/admin/icons',
        },
        {
          title: 'Add Icon',
          icon: 'fa fa-user-plus',
          link: '/admin/icon/add',
        },
      ],
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
