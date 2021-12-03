import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DialogWindowComponent } from './dialog-window.component';

describe('DialogWindowComponent', () => {
  let component: DialogWindowComponent;
  let fixture: ComponentFixture<DialogWindowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
