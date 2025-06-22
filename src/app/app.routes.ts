import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './student/student.component';
import { InfoComponent } from './student/add-student/info/info.component';
import { ParentInfoComponent } from './student/add-student/parent-info/parent-info.component';
import { AddressInfoComponent } from './student/add-student/address-info/address-info.component';
import { MiscellaneousinfoComponent } from './student/add-student/miscellaneousinfo/miscellaneousinfo.component';
import {UploadDocComponent} from './student/add-student/upload-doc/upload-doc.component';
import {StudentListComponent} from './student/student-list/student-list.component';
import {DashTextComponent} from './dash-text/dash-text.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';
import { MenuComponent } from './menu/menu.component';
import { StudentDetailComponent } from './student/student-list/student-detail/student-detail.component';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { AdmissionEnquiryComponent } from './front-office/admission-enquiry/admission-enquiry.component';
import { VisitorListComponent } from './front-office/visitor-list/visitor-list.component';
import { AcademicComponent } from './academic/academic.component';
import { ClassSectionSetupComponent } from './academic/class-section-setup/class-section-setup.component';
import { SubjectSetupComponent } from './academic/subject-setup/subject-setup.component';
import { TimetableSetupComponent } from './academic/timetable-setup/timetable-setup.component';
import { EmployeeComponent } from './human-resource/employee/employee.component';
import { HumanResourceComponent } from './human-resource/human-resource.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent // 👈 This will be your initial component
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'menu',
    component: MenuComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'dashboard', component: DashTextComponent },
      {
        path: 'student',
        children: [
          {
            path: 'add',
            component: StudentComponent,
            children: [
              { path: '', redirectTo: 'info', pathMatch: 'full' },
              { path: 'info', component: InfoComponent },
              // { path: 'info/:id', component: InfoComponent },
              { path: 'parent', component: ParentInfoComponent },
              { path: 'address', component: AddressInfoComponent },
              { path: 'miscellaneous', component: MiscellaneousinfoComponent },
              { path: 'upload-doc', component: UploadDocComponent }
            ]
          },
          // ✏️ For editing a student (with ID)
          {
            path: 'add/:id',
            component: StudentComponent,
            children: [
              { path: '', redirectTo: 'info', pathMatch: 'full' },
              { path: 'info', component: InfoComponent },
              { path: 'parent', component: ParentInfoComponent },
              { path: 'address', component: AddressInfoComponent },
              { path: 'miscellaneous', component: MiscellaneousinfoComponent },
              { path: 'upload-doc', component: UploadDocComponent }
            ]
          },

          {
            path: 'student-list',
            component: StudentListComponent,
          },
          {
            path: ':id',
            component: StudentDetailComponent
          }
        ]
      },
      {path: 'front-office', component:  FrontOfficeComponent,
        children: [
          {path: 'admission-enquiry', component: AdmissionEnquiryComponent},
          {path: 'visitor-list', component: VisitorListComponent}
        ]
      },
      {path: 'academic', component: AcademicComponent,
      children: [
        {path: 'class-section', component: ClassSectionSetupComponent},
        {path: 'subject', component: SubjectSetupComponent},
        {path: 'timetable', component: TimetableSetupComponent}
      ]
      },

      {path: 'human-resource', component: HumanResourceComponent,
      children: [
        {path: 'employee', component: EmployeeComponent},
      ]
      }

    ]
  }
];



