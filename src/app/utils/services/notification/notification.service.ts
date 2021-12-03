import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationOptions, NotificationPanelClass } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private _matSnackBar: MatSnackBar,
    private _translateService: TranslateService
  ) {}

  private _sendNotification(
    message: string,
    options?: NotificationOptions
  ): void {
    this._translateService.get(message).subscribe(value => (message = value));
    this._matSnackBar.open(message, options?.buttonText || 'X', {
      duration: options?.duration || 5000,
      panelClass: options?.panelClass || NotificationPanelClass.success,
      verticalPosition: options?.verticalPosition || 'bottom',
      horizontalPosition: options?.horizontalPosition || 'right'
    });
  }

  success(
    message: string,
    {
      buttonText,
      duration,
      horizontalPosition,
      verticalPosition
    }: NotificationOptions = {}
  ): void {
    this._sendNotification(message, {
      buttonText,
      duration,
      panelClass: NotificationPanelClass.success,
      horizontalPosition,
      verticalPosition
    });
  }

  danger(
    message: string,
    {
      buttonText,
      duration,
      horizontalPosition,
      verticalPosition
    }: NotificationOptions = {}
  ): void {
    this._sendNotification(message, {
      buttonText,
      duration,
      panelClass: NotificationPanelClass.danger,
      horizontalPosition,
      verticalPosition
    });
  }

  warning(
    message: string,
    {
      buttonText,
      duration,
      horizontalPosition,
      verticalPosition
    }: NotificationOptions = {}
  ): void {
    this._sendNotification(message, {
      buttonText,
      duration,
      panelClass: NotificationPanelClass.warning,
      horizontalPosition,
      verticalPosition
    });
  }

  info(
    message: string,
    {
      buttonText,
      duration,
      horizontalPosition,
      verticalPosition
    }: NotificationOptions = {}
  ): void {
    this._sendNotification(message, {
      buttonText,
      duration,
      panelClass: NotificationPanelClass.info,
      horizontalPosition,
      verticalPosition
    });
  }

  primary(
    message: string,
    {
      buttonText,
      duration,
      horizontalPosition,
      verticalPosition
    }: NotificationOptions = {}
  ): void {
    this._sendNotification(message, {
      buttonText,
      duration,
      panelClass: NotificationPanelClass.primary,
      horizontalPosition,
      verticalPosition
    });
  }

  secondary(
    message: string,
    {
      buttonText,
      duration,
      horizontalPosition,
      verticalPosition
    }: NotificationOptions = {}
  ): void {
    this._sendNotification(message, {
      buttonText,
      duration,
      panelClass: NotificationPanelClass.secondary,
      horizontalPosition,
      verticalPosition
    });
  }
}
