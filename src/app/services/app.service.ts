import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
// import { EnvService } from './env.service';
// import { ConfigService }
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class AppService {
  private baseUrl : string = environment.API_BASE_URL;
  // env: any = 'https://schoolerp.prathviirajj.com/api/';


  /*    Api Urls    */
  getStudentsUrl = 'students';
  saveStudentsUrl = 'students';
  getAllAdmissionEnquireisUrl = '/enquiries/getAllAdmissionEnquiries';
  getAdmissionEnquiryByIdUrl = '/enquiries/getAdmissionEnquiryById/';
  saveAdmissionEnquiryUrl = '/enquiries/createAdmissionEnquiry';
  deleteAdmissionEnquiryByIdUrl = '/enquiries/deleteAdmissionEnquiryById/';
  updateAdmissionEnquiryByIdUrl = '/enquiries/updateAdmissionEnquiryById/';
  getAllVisitorsUrl = '/visitors/getAllVisitors';
  saveVisitorsDetailUrl = '/visitors/createVisitor';
  updateVisitorsDetailByIdUrl = '/visitors/updateVisitorById/';
  deleteVisitorsByIdUrl = '/visitors/deleteVisitorById/';
  getVisitorsDetailByIdUrl = '/visitors/getVisitorById/';
  saveClassDetailsUrl = 'classDetails/createClassDetail';
  getAllClassDetailsUrl = 'classDetails/getAllClassDetails';
  getClassDetailsByIdUrl = 'classDetails/classDetailsById/';
  deleteClassDetailsByIdUrl = 'classDetails/deleteClassDetailById/';
  updateClassDetailsByIdUrl = 'classDetails/updateClassDetailsById/';


  constructor(private router: Router, private http: HttpClient) {
    console.log(this.baseUrl)
    // this.env = ''
   }

   /* Student form service */
   saveStudentDetails(payload: any) {
    const httpOptions = { 
      headers : new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };
    return this.http.post(`${this.baseUrl}/students`, payload, httpOptions); 
   }

   getAllStudentDetails() {
    return this.http.get(`${this.baseUrl}/students`);

   }

   getStudentDetailsById(id: any) {
    return this.http.get(`${this.baseUrl}/students/${id}`);
   }

   updateStudentDetails(id: any, payload: any) {
    return this.http.put(`${this.baseUrl}/students/${id}`, payload);
   }
 
  deleteStudentRow(id : any) {
    return this.http.delete(`${this.baseUrl}/students/${id}`);
  }  

  /* Admission Enquiry Service */ 
  getAllAdmissionEnquires(page: number = 0, size: number = 5) {
    return this.http.get(this.baseUrl+this.getAllAdmissionEnquireisUrl, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    });
  }

  getAdmissionEnquiryById(id:any) {
    return this.http.get(this.baseUrl + this.getAdmissionEnquiryByIdUrl+`${id}`);
  }

  saveAdmissionEnquiry(payload: any) {
    return this.http.post(this.baseUrl+this.saveAdmissionEnquiryUrl,payload);
  }

  deleteAdmissionEnquiryById(id: any) {
    return this.http.delete(this.baseUrl + this.deleteAdmissionEnquiryByIdUrl + `${id}`);
  }

  updateAdmissionEnquiryById(id: any, payload: any) {
    return this.http.put(this.baseUrl+this.updateAdmissionEnquiryByIdUrl + `${id}`, payload);
  }

  /* Visitors Detail Service */ 
  getAllVisitorsDetail(page: number = 0, size: number = 5) {
    return this.http.get(this.baseUrl + this.getAllVisitorsUrl, {
      params: {
        page: page.toString(),
        size: size.toString()
      }
    }
    );
  }

  saveVisitorsDetail(payload: any) {
    return this.http.post(this.baseUrl + this.saveVisitorsDetailUrl, payload);
  }

  getVisitorsDetailsById(id: any) {
    return this.http.get(this.baseUrl + this.getVisitorsDetailByIdUrl + `${id}`);
  }

  updateVisitorsDetailById(id: any, payload: any) {
    return this.http.put(this.baseUrl + this.updateVisitorsDetailByIdUrl + `${id}`, payload);
  }

  deleteVisitorsDetailById(id: any) {
    return this.http.delete(this.baseUrl + this.deleteVisitorsByIdUrl + `${id}`);
  }
  
  /* Class Details API */

  getAllClassDetails() {
    return this.http.get(this.baseUrl + this.getAllClassDetailsUrl);
  }

  saveAllClassDetails(payload: any) {
    return this.http.post(this.baseUrl + this.saveClassDetailsUrl, payload);
  }

  getAllClassDetailsById(id: any) {
    return this.http.get(this.baseUrl + this.getAllClassDetailsById + `${id}`);
  }

  updateClassDetailsById(id: any, payload: any) {
    return this.http.put(this.baseUrl + this.updateClassDetailsByIdUrl + `${id}`, payload);
  }

  deleteClassDetailsById(id: any) {
    return this.http.delete(this.baseUrl + this.deleteClassDetailsById + `${id}`);
  }



}