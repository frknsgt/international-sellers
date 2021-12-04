import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  AddProductComponent,
  DialogWindowComponent,
} from '../../../components';
import { ProductService } from 'src/app/utils/services/product/product.service';
import { NotificationService } from 'src/app/utils';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  constructor(
    private _dialog: MatDialog,
    private _productService: ProductService,
    private _notificationService: NotificationService
  ) {}
  searchText: string;
  products: any[];
  paginationConfig = {
    id: 'product',
    itemsPerPage: 5,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.products = <Array<any>>(
        await this._productService.listAsync()
      );
      console.log(this.products)
    } catch (error) {
      this._productService.errorNotification(error);
    }
  }
  openAddProduct(Id = null) {
    const diologRef = this._dialog.open(AddProductComponent, {
      width: '400px',
      data:
        Id == null
          ? null
          : this.products.find((category) => category.Id == Id),
    });
    diologRef.afterClosed().subscribe((result: any) => {
      if (result) this.ngOnInit();
    });
  }

  async productDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the product ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._productService.deleteAsync({ Id });
          this.products.splice(
            this.products.findIndex((category) => category.Id == Id),
            1
          );
          this._notificationService.success('Product information was successfully deleted')
        } catch (error) {
          this._productService.errorNotification(error);
        }
      }
    });
  }
}
