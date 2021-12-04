import { Component, ElementRef, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/utils';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
})
export class ClientLayoutComponent implements OnInit {
  constructor(private _languageService: LanguageService,
  ) {}
  lang: string =
  this._languageService.getLanguage() == 'en'
    ? 'us'
    : this._languageService.getLanguage() || 'tr';
  ngOnInit(): void {
  }
  setLang(lang: string) {
    this.lang = lang == 'en' ? 'us' : lang;
    this._languageService.setLanguage(lang);
  }
}
