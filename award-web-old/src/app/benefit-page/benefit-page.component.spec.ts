import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitPageComponent } from './benefit-page.component';

describe('BenefitPageComponent', () => {
  let component: BenefitPageComponent;
  let fixture: ComponentFixture<BenefitPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BenefitPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
