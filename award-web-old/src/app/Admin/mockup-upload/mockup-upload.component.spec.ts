import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockupUploadComponent } from './mockup-upload.component';

describe('MockupUploadComponent', () => {
  let component: MockupUploadComponent;
  let fixture: ComponentFixture<MockupUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockupUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockupUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
