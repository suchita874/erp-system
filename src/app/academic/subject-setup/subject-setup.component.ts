import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialImports } from '../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AcademicFormComponent } from '../../shared/academic-form/academic-form.component';

@Component({
  selector: 'app-subject-setup',
  imports: [
    CommonModule,
    materialImports,
    ReactiveFormsModule
  ],
  templateUrl: './subject-setup.component.html',
  styleUrl: './subject-setup.component.scss'
})
export class SubjectSetupComponent {
  dialogRef: any;

  displayedColumns: string[] = ['subject', 'subjectCode', 'teacher', 'action'];
  dataSource = [
    { subject: 'Math', subjectCode: '12434', teacher: 'Meera' },
    { subject: 'Bio', subjectCode: '124334', teacher: 'Rohan' },
    // more data
  ];

  subjectForm: FormGroup;
  editingRow: any = null;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.subjectForm = this.fb.group({
      subject: [''],
      subjectCode: [''],
      teacher: [''],
    });
  }

  editRow(row: any) {
    this.editingRow = row;
    this.subjectForm.patchValue(row);
  }

  saveRow(row: any) {
    Object.assign(row, this.subjectForm.value);
    this.editingRow = null;
  }

  cancelEdit() {
    this.editingRow = null;
  }

  openPopup(type: 'subject'): void {
    console.log('Opening Academic Popup');
    
    this.dialogRef = this.dialog.open(AcademicFormComponent, {
      width: '80vw',
      height: 'auto',
      maxWidth: '100vw',
      panelClass: 'visitor-form',
      data: { dialogType: type },
      disableClose: true
    });
  }
}
