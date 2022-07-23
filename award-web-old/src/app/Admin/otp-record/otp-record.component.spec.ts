import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpRecordComponent } from './otp-record.component';

describe('OtpRecordComponent', () => {
  let component: OtpRecordComponent;
  let fixture: ComponentFixture<OtpRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
