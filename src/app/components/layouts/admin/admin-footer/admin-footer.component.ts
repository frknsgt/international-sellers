import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-footer',
  templateUrl: './admin-footer.component.html',
  styleUrls: ['./admin-footer.component.scss'],
})
export class AdminFooterComponent implements OnInit {
  constructor() {}

  appVersion = environment.version;

  ngOnInit(): void {}
}
