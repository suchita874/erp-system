import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorListFormComponent } from './visitor-list-form.component';

describe('VisitorListFormComponent', () => {
  let component: VisitorListFormComponent;
  let fixture: ComponentFixture<VisitorListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorListFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitorListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
