import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrentUserService } from '../current-user/current-user.service';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class LearnService {
  constructor(
    private _http: HttpClient,
    private _currentUserService: CurrentUserService,
    private _notificationService: NotificationService
  ) { }

  requestAsync(
    method = 'GET',
    data?: object,
    getToken: boolean = false
  ) {
    return new Promise((resolve, reject) => {
      let config: object = {};
      if (data != null)
        if (method === 'GET') Object.assign(config, { params: data });
        else Object.assign(config, { body: data });
      if (getToken)
        Object.assign(config, {
          headers: {
            token: this._currentUserService.value.token,
          },
        });

      this._http
        .request<any>('GET', 'http://127.0.0.1:5000/users', config)
        .subscribe(
          (res) => resolve(res),
          (err) => {
            if (err.status == 417)
              this._notificationService.danger(
                'Make sure you send the data correctly!'
              );
            else if (err.status >= 400 && err.status < 500)
              this._notificationService.danger(err.message);
            else
              this._notificationService.danger(
                'Server error occurred, please try again later If the error persists, we ask you to report this to the authorities'
              );
            reject({
              status: err.status,
              message: err.error != undefined ? err.error.message : err.message,
            });
          }
        );
    });
  }
}
