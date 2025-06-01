import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { materialImports } from '../../../shared/material-imports';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LeavePageComponent } from '../../../shared/leave-page/leave-page.component';
import { AppService } from '../../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admission-enquiry-form',
  imports: [
    materialImports,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './admission-enquiry-form.component.html',
  styleUrl: './admission-enquiry-form.component.scss'
})
export class AdmissionEnquiryFormComponent implements OnInit{
  isSubmitting = false;
  success_msg: string = '';
  error_msg: string = '';
  common_msg: string = '';
  admissionEnquiryForm: FormGroup;  
  isEdited: boolean = false;

  constructor(public dialogRef: MatDialogRef<AdmissionEnquiryFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    private fb: FormBuilder, private appService: AppService) {

    this.admissionEnquiryForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      description: [''],
      note: [''],
      refernces: ['', Validators.required],
      sources: ['', Validators.required],
      class: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.bindDataOnAdmissionEnquiryForm();
    
  }

  bindDataOnAdmissionEnquiryForm() {
    if (this.data && this.data.enquiry) {
      this.isEdited = true;
      // this.admissionEnquiryForm.patchValue(this.data.enquiry);
      this.admissionEnquiryForm.patchValue({
        name: this.data.enquiry.name,
        phone: this.data.enquiry.mobile,          
        email: this.data.enquiry.email,
        address: this.data.enquiry.address,
        description: '',               
        note: '',                       
        refernces: this.data.enquiry.reference,   
        sources: this.data.enquiry.sources,
        class: this.data.enquiry.classId        
      });
    }
  }

  onSubmit(){
    if (this.admissionEnquiryForm.valid) {
      this.isSubmitting = true;
      const payload = {
          "name": this.admissionEnquiryForm.get('name')?.value,
          "email":this.admissionEnquiryForm.get('email')?.value,
          "mobile": this.admissionEnquiryForm.get('phone')?.value,
          "address": this.admissionEnquiryForm.get('address')?.value,
          "classId": this.admissionEnquiryForm.get('class')?.value,
          "reference": this.admissionEnquiryForm.get('refernces')?.value,
          "sources": this.admissionEnquiryForm.get('sources')?.value
      }
      // const formData = this.admissionEnquiryForm.value;
      const apiCall = this.isEdited
      ? this.appService.updateAdmissionEnquiryById(this.data.enquiry.id, payload)
      : this.appService.saveAdmissionEnquiry(payload);
  
      apiCall.subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.success_msg = 'Congratulation! Details are saved successfully.';
          this.common_msg = 'Please use X button to close the pop-up.';
          this.admissionEnquiryForm.markAsPristine();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Form submission error:', error);
          this.error_msg = 'Failed to save the details. Please try again!';
          this.isSubmitting = false;
        }
      });
    } else {
      this.admissionEnquiryForm.markAllAsTouched();
    }
  }

  

  onClose(): void {
    if(this.admissionEnquiryForm.dirty) {
      this.dialog.open(LeavePageComponent, {
        width: '430px',
        height: 'auto',
        panelClass: 'Leave-Page-dialog',
        disableClose: true
      });
    }
    else {
      this.dialogRef.close();
    }
  }
}
