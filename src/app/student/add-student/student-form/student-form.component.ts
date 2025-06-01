// import { Component, ViewChild } from '@angular/core';
// import { AddressInfoComponent } from '../address-info/address-info.component';
// import { MiscellaneousinfoComponent } from '../miscellaneousinfo/miscellaneousinfo.component';
// import { InfoComponent } from '../info/info.component';
// import { ParentInfoComponent } from '../parent-info/parent-info.component';
import { AppService } from '../../../services/app.service';
// import { StudentPayload } from '../../../models/student.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataServiceService } from '../../../services/form-data-service.service';

@Component({
  selector: 'app-student-form',
  imports: [],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss'
})
export class StudentFormComponent implements OnInit{

  // @ViewChild(InfoComponent) studentInfoComp!: InfoComponent;
  // @ViewChild(AddressInfoComponent) addressInfoComp!: AddressInfoComponent;
  // @ViewChild(MiscellaneousinfoComponent) bankInfoComp!: MiscellaneousinfoComponent;
  // @ViewChild(ParentInfoComponent ) parentInfoComp!: ParentInfoComponent ;

  studentId: string | null = null;
  studentData: any = null;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private formDataService: FormDataServiceService
  ) {}

  ngOnInit() {
    console.log('student form loaded');
    this.studentId = this.route.snapshot.paramMap.get('id');

    if (this.studentId) {
      this.appService.getStudentDetailsById(this.studentId).subscribe(data => {
        this.studentData = data;
        console.log(this.studentData);
        this.formDataService.setStudentFormData(this.studentData);
      });
    }
  }



  // submitForm() {
  //   const payload : StudentPayload = {
  //     ...this.studentInfoComp.getFormData(),
  //     ...this.parentInfoComp.getFormData(),
  //     ...this.addressInfoComp.getFormData(),
  //     ...this.bankInfoComp.getFormData()
  //   };

  //   this.appService.saveStudentDetails(payload).subscribe((res) => {
  //     console.log('Saved!', res);
  //   });
  // }

}
