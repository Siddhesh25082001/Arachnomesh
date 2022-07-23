import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPollingComponent } from './user-polling.component';

describe('UserPollingComponent', () => {
  let component: UserPollingComponent;
  let fixture: ComponentFixture<UserPollingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPollingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPollingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
