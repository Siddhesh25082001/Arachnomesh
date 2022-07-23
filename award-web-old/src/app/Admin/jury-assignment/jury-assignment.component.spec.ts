import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryAssignmentComponent } from './jury-assignment.component';

describe('JuryAssignmentComponent', () => {
  let component: JuryAssignmentComponent;
  let fixture: ComponentFixture<JuryAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuryAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuryAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
