import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-dialog',
  imports: [],
  templateUrl: './success-dialog.component.html',
  styleUrl: './success-dialog.component.scss'
})
export class SuccessDialogComponent {

  constructor(public childDialogRef: MatDialogRef<SuccessDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router){

  }

  ngOnInit(): void {
    //This is intentional
  }

  onClose(){
    this.dialog.closeAll();
  }
}
