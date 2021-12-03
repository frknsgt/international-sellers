import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _translateService: TranslateService,
    private _notificationService: NotificationService
  ) { }
  async listAsync() {
    return await this._apiFetchService.requestAsync('GET', 'category', null, true);
  }

  async deleteAsync(values) {
    return await this._apiFetchService.requestAsync(
      'DELETE',
      'category',
      values,
      true
    );
  }

  async findAsync(categoryID) {
    return await this._apiFetchService.requestAsync(
      'GET',
      `category/${categoryID}`,
      null,
      true
    );
  }

  async insertAsync(values) {
    return await this._apiFetchService.requestAsync(
      'POST',
      'category',
      values,
      true
    );
  }

  async updateAsync(values) {
    return await this._apiFetchService.requestAsync(
      'PUT',
      'category',
      values,
      true
    );
  }

  errorNotification(error) {
    let errorMessage: string;
    switch (error.status) {
      case 400:
        this._translateService
          .get('category does not match !')
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
          .get('No category record found in the system !')
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

