import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicFormComponent } from './academic-form.component';

describe('AcademicFormComponent', () => {
  let component: AcademicFormComponent;
  let fixture: ComponentFixture<AcademicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
