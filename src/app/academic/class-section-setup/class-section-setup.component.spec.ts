import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSectionSetupComponent } from './class-section-setup.component';

describe('ClassSectionSetupComponent', () => {
  let component: ClassSectionSetupComponent;
  let fixture: ComponentFixture<ClassSectionSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassSectionSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassSectionSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
