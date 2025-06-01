import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectSetupComponent } from './subject-setup.component';

describe('SubjectSetupComponent', () => {
  let component: SubjectSetupComponent;
  let fixture: ComponentFixture<SubjectSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
