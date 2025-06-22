import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { materialImports } from '../../shared/material-imports';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LeavePageComponent } from '../leave-page/leave-page.component';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-academic-form',
  imports: [
    materialImports,
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './academic-form.component.html',
  styleUrl: './academic-form.component.scss'
})
export class AcademicFormComponent implements OnInit{

  academicForm: FormGroup;
  popupType: 'classSection' | 'subject' | 'timetable' | null = null;

  classes = ['Class 1', 'Class 2', 'Class 3'];
  days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  isSubmitting = false;
  error_msg: string = '';


teacherList = [
  { id: 1, name: 'Mr. Sharma' },
  { id: 2, name: 'Ms. Verma' },
  { id: 3, name: 'Dr. Kumar' },
];

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AcademicFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
  public appService: AppService) {
    this.academicForm = this.fb.group({
      className: [''],
      sectionName: [''],
      classCode: [''],
      totalStudents: [''],
      classTeacher: [''],
      subjectName: [''],
      subjectCode: [''],
      period: [''],
      time: [''],
      day: [''],
      class: [''],
      subjectClassTeacher: [''],
      subject: [''],
      section: [''],
      subjectCode2: [''],
      assignedTeacher: [''],
    });

    this.popupType = data.dialogType;
  }

  ngOnInit(): void {
    this.updateValidationRules();
  }

  updateValidationRules(): void {
    if (this.popupType === 'classSection') {
      this.academicForm.get('className')?.setValidators([Validators.required]);
      this.academicForm.get('sectionName')?.setValidators([Validators.required]);
      this.academicForm.get('classCode')?.setValidators([Validators.required]);
      this.academicForm.get('totalStudents')?.setValidators([Validators.required, Validators.min(1)]);
      this.academicForm.get('classTeacher')?.setValidators([Validators.required]);
    } else if (this.popupType === 'subject') {
      this.academicForm.get('subject')?.setValidators([Validators.required]);
      this.academicForm.get('section')?.setValidators([Validators.required]);
      this.academicForm.get('subjectCode2')?.setValidators([Validators.required]);
      this.academicForm.get('assignedTeacher')?.setValidators([Validators.required]);
    } else if (this.popupType === 'timetable') {
      this.academicForm.get('period')?.setValidators([Validators.required, Validators.min(1)]);
      this.academicForm.get('time')?.setValidators([Validators.required]);
      this.academicForm.get('day')?.setValidators([Validators.required]);
      this.academicForm.get('class')?.setValidators([Validators.required]);
      this.academicForm.get('subjectClassTeacher')?.setValidators([Validators.required]);
      this.academicForm.get('subject')?.setValidators([Validators.required]);
    }

    // Update form validation
    this.academicForm.updateValueAndValidity();
  }

  closePopup(): void {
    this.popupType = null;
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  getPopupTitle(): string {
    switch (this.popupType) {
      case 'classSection': return 'Class & Section Setup';
      case 'subject': return 'Subject Setup';
      case 'timetable': return 'Timetable Setup';
      default: return '';
    }
  }

  saveClassDetails() {
    const payload = this.academicForm.value;
    console.log('Form Data:', this.academicForm.value);
    this.appService.saveAllClassDetails(payload).subscribe({
      next : (response) => {
        this.openSuccessDialog();
      },
      error : (error) => {

      }
    })
  }

  saveSubjectDetails() {

  }

  saveTimetableDetails() {

  }


  onSubmit(): void {
    console.log(this.academicForm.value);
    if (this.academicForm.valid) {
     
      this.isSubmitting = true;

      // Simulate API call
      if(this.popupType === 'classSection') {
       
      }
      setTimeout(() => {
        this.isSubmitting = false;
        this.academicForm.reset();
        
      }, 1500);
    }
    this.closePopup();
  }

  openSuccessDialog() {
    if(this.academicForm.dirty) {
      this.dialog.open(SuccessDialogComponent, {
        width: '200px',
        height: 'auto',
        panelClass: 'Leave-Page-dialog',
        disableClose: true
      });
    }
    else {
      this.dialogRef.close();
    }
  }

  onClose(): void {
    if(this.academicForm.dirty) {
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

