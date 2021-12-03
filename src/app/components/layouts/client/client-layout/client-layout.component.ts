import { Component, ElementRef, OnInit } from '@angular/core';
import { FlakeAnimationService } from 'src/app/utils';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
})
export class ClientLayoutComponent implements OnInit {
  constructor(
    private _flakeAnimationService: FlakeAnimationService,
    private _elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this._flakeAnimationService.run(this._elementRef);
  }
}
