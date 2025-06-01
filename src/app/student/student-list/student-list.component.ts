import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppService } from '../../services/app.service';
import { materialImports } from '../../shared/material-imports';
import { PageEvent } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-student-list',
  imports: [
    CommonModule,
    FormsModule,
    materialImports,
    RouterModule,
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})

export class StudentListComponent implements OnInit{
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

  constructor(private appService: AppService, private snackBar: MatSnackBar, private route: ActivatedRoute,
    private loader: LoaderService
  ) {
   
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getStudentDetails();
  }


  getStudentDetails() {
    this.loader.show();
    this.appService.getAllStudentDetails().subscribe((res : any) => {
      if(res && res.data && res.data.length > 0) {
          this.savedStudentList = res.data;
          console.log(this.savedStudentList);
          this.totalItems = this.savedStudentList.length;
          this.updatePaginatedData();
      }
      else{
        if(res.data === null){
          console.log('Student information is not available');
        }
      }
    })
    this.loader.hide();
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  updatePaginatedData() {
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

  deleteStudent(student: any) {
    const confirmDelete = confirm(`Are you sure you want to delete student ${student.firstName}?`);
    if (!confirmDelete) return;
    this.appService.deleteStudentRow(student.id).subscribe({
      next: () => {
        this.savedStudentList = this.savedStudentList.filter((s: any) => s !== student);
        if (this.paginatedStudentData.length === 0 && this.currentPage > 0) {
          this.currentPage--;
        }
        this.updatePaginatedData();
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
