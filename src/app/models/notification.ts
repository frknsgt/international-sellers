import {
  MatSnackBarVerticalPosition,
  MatSnackBarHorizontalPosition
} from '@angular/material/snack-bar';

export interface NotificationOptions {
  buttonText?: string;
  duration?: number;
  panelClass?: string;
  horizontalPosition?: MatSnackBarHorizontalPosition;
  verticalPosition?: MatSnackBarVerticalPosition;
}

export enum NotificationPanelClass {
  success = 'notification__success',
  danger = 'notification__danger',
  warning = 'notification__warning',
  primary = 'notification__primary',
  secondary = 'notification__secondary',
  info = 'notification__info'
}
