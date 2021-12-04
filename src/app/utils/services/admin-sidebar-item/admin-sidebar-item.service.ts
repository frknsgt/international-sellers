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
      icon: 'far fa-building',
      link: '/admin/companies',
    },
    {
      title: 'Category List',
      icon: 'fas fa-th-list',
      link: '/admin/categories',
    },
    {
      title: 'Order List',
      icon: 'fas fa-shopping-cart',
      link: '/admin/orders',
    },
    {
      title: 'Product List',
      icon: 'fab fa-product-hunt',
      link: '/admin/products',
    },
  ];

  getChildUrlActiveState(path: string[]) {
    return path.find((x) => x == this._url.split('/')[2]) ? true : false;
  }
}
