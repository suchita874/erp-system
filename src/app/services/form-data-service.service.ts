import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormDataServiceService {
  private formData: any = {};
  private studentFormDataSubject = new BehaviorSubject<any>(null); // Holds the latest student data
  studentFormData$ = this.studentFormDataSubject.asObservable();   // Observable for components to subscribe

  constructor() {}

  // Save form data 
  setFormData(key: string, data: any) {
    this.formData[key] = data;
  }

  getFormDataByKey(key: string) {
    return key ? this.formData[key] : this.formData;
  }

  // store student data by id
   setStudentFormData(data: any): void {
    this.studentFormDataSubject.next(data);
  }


  // setStudentFormData(data: any) {
  //   this.formData = data;
  // }
  
  getStudentFormData(): any {
    return this.formData;
  }

  resetFormData(): void {
    this.formData = {};
    this.studentFormDataSubject.next(null); // 🔄 reset state for all subscribers
  }

  clear() {
    this.resetFormData();
  }
}
