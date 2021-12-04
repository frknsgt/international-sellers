import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminLayoutModule } from './pages/admin/admin-layout.module';
import { MatModule } from './utils';
import { ColorPickerModule } from 'ngx-color-picker';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

import {
  PasswordChangeComponent,
  PasswordControlWindowComponent,
  AddCategoryComponent,
  ProductCartComponent,
  OfferComponent,
  AddCompanyComponent,
  AddProductComponent
} from './components';
import {
  HomepageComponent,
  CategoryListComponent,
  AboutComponent,
  ProductComponent,
  ShopComponent,
  CompanyListComponent,
  OrderListComponent,
  ProductListComponent,
} from './pages';
import {
  ClientFooterComponent,
  ClientHeaderComponent,
} from './components/layouts';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PasswordChangeComponent,
    HomepageComponent,
    PasswordControlWindowComponent,
    ClientHeaderComponent,
    ClientFooterComponent,
    CompanyListComponent,
    OfferComponent,
    OrderListComponent,
    ProductCartComponent,
    CategoryListComponent,
    AboutComponent,
    ProductListComponent,
    ProductComponent,
    ShopComponent,
    AddCategoryComponent,
    AddCompanyComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ColorPickerModule,
    RouterModule,
    FormsModule,
    MatSnackBarModule,
    MatModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
