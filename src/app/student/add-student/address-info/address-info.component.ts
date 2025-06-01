import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { materialImports } from '../../../shared/material-imports';
import { NgIf, NgClass } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormDataServiceService } from '../../../services/form-data-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address-info',
  imports: [
   materialImports,
   NgIf,
   ReactiveFormsModule,
   CommonModule,
  //  NgClass
  ],
  templateUrl: './address-info.component.html',
  styleUrl: './address-info.component.scss'
})
export class AddressInfoComponent implements OnInit{
  addressForm: FormGroup;
  address1: any = '';
  address2: any;
  city: string = '';
  state: string = '';
  zipcode: string = '';
  country: string = '';
  mobileNo: string = '';
  // addressField = ['address1', 'address2'];
  disabelSaveBtn: boolean = false;
  isLoading: boolean = false;
  errorMessage: string | null = '';
  message: string | null = '';
  isSaved: boolean = false;
  studentId : any;

  constructor(private fb: FormBuilder, private router: Router, private formDataService: FormDataServiceService,
    private route: ActivatedRoute,
  ) {


    this.addressForm = this.fb.group({
      address1: ['', Validators.required],
      // address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipcode: ['', Validators.required],
      country: ['', Validators.required],
      mobileNo: ['', [ Validators.required,
        Validators.minLength(10),
        Validators.pattern('^[0-9]*$')]],
    });


  }

  ngOnInit(): void {
    // this.studentId = this.route.snapshot.paramMap.get('id');
    this.route.parent?.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      console.log('Student ID from parent route:', this.studentId);
    });
    this.bindFormData();
  }

  bindFormData() {
    this.formDataService.studentFormData$.subscribe(data => {
      if (data?.address) {
        this.addressForm.patchValue({
          address1: data.address?.addressLine1 || '',
          address2: data.address?.addressLine2 || '',
          city: data.address?.city || '',
          state: data.address?.state || '',
          zipcode: data.address?.zipCode || '',
          country: data.address?.country || '',
          mobileNo: data.address?.mobileNumber || '',
        });
      }

    });
  }

  onSubmit() {
    // this.isLoading = true;
    // this.disabelSaveBtn = false;
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
    }

    // this.isLoading = false;
  }

  saveAddressInfo() {
    console.log('save');
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
    }
  }

  //on click of save and next
  nextStep() {
    const data = this.getFormData();
    this.formDataService.setFormData('addressInfo', data);

    if (this.studentId) {
      this.router.navigate([`/menu/student/add/${this.studentId}/miscellaneous`]);
    } else {
      this.router.navigate(['/menu/student/add/miscellaneous']);
    }
  }

  getFormData() {
    return {
      address: {
        addressLine1: this.addressForm.get('address1')?.value,
        addressLine2: this.addressForm.get('address2')?.value,
        state: 0,
        city: 0,
        country: 0,
        zipCode: this.addressForm.get('zipcode')?.value,
        mobileNumber: this.addressForm.get('mobileNo')?.value,
      }
    };
  }

  previousPage() {
    if (this.studentId) {
      this.router.navigate([`/menu/student/add/${this.studentId}/parent`]);
    } else {
      this.router.navigate(['/menu/student/add/parent']);
    }
  }

}
