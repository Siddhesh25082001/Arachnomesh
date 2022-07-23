import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationStatComponent } from './nomination-stat.component';

describe('NominationStatComponent', () => {
  let component: NominationStatComponent;
  let fixture: ComponentFixture<NominationStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
