import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-class-section-form',
  imports: [],
  templateUrl: './class-section-form.component.html',
  styleUrl: './class-section-form.component.scss'
})
export class ClassSectionFormComponent {

  classSectionForm: FormGroup;
  isPopupOpen = false;
  classes = ['Class 1', 'Class 2', 'Class 3']; // Example class names
  teachers = ['Teacher A', 'Teacher B', 'Teacher C']; // Example teacher names

  constructor(private fb: FormBuilder) {
    this.classSectionForm = this.fb.group({
      className: ['', Validators.required],
      sectionName: ['', Validators.required],
      classCode: ['', Validators.required],
      maxStudent: ['', [Validators.required, Validators.min(1)]],
      classTeacher: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  onSubmit(): void {
    if (this.classSectionForm.valid) {
      console.log(this.classSectionForm.value);
      // Handle form submission logic here
      this.isPopupOpen = false; // Close the popup after saving
    }
  }

  openPopup(): void {
    this.isPopupOpen = true;
  }

  closePopup(): void {
    this.isPopupOpen = false;
  }

}
