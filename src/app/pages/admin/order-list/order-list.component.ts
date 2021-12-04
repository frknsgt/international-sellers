import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  DialogWindowComponent,
} from '../../../components';
import { OrderService } from 'src/app/utils/services';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private _translateService: TranslateService,
    private _dialog: MatDialog,
    private _orderService: OrderService
  ) {}
  searchText: string;
  orders: any[];
  paginationConfig = {
    id: 'order',
    itemsPerPage: 5,
    currentPage: 1,
  };

  async ngOnInit() {
    try {
      this.orders = <Array<any>>(
        await this._orderService.listAsync()
      );
    } catch (error) {
      this._orderService.errorNotification(error);
    }
  }

  async orderDelete(Id) {
    const diologRef = this._dialog.open(DialogWindowComponent, {
      data: {
        message: 'Are you sure you want to delete the order ?',
        icon: 'fa fa-exclamation',
      },
    });

    diologRef.afterClosed().subscribe(async (result: boolean) => {
      if (result) {
        try {
          await this._orderService.deleteAsync({ Id });
          this.orders.splice(
            this.orders.findIndex((category) => category.Id == Id),
            1
          );
          let notificationMessage: string;
          this._translateService
            .get('Order information was successfully deleted')
            .subscribe((value) => (notificationMessage = value));
          this._snackBar.open(notificationMessage, 'X', {
            duration: 3000,
            panelClass: 'notification__success',
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
          });
        } catch (error) {
          this._orderService.errorNotification(error);
        }
      }
    });
  }
}
