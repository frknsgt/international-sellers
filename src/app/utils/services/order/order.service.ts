import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _translateService: TranslateService,
    private _notificationService: NotificationService
  ) { }
  async listAsync() {
    return await this._apiFetchService.requestAsync('GET', 'order', null, true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      'order',
      values,
      true
    );
  }

  async findAsync(orderID) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `order/${orderID}`,
      null,
      true
    );
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'order',
      values,
      true
    );
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      'order',
      values,
      true
    );
  }

  errorNotification(error) {
    let errorMessage: string;
    switch (error.status) {
      case 400:
        this._translateService
          .get('order does not match !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 401:
        this._translateService
          .get('Unauthorized transaction !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 409:
        this._translateService
          .get('Such an user is already registered in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please enter correct user information !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 404:
        this._translateService
          .get('No order record found in the system !')
          .subscribe((value) => (errorMessage = value));
        break;
      default:
        this._translateService
          .get(
            'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
          )
          .subscribe((value) => (errorMessage = value));
        break;
    }
    this._notificationService.danger(errorMessage);
  }
}

