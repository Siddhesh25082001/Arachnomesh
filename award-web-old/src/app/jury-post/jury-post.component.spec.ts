import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JuryPostComponent } from './jury-post.component';

describe('JuryPostComponent', () => {
  let component: JuryPostComponent;
  let fixture: ComponentFixture<JuryPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JuryPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JuryPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
