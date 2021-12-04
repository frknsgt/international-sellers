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
      title: 'Company List',
      icon: 'fa fa-palette',
      link: '/admin/companies',
    },
    {
      title: 'Category List',
      icon: 'fa fa-palette',
      link: '/admin/categories',
    },
    {
      title: 'Order List',
      icon: 'fa fa-palette',
      link: '/admin/orders',
    },
    {
      title: 'Product List',
      icon: 'fa fa-palette',
      link: '/admin/products',
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
