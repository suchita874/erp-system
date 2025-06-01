import { Component, OnInit } from '@angular/core';
import { materialImports } from '../shared/material-imports';
import { RouterModule } from '@angular/router';




@Component({
  selector: 'app-front-office',
  imports: [
    materialImports,
    RouterModule
  ],
  templateUrl: './front-office.component.html',
  styleUrl: './front-office.component.scss'
})

export class FrontOfficeComponent implements OnInit{



  constructor() {

  }

  ngOnInit(): void {
  }


  



  // openFormDialog() {
  //   if (this.currentView === 'admission') {
  //     this.dialog.open(AdmissionEnquiryComponent, {
  //       width: '80vw',
  //       height: '80vh',
  //       panelClass: 'admission-enquiry',
  //       data: {

  //       },
  //       disableClose: true
  //     });
  //   } else if (this.currentView === 'visitor') {
  //     this.dialog.open(VisitorListComponent, {
  //       width: '80vw',
  //       height: '80vh',
  //       panelClass: 'admission-enquiry',
  //       data: {

  //       },
  //       disableClose: true
  //     });
  //   }
  // }

 
}
