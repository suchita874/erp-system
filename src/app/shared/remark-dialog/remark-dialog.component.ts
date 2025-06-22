import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remark-dialog',
  imports: [],
  templateUrl: './remark-dialog.component.html',
  styleUrl: './remark-dialog.component.scss'
})
export class RemarkDialogComponent {

  remarkForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RemarkDialogComponent>
  ) {
    this.remarkForm = this.fb.group({
      remark: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.remarkForm.valid) {
      this.dialogRef.close(this.remarkForm.value);
    }
  }

}
