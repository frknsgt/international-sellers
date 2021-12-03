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
  ProductComponent
} from './pages';
import { ShopComponent } from './pages/client/shop/shop.component';


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
        path: 'product',
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
        data: { title: '', icon: 'fa fa-2x fa-home' },
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
