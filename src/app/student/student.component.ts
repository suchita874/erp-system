import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormDataServiceService } from '../services/form-data-service.service';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-student',
  imports: [
    RouterModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.scss'
})
export class StudentComponent implements OnInit{
  selectedTab = 'info'; // default tab
  studentId: string | null = null;
  studentData: any = null;

  constructor( private route: ActivatedRoute,
    private appService: AppService,
    private formDataService: FormDataServiceService) {
    
  }

  ngOnInit(): void {
   this.getStudentDetailsbyIdToBindFormData();
  }

  
  getStudentDetailsbyIdToBindFormData() {
    this.studentId = this.route.snapshot.paramMap.get('id');

    if (this.studentId) {
      this.appService.getStudentDetailsById(this.studentId).subscribe((response: any) => {
        const studentData = response.data;
        this.formDataService.setStudentFormData(studentData);
      });
    }
    else {
      // 🚨 No ID → reset form
      this.formDataService.clear();
    }
  }


  selectTab(tab: string) {
    this.selectedTab = tab;
  }



  

//📌 Visual Flow: for edit student data by id 

/*  [ API Call in Parent Component (StudentFormComponent) ]
            ↓
 [ formDataService.setStudentFormData(data) ]
            ↓
 [ studentFormData$ emits new data ]
            ↓
 [ Subscribed Child Component receives data ]
            ↓
 [ Child component patches data into its form fields ] */

}
