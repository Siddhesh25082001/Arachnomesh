import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNominationComponent } from './edit-nomination.component';

describe('EditNominationComponent', () => {
  let component: EditNominationComponent;
  let fixture: ComponentFixture<EditNominationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNominationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNominationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
