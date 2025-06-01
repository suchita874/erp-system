import { Component } from '@angular/core';
import { materialImports } from '../../../shared/material-imports';

@Component({
  selector: 'app-student-detail',
  imports: [
    materialImports
  ],
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss'
})
export class StudentDetailComponent {

  displayedColumns: string[] = [
    'admissionNumber', 'studentName', 'class', 'fatherName', 'dob'
  ];

  dataSource = [
    { field: 'admission Date', value: '12/03/2022' },
    { field: 'Date Of Birth', value: '12/03/2022' },
    { field: 'Category', value: 'Genreal' },
    { field: 'Mobile Number', value: '1234566' },
    { field: 'Caste', value: 'general' },
    { field: 'Email', value: 'dummy@gmail.com' },
  ]
}
