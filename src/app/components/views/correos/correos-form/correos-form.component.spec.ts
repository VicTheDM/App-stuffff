import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorreosFormComponent } from './correos-form.component';

describe('CorreosFormComponent', () => {
  let component: CorreosFormComponent;
  let fixture: ComponentFixture<CorreosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CorreosFormComponent]
    });
    fixture = TestBed.createComponent(CorreosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
