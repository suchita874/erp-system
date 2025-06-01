import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { materialImports } from '../../shared/material-imports';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AcademicFormComponent } from '../../shared/academic-form/academic-form.component';

@Component({
  selector: 'app-timetable-setup',
  imports: [
    materialImports,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './timetable-setup.component.html',
  styleUrl: './timetable-setup.component.scss'
})
export class TimetableSetupComponent {
  dialogRef: any;

  periodForm: FormGroup;
  editingRow: any = null;

  displayedColumns: string[] = [
    'period', 'time', 'day', 'class', 'classTeacher', 'subject', 'action'
  ];

  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  dataSource = [
    {
      period: '1',
      time: '09:00',
      day: 'Monday',
      class: 'Class 1',
      classTeacher: 'Mr. Sharma',
      subject: 'Math'
    },
    {
      period: '2',
      time: '10:00',
      day: 'Monday',
      class: 'Class 2',
      classTeacher: 'Ms. Patel',
      subject: 'English'
    }
  ];

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.periodForm = this.fb.group({
      period: [''],
      time: [''],
      day: [''],
      class: [''],
      classTeacher: [''],
      subject: ['']
    });
  }

  ngOnInit(): void {}

  editRow(row: any) {
    this.editingRow = row;
    this.periodForm.patchValue(row);
  }

  saveRow(row: any) {
    Object.assign(row, this.periodForm.value);
    this.editingRow = null;
  }

  cancelEdit() {
    this.editingRow = null;
  }

  openPopup(type: 'timetable'): void {
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

