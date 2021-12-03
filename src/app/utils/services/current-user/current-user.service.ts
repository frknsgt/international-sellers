import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  public subject: BehaviorSubject<any>;
  private _cookieName: string = 'currentUser';

  constructor() {
    this.subject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem(this._cookieName))
    );
  }

  public get value() {
    return this.subject.value;
  }

  public set value(value) {
    localStorage.setItem(this._cookieName, JSON.stringify(value));
  }

  public clearValue() {
    localStorage.removeItem(this._cookieName);
  }
}
