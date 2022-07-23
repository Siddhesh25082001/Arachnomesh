import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardHeaderComponent } from './admin-dashboard-header.component';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardHeaderComponent;
  let fixture: ComponentFixture<AdminDashboardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDashboardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
