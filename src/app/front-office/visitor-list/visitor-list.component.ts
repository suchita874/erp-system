import { Component, OnInit } from '@angular/core';
import { materialImports } from '../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { VisitorListFormComponent } from './visitor-list-form/visitor-list-form.component';
import { AppService } from '../../services/app.service';
import { RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../services/loader.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-visitor-list',
  imports: [
    materialImports,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './visitor-list.component.html',
  styleUrl: './visitor-list.component.scss'
})
export class VisitorListComponent implements OnInit{

  dialogRef: any;
  displayedColumns: string[] = [
    'purpose',
    'name',
    'data',
    'phone',
    'inTime',
    'outTime',
    'action'
  ]; 

  filterForm: FormGroup;
  sourceOptions: string[] = ['Email', 'Phone', 'Referral']; // Example options
  
  editedRowId: any;
  savedVisitorsList: any[] = [];
  totalItems: number = 0;
  totalPages: number = 0;
  editForm: FormGroup;
  editingRow: any = null;
  pageSize = 5;
  currentPage = 0;


  constructor(public dialog: MatDialog, private appService: AppService, private snackBar: MatSnackBar,
    private loaderService: LoaderService, private fb: FormBuilder
  ) {

    this.editForm = this.fb.group({
      purpose: [''],
      name: [''],
      data: [''],
      phone: [''],
      inTime: [''],
      outTime: ['']
    });

    this.filterForm = this.fb.group({
      enquiryDate: [''],
      source: [''],
      status: ['']
    });

  }

  ngOnInit(): void {
    this.getAllVisitorsDetailData();
    this.loadVisitors();
  }

  getAllVisitorsDetailData(page: number = 0, size: number = 5) {
    this.loaderService.show();
    this.appService.getAllVisitorsDetail(page, size).subscribe({
      next : (response: any) => {
        this.savedVisitorsList = response?.data?.content || [];
        this.totalItems = response?.data?.totalElements || 0;
        this.totalPages = response?.data?.totalPages || 0;
        this.loaderService.hide();
      },
      error: (error) => {
        console.log('failed to load data', error);
        this.loaderService.hide();
      }
    })
    
  }

  loadVisitors() {
    const filters = {
      enquiryDate: this.filterForm.value.enquiryDate,
      source: this.filterForm.value.source,
      status: this.filterForm.value.status,
      page: this.currentPage,
      size: this.pageSize
    };

    // this.appService.getVisitors(filters).subscribe((res: any) => {
    //   this.savedVisitorsList = res.data;
    //   this.totalItems = res.total;
    // });
  }

  applyFilters() {
    this.currentPage = 0;
    this.loadVisitors();
  }


  onPageChange(event: PageEvent) {
    this.getAllVisitorsDetailData(event.pageIndex, event.pageSize);
    // this.loadVisitors();
  }

  visitorFormDialog() {
    this.dialogRef = this.dialog.open(VisitorListFormComponent, {
      width: '80vw',
      height: 'auto',
      maxWidth: '100vw',
      panelClass: 'visitor-form',
      data: {

      },
      disableClose: true
    });
    // this.dialogRef.componentInstance.onDataReceived.subscribe((result:any) => {

    // }); 
  }

  updateVisitorDetails(element: any) {
    this.getVisitorDetailsById(element.id);
  }

  getVisitorDetailsById(id: number) {
    this.loaderService.show();
    this.appService.getVisitorsDetailsById(id).subscribe({
      next: (res: any) => {
        this.dialog.open(VisitorListFormComponent, {
          width: '80vw',
          height: 'auto',
          maxWidth: '100vw',
          panelClass: 'visitor-form',
          data: {
            'visitor': res.data
          }
        });
        this.loaderService.hide();
      },
      error: (err) => {
        console.error('Error fetching visitor', err);
        this.loaderService.hide();
      }
    });
  }

  deleteVisitorDetail(element: any) {
    const confirmDelete = confirm(`Are you sure you want to delete element ${element.firstName}?`);
    if (!confirmDelete) return;
    this.loaderService.show();
    this.appService.deleteVisitorsDetailById(element.id).subscribe({
      next: () => {
        this.savedVisitorsList = this.savedVisitorsList.filter((s: any) => s !== element);
        console.log(this.savedVisitorsList);
        // this.snackBar.open('Deleted successfully.', 'Close', { duration: 3000 });
        this.loaderService.hide();
        this.callSuccessDialog();
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.snackBar.open('Failed to delete element.', 'Close', { duration: 3000 });
        this.loaderService.hide();
      }
    });
    
  }

  callSuccessDialog() {
    this.dialogRef = this.dialog.open(VisitorListFormComponent, {
      width: '430px',
      height: 'auto',
      panelClass: 'success-dialog',
      data: {

      },
      disableClose: true
    });
  }

  editRow(row: any) {
    this.editingRow = row;
    this.editForm.patchValue(row);
  }

  saveRow(row: any) {
    Object.assign(row, this.editForm.value);
    this.editingRow = null;

    const payload = {
      "purpose": this.editForm.get('purpose')?.value,
      "name": this.editForm.get('name')?.value,
      "data": this.editForm.get('data')?.value,
      "phone": this.editForm.get('phone')?.value,
      "inTime": this.editForm.get('inTime')?.value,
      "outTime": this.editForm.get('outTime')?.value
  }

  this.appService.updateVisitorsDetailById(row.id, payload).subscribe({
    next: (response) => {
      console.log('Form submitted successfully:', response);
    },
    error: (error) => {
      console.error('Form submission error:', error);
    }
  });
  }

  cancelEdit() {
    this.editingRow = null;
  }

  // updateVisitorDetails(row: any) {
  //   this.editRow(row);
  // }

  // deleteVisitorDetail(row: any) {
  //   // Your delete logic here
  // }

}