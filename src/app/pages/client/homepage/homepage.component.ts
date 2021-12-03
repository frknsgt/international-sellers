import { Component, OnInit } from '@angular/core';
import { Roles } from 'src/app/models';
import {
  AuthService,
  CurrentUserService,
  LanguageService,
} from 'src/app/utils';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private currentUserService: CurrentUserService,
    private _languageService: LanguageService
  ) {}

  lang: string =
    this._languageService.getLanguage() == 'en'
      ? 'us'
      : this._languageService.getLanguage() || 'tr';
  isLogin: boolean =
    [
      Roles.Administrator,
      Roles.Root,
      Roles.Manager,
      Roles.Editor,
      Roles.Moderator,
    ].indexOf(this.currentUserService.value?.result?.UserTypeName) !== -1;

  ngOnInit(): void {}

  logout() {
    this._authService.logout('/');
  }

  setLang(lang: string) {
    this.lang = lang == 'en' ? 'us' : lang;
    this._languageService.setLanguage(lang);
  }
}
