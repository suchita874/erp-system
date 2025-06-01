
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../services/app.service';
import { materialImports } from '../shared/material-imports';
import { PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exam',
  imports: [
    CommonModule,
    FormsModule,
    materialImports,
    RouterModule,
  ],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss'],
})

export class ExamComponent implements OnInit{
  searchText = '';
  selectedClass = '';
  selectedCategory = '';
  savedStudentList: any = [];
  paginatedStudentData = [];
  pageSize = 5;
  currentPage = 0;
  totalItems = 0;
  editRowId: number | null = null;
  isFieldEditable: boolean = false;
  savedStudentData: any = [];
  selectedRow: number | null = null;


  classList = ['Class 1', 'Class 2', 'Class 3'];
  categoryList = ['General', 'OBC', 'SC', 'ST'];

  displayedColumns: string[] = [
    'admissionNumber',
    'studentName',
    'class',
    'fatherName',
    'dob',
    'gender',
    'category',
    'mobile',
    'action',
  ];

  dataSource = [
    {
      id: 0,
      admissionNumber: 'A001',
      studentName: 'Aarti Joshi',
      classStandard: '10',
      fatherName: 'Rajesh Sharma',
      dob: '2008-05-12',
      gender: 'Female',
      category: 'OBC',
      mobile: '9876543210',
    },
    {
      id: 1,
      admissionNumber: 'A002',
      studentName: 'Shruti Jojare',
      class: '9',
      fatherName: 'Sunil Verma',
      dob: '2009-08-22',
      gender: 'Male',
      category: 'General',
      mobile: '9123456789',
    },
    {
      id: 2,
      admissionNumber: 'A003',
      studentName: 'Sneha Bhalerao',
      class: '9',
      fatherName: 'Sunil Verma',
      dob: '2009-08-22',
      gender: 'Male',
      category: 'General',
      mobile: '9123456789',
    },
  ];


  constructor(private appService: AppService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
   
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getStudentDetails();
  }


  getStudentDetails() {
    this.appService.getAllStudentDetails().subscribe((res : any) => {
      if(res && res.data && res.data.length > 0) {
          this.savedStudentList = res.data;
          console.log(this.savedStudentList);
          this.totalItems = this.savedStudentList.length;
          this.paginate();
      }
      else{
        if(res.data === null){
          console.log('Student information is not available');
        }
      }
    })
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginate();
  }

  paginate() {
    if (!this.savedStudentList || this.savedStudentList.length === 0) {
      this.paginatedStudentData = [];
      return;
    }
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedStudentData = this.savedStudentList.slice(start, end);
  }

  setModifiedField() {

  }

  editStudent(student: any) {
    this.selectedRow = student.id;
    this.editRowId = student.id;
    student.fullName = `${student.firstName} ${student.lastName}`;
    this.savedStudentData = { ...student }; // Backup
  }
  
  saveStudent(student: any) {
    console.log(student);
    const nameParts = student.fullName.trim().split(' ');
    student.firstName = nameParts[0];
    student.lastName = nameParts.slice(1).join(' '); // In case of middle name or more
    this.editRowId = null;
    let data = JSON.parse(JSON.stringify(student)); 
    //update API call
    console.log(data);
    this.appService.updateStudentDetails(student.id, data).subscribe((res) => {

    })

  }
  
  cancelEdit() {
    // Optionally revert data if you backed it up
    const index = this.dataSource.findIndex(s => s.id === this.savedStudentData.id);
    if (index > -1) {
      this.dataSource[index] = this.savedStudentData;
    }
    this.editRowId = null;
  }
  

  deleteStudent(student: any) {
    const confirmDelete = confirm(`Are you sure you want to delete student ${student.firstName}?`);
    if (!confirmDelete) return;
    this.appService.deleteStudentRow(student.id).subscribe({
      next: () => {
        this.savedStudentList = this.savedStudentList.filter((s: any) => s !== student);
        this.paginatedStudentData = this.savedStudentData;
        console.log(this.savedStudentList);
        this.snackBar.open('Student deleted successfully.', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.snackBar.open('Failed to delete student.', 'Close', { duration: 3000 });
      }
    });

    console.log('Delete', student);
  }
}

