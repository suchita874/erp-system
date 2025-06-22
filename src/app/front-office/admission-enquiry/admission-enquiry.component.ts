import { Component, OnInit } from '@angular/core';
import { materialImports } from '../../shared/material-imports';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AdmissionEnquiryFormComponent } from './admission-enquiry-form/admission-enquiry-form.component';
import { AppService } from '../../services/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoaderService } from '../../services/loader.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';


export interface AdmissionEnquiryDialogData {

}


@Component({
  selector: 'app-admission-enquiry',
  imports: [
    materialImports,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admission-enquiry.component.html',
  styleUrl: './admission-enquiry.component.scss'
})
export class AdmissionEnquiryComponent implements OnInit{
  dialogRef: any;
  displayedColumns: string[] = [
    'name',
    'phone',
    'source',
    'enquireDate',
    'lastFollowUp',
    'status',
    'action'
  ]; 
  dataSource: any[] = []; 
  editingRow: number | null = null;
  hoveredRow: any = null;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(public dialog: MatDialog, private appService: AppService,private snackBar: MatSnackBar,
    private loaderService: LoaderService, private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {
    this.getAllAdmissionEnquiryDetails();
  }

  cancelEdit() {
    this.editingRow = null;
  }

  editForm = new FormGroup({
    name: new FormControl(''),
    mobile: new FormControl(''),
    sources: new FormControl(''),
    enquireDate: new FormControl(''),
    lastFollowUp: new FormControl(''),
    status: new FormControl('')
  });

  editRow(row: any) {
    this.editingRow = row;
    this.editForm.patchValue(row);
  }

  saveRow(row: any) {
    Object.assign(row, this.editForm.value);
    this.editingRow = null;

    const payload = {
      "name": this.editForm.get('name')?.value,
      "mobile": this.editForm.get('phone')?.value,
      "sources": this.editForm.get('sources')?.value,
      "enquireDate": this.editForm.get('enquireDate')?.value,
      "lastFollowUp": this.editForm.get('lastFollowUp')?.value,
      "status": this.editForm.get('status')?.value
    }

    this.appService.saveAdmissionEnquiry(payload).subscribe({
      next: (response) => {
        console.log('Form submitted successfully:', response);
      },
      error: (error) => {
        console.error('Form submission error:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Confirm': return 'status-confirm';
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-inprogress';
      default: return '';
    }
  }

  getAllAdmissionEnquiryDetails(page: number = 0, size: number = 5) {
    this.loaderService.show();
    this.appService.getAllAdmissionEnquires(page, size).subscribe({
      next : (response: any) => {
        this.dataSource = response?.data?.content;
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

  onPageChange(event: PageEvent) {
    this.getAllAdmissionEnquiryDetails(event.pageIndex, event.pageSize);
  }

  updateAdmissionEnquiryDetail(element: any) {
    this.getAdmissionEnquiryDetailById(element.id);
  }

  getAdmissionEnquiryDetailById(id: number) {
    this.appService.getAdmissionEnquiryById(id).subscribe({
      next: (res: any) => {
        this.dialog.open(AdmissionEnquiryFormComponent, {
          width: '80vw',
          height: 'auto',
          panelClass: 'admission-enquiry',
          data: {
            'enquiry': res.data
          },
          disableClose: true
        });
      },
      error: (err) => {
        console.error('Error fetching visitor', err);
      }
    });
  }


  deleteAdmissionEnquiryDetail(element: any) {
    const confirmDelete = confirm(`Are you sure you want to delete element ${element.name}?`);
    if (!confirmDelete) return;
    this.appService.deleteAdmissionEnquiryById(element.id).subscribe({
      next: () => {
        this.dataSource = this.dataSource.filter((s: any) => s !== element);
        console.log(this.dataSource);
        this.snackBar.open('Deleted successfully.', 'Close', { duration: 3000 });
      },
      error: (err) => {
        console.error('Delete failed', err);
        this.snackBar.open('Failed to delete element.', 'Close', { duration: 3000 });
      }
    });

    console.log('Delete', element);
  }

  admissionEnquiryFormDialog() {
    this.dialogRef = this.dialog.open(AdmissionEnquiryFormComponent, {
      width: '80vw',
      height: 'auto',
      panelClass: 'admission-enquiry',
      data: {},
      disableClose: true
    });
    this.dialogRef.componentInstance.onDataReceived.subscribe((result:any) => {

    });

  }
}

