import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './utils/guards';
import {
  ClientLayoutComponent,
  AdminLayoutComponent,
} from './components/layouts';
import {
  HomepageComponent,
  DashboardComponent,
  LoginComponent,
  AboutComponent,
  ProductComponent,
  CategoryListComponent,
  ShopComponent,
  CompanyListComponent,
  OrderListComponent,
  ProductListComponent
} from './pages';


const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'product/:Id',
        component: ProductComponent,
      },
      {
        path: 'shop',
        component: ShopComponent,
      },
      {
        path: 'about',
        component: AboutComponent
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'categories',
        component: CategoryListComponent,
        data: { title: 'Category List', icon: 'fas fa-th-list fa-2x' },
      },
      {
        path: 'companies',
        component: CompanyListComponent,
        data: { title: 'Company List', icon: 'far fa-building fa-2x' },
      },
      {
        path: 'orders',
        component: OrderListComponent,
        data: { title: 'Order List', icon: 'fas fa-shopping-cart fa-2x' },
      },
      {
        path: 'products',
        component: ProductListComponent,
        data: { title: 'Product List', icon: 'fab fa-product-hunt fa-2x' },
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
export const routingComponents = [
  ClientLayoutComponent,
  HomepageComponent,
  LoginComponent,
];
