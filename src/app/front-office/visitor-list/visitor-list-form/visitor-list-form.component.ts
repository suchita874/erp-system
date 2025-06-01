
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_DATE_FORMATS } from '../../../shared/material-imports'; // your custom formats
import { AppService } from '../../../services/app.service';
import { LeavePageComponent } from '../../../shared/leave-page/leave-page.component';



@Component({
  selector: 'app-visitor-list-form',
  imports: [
    // ...materialImports, 
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    DatePipe
  ],
  templateUrl: './visitor-list-form.component.html',
  styleUrl: './visitor-list-form.component.scss'
})

export class VisitorListFormComponent implements OnInit{
  visitorForm: FormGroup;
  isSubmitting = false;
  success_msg: string = '';
  common_msg: string = '';
  error_msg: string = '';
  isEdited = false;


  constructor(public dialogRef: MatDialogRef<VisitorListFormComponent >, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private fb: FormBuilder,
    private appService: AppService, private datePipe: DatePipe, private dateAdapter: DateAdapter<any>,
  ) {

    this.visitorForm = this.fb.group({
      purpose: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$')]],
      idCard: ['', Validators.required],
      numberOfPersons: ['', Validators.required],
      date: ['', Validators.required],
      inTime: ['', Validators.required],
      outTime: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    const testDate = new Date(2025, 4, 25); // May 25, 2025
    const formatted = this.dateAdapter.format(testDate, 'input');
    console.log('Formatted Date (Native):', formatted);

   this.bindDataOnVisitorForm();
  }

  bindDataOnVisitorForm() {
    if (this.data && this.data.visitor) {
      this.isEdited = true;
      const visitor = this.data.visitor;
  
      const inTime = this.convertTimeStringToInput(visitor.inTime);
      const outTime = this.convertTimeStringToInput(visitor.outTime);
  
      this.visitorForm.patchValue({
        purpose: visitor.purpose,
        name: visitor.name,
        phone: visitor.phone,
        idCard: visitor.idCard,
        numberOfPersons: visitor.numberOfPersons,
        date: visitor.date,
        inTime: inTime,
        outTime: outTime,
        address: visitor.address ?? '' // fallback if null
      });
    } else {
      this.data.visitor = {};
    }
  }

  // convertLocalTimeToInputTime(timeObj: any): string | null {
  //   if (!timeObj || timeObj.hour === undefined || timeObj.minute === undefined) {
  //     return null;
  //   }
  //   const hours = String(timeObj.hour).padStart(2, '0');
  //   const minutes = String(timeObj.minute).padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // }

  convertTimeStringToInput(time: string): string | null {
    if (!time) return null;
  
    const parts = time.split(':');
    if (parts.length < 2) return null;
  
    const hours = parts[0].padStart(2, '0');
    const minutes = parts[1].padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

  formatDate(date: any): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }
  
  formatTimeToString(time: any): string | null {
    if (!time) return null;
  
    // Input will be a string like "13:45" or "13:45:00"
    if (typeof time === 'string' && /^\d{1,2}:\d{2}(:\d{2})?$/.test(time)) {
      const parts = time.split(':');
      const hours = parts[0].padStart(2, '0');
      const minutes = parts[1].padStart(2, '0');
      const seconds = (parts[2] || '00').padStart(2, '0');
      return `${hours}:${minutes}:${seconds}`;
    }
  
    return null; // Invalid format
  }
  

  onSubmit(){
    if (this.visitorForm.valid) {
      this.isSubmitting = true;
     
      const payload = this.preparePayload();
      // const payload = this.visitorForm.value();

      const visitorId = this.data?.visitor?.id;
      const apiCall = this.isEdited && visitorId
        ? this.appService.updateVisitorsDetailById(visitorId, payload)
        : this.appService.saveVisitorsDetail(payload);

      apiCall.subscribe({
        next: (response) => {
          console.log('Form submitted successfully:', response);
          this.success_msg = 'Congratulation! Details are saved successfully.';
          this.common_msg = 'Please use X button to close the pop-up.';
          this.visitorForm.markAsPristine();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Form submission error:', error);
          this.error_msg = 'Failed to save the details. Please try again!';
          this.isSubmitting = false;
        }
      });
    } else {
      this.visitorForm.markAllAsTouched();
    }
  }

  preparePayload(){
    const payload = {
      purpose: this.visitorForm.get('purpose')?.value,
      name: this.visitorForm.get('name')?.value,
      phone: this.visitorForm.get('phone')?.value,
      idCard: this.visitorForm.get('idCard')?.value,
      numberOfPersons: this.visitorForm.get('numberOfPersons')?.value,
      date: this.datePipe.transform(this.visitorForm.get('date')?.value, 'yyyy-MM-dd'), 
      inTime: this.formatTimeToString(this.visitorForm.get('inTime')?.value),
      outTime: this.formatTimeToString(this.visitorForm.get('outTime')?.value)
    };

    return payload;
  }


  onClose(): void {
    if(this.visitorForm.dirty) {
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



