import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { materialImports } from '../../../shared/material-imports';
// import { StudentFormComponent } from '../student-form/student-form.component';
import { FormDataServiceService } from '../../../services/form-data-service.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-miscellaneousinfo',
  imports: [
    materialImports,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './miscellaneousinfo.component.html',
  styleUrl: './miscellaneousinfo.component.scss'
})
export class MiscellaneousinfoComponent implements OnInit{

  bankDetailForm: FormGroup;
  studentId: any;

  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataServiceService,
    private route: ActivatedRoute,
  ) {

    this.bankDetailForm = this.fb.group({
      'selectedAccountNo' : ['', Validators.required],
      'selectedBankName' : ['', Validators.required],
      'selectedIfscCode' : ['', Validators.required],
      'selectedSamagraId' : ['', Validators.required],
      'selectedUID' : ['', Validators.required],
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
      if (data?.bankDetail) {
        this.bankDetailForm.patchValue({
          selectedAccountNo: data.bankDetail?.accountNumber || '',
          selectedBankName: data.bankDetail?.bankName || '',
          selectedIfscCode: data.bankDetail?.ifscCode || '',
          selectedSamagraId: data.bankDetail?.samagaraId || '',
          selectedUID: data.bankDetail?.uid || '',
        });
      }

    });
  }

  onSubmit() {

  }

// getFormData() {
//   return this.bankDetailForm.value;
// }

  nextStep() {
    const data = this.getFormData();
    this.formDataService.setFormData('bankDetails', data);
    if (this.studentId) {
      this.router.navigate([`/menu/student/add/${this.studentId}/upload-doc`]);
    } else {
      this.router.navigate(['/menu/student/add/upload-doc']);
    }
  }

  getFormData() {
    return {
      bankDetail: {
        accountNumber: this.bankDetailForm.get('selectedAccountNo')?.value,
        bankName: this.bankDetailForm.get('selectedBankName')?.value,
        state: 0,
        city: 0,
        ifscCode: this.bankDetailForm.get('selectedIfscCode')?.value,
        uid: this.bankDetailForm.get('selectedUID')?.value,
        samagaraId: this.bankDetailForm.get('selectedSamagraId')?.value,
        branchName: 'pune',
      }
    };
  }

  previousPage() {
    if (this.studentId) {
      this.router.navigate([`/menu/student/add/${this.studentId}/address`]);
    } else {
      this.router.navigate(['/menu/student/add/address']);
    }
  }

}
