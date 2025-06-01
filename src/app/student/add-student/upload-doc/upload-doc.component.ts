import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormDataServiceService } from '../../../services/form-data-service.service';
import { AppService } from '../../../services/app.service';
import { StudentPayload } from '../../../models/student.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-upload-doc',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './upload-doc.component.html',
  styleUrl: './upload-doc.component.scss'
})
export class UploadDocComponent implements OnInit{
  uploadForm: FormGroup;
  studentId: any;
  isSubmitting = false;
  successMsg: string = '';
  errorMsg: string = '';

  documents = [
    { key: 'studentAadhar', label: 'Student Aadhar' },
    { key: 'birthCertificate', label: 'Birth Certificate' },
    { key: 'samagraId', label: 'Student Samagra ID' },
    { key: 'domicile', label: 'Domicile Certificate' },
    { key: 'transfer', label: 'Transfer Certificate' },
    { key: 'motherAadhar', label: 'Mother Aadhar' },
    { key: 'fatherAadhar', label: 'Father Aadhar' },
    { key: 'other', label: 'Other Document' }
  ];
  

  uploadedFiles: { [key: string]: File } = {};

  constructor(private fb: FormBuilder, private formDataService: FormDataServiceService, private appService: AppService,
     private route: ActivatedRoute, private router: Router) {
    this.uploadForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.studentId = this.route.parent?.snapshot.paramMap.get('id');
  }

  triggerFileInput(key: string) {
    const fileInput = document.getElementById(key) as HTMLInputElement;
    fileInput.click();
  }

  getFileName(key: string): string {
    return this.uploadedFiles[key]?.name || '';
  }
  

  onFileSelected(event: Event, key: string) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadedFiles[key] = file;
    }
  }

  submitForm() {
    this.isSubmitting = true;
    // const uploadData = this.uploadForm.value; 
    // this.formDataService.setFormData('uploadDocument', uploadData);

    // const studentInfo = this.formDataService.getFormDataByKey('studentInfo');
    // const isUpdate = !!studentInfo?.id;
  
    // Combine all collected form data
    const finalPayload: StudentPayload = {
        ...this.formDataService.getFormDataByKey('studentInfo'),
        ...this.formDataService.getFormDataByKey('parentDetails'),
        ...this.formDataService.getFormDataByKey('addressInfo'),
        ...this.formDataService.getFormDataByKey('bankDetails')

    }; 
      // this.prepareNameFields(finalPayload); // optional, see below
    const apiCall = this.studentId
    ? this.appService.updateStudentDetails(this.studentId, finalPayload)
    : this.appService.saveStudentDetails(finalPayload);
  
    apiCall.subscribe({
      next: (res) => {
        console.log('Saved successfully', res);
        this.successMsg = 'Congartulations! Details are saved successfully.';
        this.router.navigate(['/menu/student/add/upload-doc']).then(() => {
          this.formDataService.resetFormData();
          this.isSubmitting = false;
        });
      },
      error: (err) => {
        console.error('Save failed', err);
        this.errorMsg = "Failed to save the details. Please try again!"
        this.isSubmitting = false; 
      }
    });
  }

  previousPage() {
    if (this.studentId) {
      this.router.navigate([`/menu/student/add/${this.studentId}/miscellaneous`]);
    } else {
      this.router.navigate(['/menu/student/add/miscellaneous']);
    }
  }

}
