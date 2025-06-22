import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { materialImports } from '../../shared/material-imports';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    materialImports,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hidePassword: boolean = true;
  constructor(private router: Router) { }

  onLogin() {
    this.router.navigate(['/menu']);

    
  }


  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
