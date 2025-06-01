import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { materialImports } from '../../shared/material-imports';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AcademicFormComponent } from '../../shared/academic-form/academic-form.component';

@Component({
  selector: 'app-class-section-setup',
  imports: [
    materialImports,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './class-section-setup.component.html',
  styleUrl: './class-section-setup.component.scss'
})
export class ClassSectionSetupComponent implements OnInit{
  dialogRef: any;

  displayedColumns: string[] = ['className', 'classCode', 'maxStudent', 'sectionName', 'classTeacher', 'status', 'action'];
  dataSource = [
    { className: '12th', sectionName: 'Teacher', classCode: '14Dxp90', maxStudent: 10, classTeacher: 'John Cooper', status: 'Active' },
    { className: '12th', sectionName: 'Teacher', classCode: '14Dxp90', maxStudent: 10, classTeacher: 'John Cooper', status: 'Inactive' },
    // more data
  ];

  editForm: FormGroup;
  editingRow: any = null;

  constructor(private fb: FormBuilder, public dialog: MatDialog) {
    this.editForm = this.fb.group({
      className: [''],
      sectionName: [''],
      classCode: [''],
      maxStudent: [''],
      classTeacher: [''],
      status: ['']
    });
  }

  ngOnInit(): void {
    
  }

  editRow(row: any) {
    this.editingRow = row;
    this.editForm.patchValue(row);
  }

  saveRow(row: any) {
    Object.assign(row, this.editForm.value);
    this.editingRow = null;
  }

  cancelEdit() {
    this.editingRow = null;
  }

  getStatusClass(status: string): string {
    // return status === 'Active' ? 'badge bg-success' : 'badge bg-danger';
    switch (status?.toLowerCase()) {
      case 'active':
        return ' badge status-active';
      case 'inactive':
        return 'badge status-inactive';
      case 'pending':
        return 'badge status-pending';
      default:
        return '';
    }
  }
  openPopup(type: 'classSection'): void {
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
