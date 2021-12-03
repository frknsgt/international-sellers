import { Injectable } from '@angular/core';
import { ApiFetchService } from '../api-fetch/api-fetch.service';
import { Router } from '@angular/router';
import { CurrentUserService } from '../current-user/current-user.service';
import { generate } from 'generate-password-browser';
import { NotificationService } from 'src/app/utils';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _apiFetchService: ApiFetchService,
    private _router: Router,
    private _currentUserService: CurrentUserService,
    private _translateService: TranslateService,
    private _snackBar: MatSnackBar
  ) {}
  async loginAsync(user) {
    try {
      const response: any = await this._apiFetchService.requestAsync(
        'POST',
        'login',
        user
      );
      if (response.result) {
        this._currentUserService.value = response;
        this._currentUserService.subject.next(response);
        this._router.navigateByUrl('/');
      }
      return response;
    } catch (err) {}
  }
  async tokenDecodeAsync() {
    try {
      if (this._currentUserService.value) {
        return await this._apiFetchService.requestAsync(
          'GET',
          'token-decode',
          null,
          true
        );
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  creatingPassword(passwordLength: number = 8) {
    return generate({
      length: passwordLength,
      numbers: true,
    });
  }

  errorNotification(error) {
    let errorMessage: string;
    switch (error.status) {
      case 401:
        this._translateService
          .get('Unauthorized transaction !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 417:
        this._translateService
          .get('Please add a correct file type !')
          .subscribe((value) => (errorMessage = value));
        break;
      case 400:
        this._translateService
          .get('Your active password does not match !')
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
    this._snackBar.open(errorMessage, 'X', {
      duration: 3000,
      panelClass: 'notification__error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
  async logout(path = 'login') {
    this._currentUserService.clearValue();
    window.location.href = path;
  }

  updateProfileAsync(values) {
    return this._apiFetchService.requestAsync(
      'PUT',
      'my-account',
      values,
      true
    );
  }

  changePasswordAsync(values) {
    return this._apiFetchService.requestAsync(
      'PUT',
      'change-password',
      values,
      true
    );
  }

  deleteProfileAsync(values) {
    return this._apiFetchService.requestAsync(
      'DELETE',
      'my-account',
      values,
      true
    );
  }

  passwordControlAsync(values) {
    return this._apiFetchService.requestAsync(
      'POST',
      'password-control',
      values,
      true
    );
  }
}
