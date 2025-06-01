import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionEnquiryFormComponent } from './admission-enquiry-form.component';

describe('AdmissionEnquiryFormComponent', () => {
  let component: AdmissionEnquiryFormComponent;
  let fixture: ComponentFixture<AdmissionEnquiryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmissionEnquiryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmissionEnquiryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
