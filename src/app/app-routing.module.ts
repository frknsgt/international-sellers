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
  UserListComponent,
  AddUserComponent,
  InstitutionListComponent,
  AddCardComponent,
  CompetitionListComponent,
  GameConnectionComponent,
  IconListComponent,
  AddIconComponent,
  GameCreationComponent,
  AdminManagementComponent,
  GameManagementComponent,
  CardListComponent,
  ColorListComponent,
} from './pages';

import { Roles } from './models';
import { GameOverComponent } from './components';

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
        path: 'admin-control/:Id/:PassCode',
        component: AdminManagementComponent,
      },
      {
        path: 'game-connection',
        component: GameConnectionComponent,
      },
      {
        path: 'create',
        component: GameCreationComponent,
      },
      {
        path: 'game',
        component: GameManagementComponent,
        data: { title: 'Game', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'game-over',
        component: GameOverComponent,
        data: { title: 'Game', icon: 'fa fa-2x fa-home' },
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
      {
        path: 'users',
        component: UserListComponent,
        data: {
          title: 'User List',
          icon: 'fa fa-2x fa-user',
          authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
        },
      },
      {
        path: 'user/add',
        component: AddUserComponent,
        data: {
          title: 'Add User',
          icon: 'fa fa-2x fa-user',
          authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
        },
      },
      {
        path: 'user/edit/:Id',
        component: AddUserComponent,
        data: {
          title: 'Edit User',
          icon: 'fa fa-2x fa-user',
          authorize: [Roles.Root, Roles.Administrator, Roles.Manager],
        },
      },
      {
        path: 'user/profile',
        component: AddUserComponent,
        data: { title: 'Profile', icon: 'fa fa-2x fa-user' },
      },
      {
        path: 'institutions',
        component: InstitutionListComponent,
        data: {
          title: 'Institution List',
          icon: 'far fa-2x fa-building',
          authorize: [Roles.Root, Roles.Administrator],
        },
      },
      {
        path: 'colors',
        component: ColorListComponent,
        data: { title: 'Color List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'cards',
        component: CardListComponent,
        data: { title: 'Card List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'card/add',
        component: AddCardComponent,
        data: { title: 'Add Card', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'card/edit/:Id',
        component: AddCardComponent,
        data: { title: 'Card Edit', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'competitions',
        component: CompetitionListComponent,
        data: { title: 'Competition List', icon: 'fa fa-2x fa-gamepad' },
      },
      {
        path: 'icons',
        component: IconListComponent,
        data: { title: 'Icon List', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'icon/add',
        component: AddIconComponent,
        data: { title: 'Add Icon', icon: 'fa fa-2x fa-home' },
      },
      {
        path: 'icon/edit/:Id',
        component: AddIconComponent,
        data: { title: 'Icon Edit', icon: 'fa fa-2x fa-home' },
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
export class AppRoutingModule {}
export const routingComponents = [
  ClientLayoutComponent,
  HomepageComponent,
  LoginComponent,
];
