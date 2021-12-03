import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdminControlSidebarComponent } from './admin-control-sidebar.component';

describe('AdminControlSidebarComponent', () => {
  let component: AdminControlSidebarComponent;
  let fixture: ComponentFixture<AdminControlSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminControlSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
