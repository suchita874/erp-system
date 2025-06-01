import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard.component';
import { MenuComponent } from './menu.component';
import { StudentComponent } from '../student/student.component';
import { SettingsComponent } from '../settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      { path: '', redirectTo: 'student', pathMatch: 'full' },
      { path: 'student', component: StudentComponent },
      { path: 'settings', component: SettingsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
