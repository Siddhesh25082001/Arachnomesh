import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NominationSliderComponent } from './nomination-slider.component';

describe('NominationSliderComponent', () => {
  let component: NominationSliderComponent;
  let fixture: ComponentFixture<NominationSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NominationSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NominationSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
