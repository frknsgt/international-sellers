import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../utils/services';
import { LanguageService, NotificationService } from '../../../utils';
import { User } from '../../../models/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _languageService: LanguageService,
    private _notificationService: NotificationService
  ) {}

  model: User = new User();

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this._authService.loginAsync(loginForm.value);
    } else {
      this._notificationService.danger('Please fill in the required fields', {
        horizontalPosition: 'center',
      });
    }
  }

  useLanguage(language: string) {
    this._languageService.setLanguage(language);
  }
}
