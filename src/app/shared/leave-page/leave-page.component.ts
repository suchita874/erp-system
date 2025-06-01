import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-page',
  imports: [],
  templateUrl: './leave-page.component.html',
  styleUrl: './leave-page.component.scss'
})
export class LeavePageComponent implements OnInit{


  constructor(
    public childDialogRef: MatDialogRef<LeavePageComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

    ngOnInit(): void {
      //This is intentional
    }

  stay() {
    this.childDialogRef.close(false);
    this.setActiveIcon()
  }

  leave() {
    if(this.data && this.data == 'leave page')
      this.childDialogRef.close(true);
    else{
      if(this.data === 'Active') {
        this.childDialogRef.close('leave page');
        this.setActiveIcon();
      }
      else{
        this.dialog.closeAll();
      }
    }
  }

  setActiveIcon() {

  }
}
