import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { materialImports } from '../shared/material-imports';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    RouterModule,
    materialImports
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {}

  
}

