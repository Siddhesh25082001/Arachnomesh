import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryDashboardComponent } from './jury-dashboard.component';

describe('FooterComponent', () => {
  let component: JuryDashboardComponent;
  let fixture: ComponentFixture<JuryDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [JuryDashboardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
