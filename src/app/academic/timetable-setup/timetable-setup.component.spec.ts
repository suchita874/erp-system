import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSetupComponent } from './timetable-setup.component';

describe('TimetableSetupComponent', () => {
  let component: TimetableSetupComponent;
  let fixture: ComponentFixture<TimetableSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetableSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetableSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
