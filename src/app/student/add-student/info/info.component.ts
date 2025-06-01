import { Component, OnInit } from '@angular/core';
import { materialImports } from '../../../shared/material-imports';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppService } from '../../../services/app.service';
import { RouterModule } from '@angular/router';
import { FormDataServiceService } from '../../../services/form-data-service.service';
import { Router } from '@angular/router';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { CUSTOM_DATE_FORMATS } from '../../../shared/material-imports';
import { DatePipe } from '@angular/common';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-info',
  imports: [
    ...materialImports,
    ReactiveFormsModule,
    RouterModule,
    NgIf
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    DatePipe
  ],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss'
})

export class InfoComponent implements OnInit {
  selection: string[] = [];
  category: string[] = [];
  studentId : any;
  

  studentInfoForm: FormGroup;


  constructor(private appService: AppService, private fb: FormBuilder, private formDataService: FormDataServiceService,
    private router: Router, private datePipe: DatePipe, private route: ActivatedRoute,
  ) { 
    this.studentInfoForm = this.fb.group({
      'selectedAdmissionNo' : ['', Validators.required],
      'selectedRollNo' : ['', Validators.required],
      'selectedClass' : ['', Validators.required],
      'selectedSelection' : ['', Validators.required],
      'selectedFirstName' : ['', Validators.required],
      'selectedLastName' : ['', Validators.required],
      'selectedGender' : ['', Validators.required],
      'selectedDOB' : ['', Validators.required],
      'selectedCategory' : ['', Validators.required],
      'selectedReligion' : ['', Validators.required],
      'selectedMobileNum' : ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$')]],
      'selectedEmail' : ['', [Validators.required, Validators.email]],
      'selectedAdmissionDate' : ['', Validators.required],
      'selectedBloodGrp' : ['', Validators.required],
      'selectedAdharNum' : ['', [Validators.required, Validators.pattern(/^[0-9]{12}$/)]],
      'selectedHeight' : ['', Validators.required],
      'selectedWeight' : ['', Validators.required],
    });

  }

  ngOnInit(): void {
    // this.studentInfoForm.get('selectedAdmissionDate')?.setValue(new Date()); // Set the default date as today's date
    this.route.parent?.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      console.log('Student ID from parent route:', this.studentId);
    });
    this.bindFormData();
  }


  bindFormData(){
    this.formDataService.studentFormData$.subscribe(data => {
      if (data) {
        this.studentInfoForm .patchValue({
          selectedAdmissionNo: data.admissionNumber,
          selectedRollNo: data.rollNumber,
          selectedClass: data.classStandard,
          selectedSelection: '', // Not provided in API, set manually if needed
          selectedFirstName: data.firstName,
          selectedLastName: data.lastName,
          selectedGender: data.gender,
          selectedDOB: data.dateOfBirth,
          selectedCategory: data.category,
          selectedReligion: data.religion,
          selectedMobileNum: data.mobileNumber,
          selectedEmail: data.email,
          selectedAdmissionDate: data.admissionDate,
          selectedBloodGrp: data.bloodGroup,
          selectedAdharNum: data.aadharNumber, 
          selectedHeight: data.height,
          selectedWeight: data.weight,
        });
      }
    });
  }

  preparePayload() {
    return {

    }
  }

  nextStep() {
    const data = this.getFormData();
    this.formDataService.setFormData('studentInfo', data);
    if (this.studentId) {
      this.router.navigate([`/menu/student/add/${this.studentId}/parent`]);
    } else {
      this.router.navigate(['/menu/student/add/parent']);
    }
  }
  

  getFormData() {
    return {
        admissionNumber: this.studentInfoForm.get('selectedAdmissionNo')?.value,
        rollNumber: this.studentInfoForm.get('selectedRollNo')?.value,
        classStandard: this.studentInfoForm.get('selectedClass')?.value,
        firstName: this.studentInfoForm.get('selectedFirstName')?.value,
        lastName: this.studentInfoForm.get('selectedLastName')?.value,
        gender: this.studentInfoForm.get('selectedGender')?.value,
        dateOfBirth: this.datePipe.transform(this.studentInfoForm.get('selectedDOB')?.value, 'yyyy-MM-dd'),
        // category: this.studentInfoForm.get('selectedCategory')?.value,
        category: 0,
        religion: this.studentInfoForm.get('selectedReligion')?.value,
        mobileNumber: this.studentInfoForm.get('selectedMobileNum')?.value,
        email: this.studentInfoForm.get('selectedEmail')?.value,
        admissionDate: this.datePipe.transform(this.studentInfoForm.get('selectedAdmissionDate')?.value, 'yyyy-MM-dd'),
        bloodGroup: this.studentInfoForm.get('selectedBloodGrp')?.value,
        aadharNumber: "1234",
        height: this.studentInfoForm.get('selectedHeight')?.value,
        weight: 40
    };
  }

}
