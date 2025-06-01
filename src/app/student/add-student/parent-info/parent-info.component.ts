import { Component, OnInit } from '@angular/core';
import { materialImports } from '../../../shared/material-imports';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { FormDataServiceService } from '../../../services/form-data-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-parent-info',
  imports: [
    materialImports,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './parent-info.component.html',
  styleUrl: './parent-info.component.scss'
})

export class ParentInfoComponent implements OnInit{
  
  studentId : any;
  parentDetailsForm : FormGroup;

  constructor(private fb : FormBuilder, private formDataService: FormDataServiceService, private router: Router,
    private route: ActivatedRoute,
  ) {
    this.parentDetailsForm = this.fb.group({
      'selectedFatherName' : ['', Validators.required],
      'selectedFatherNumber' : ['', Validators.required],
      'selectedFatheOcp' : ['', Validators.required],
      'selectedFatherAdhar' : ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      'selectedMotherName' : ['', Validators.required],
      'selectedMotherNumber' : ['', Validators.required],
      'selectedMotherOcp' : ['', Validators.required],
      'selectedMotherAdhar' : ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
    });
  }

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      console.log('Student ID from parent route:', this.studentId);
    });
   this.bindFormData();
  }

  bindFormData() {
    this.formDataService.studentFormData$.subscribe(data => {
      if (data) {
        this.parentDetailsForm.patchValue({
          selectedFatherName: data.fatherName || '',
          selectedFatherNumber: data.fatherContactNumber || '',
          selectedFatheOcp: data.fatherOccupation || '',
          selectedFatherAdhar: data.fatherAadharNumber || '',
          selectedMotherName: data.motherName || '',
          selectedMotherNumber: data.motherContactNumber || '',
          selectedMotherOcp: data.motherOccupation || '',
          selectedMotherAdhar: data.motherAadharNumber || '',
        });     
      }

    });
  }
  
  onSubmit() {
    
  }

  nextStep() {
    const data = this.getFormData();
    this.formDataService.setFormData('parentDetails', data);
    if (this.studentId) {
      this.router.navigate([`/menu/student/add/${this.studentId}/address`]);
    } else {
      this.router.navigate(['/menu/student/add/address']);
    }
  }

  
getFormData() {
  return {
      fatherName: this.parentDetailsForm.get('selectedFatherName')?.value,
      fatherOccupation: this.parentDetailsForm.get('selectedFatheOcp')?.value,
      fatherContactNumber: this.parentDetailsForm.get('selectedFatherNumber')?.value,
      fatherAadharNumber: this.parentDetailsForm.get('selectedFatherAdhar')?.value,
      motherName: this.parentDetailsForm.get('selectedMotherName')?.value,
      motherOccupation: this.parentDetailsForm.get('selectedMotherOcp')?.value,
      motherContactNumber: this.parentDetailsForm.get('selectedMotherNumber')?.value,
      motherAadharNumber: this.parentDetailsForm.get('selectedMotherAdhar')?.value,
  };
}

previousPage() {
  if (this.studentId) {
    this.router.navigate([`/menu/student/add/${this.studentId}/info`]);
  } else {
    this.router.navigate(['/menu/student/add/info']);
  }
}

}
