//This is a service class
//importing required packages
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

import { Employee } from './employee.model';
//import { User } from './user.model';

@Injectable()
export class EmployeeService {
  selectedUser: Employee = {
    _id: '',
    email: '',
    projectname: '',
    datacenter: '',
    ostype: ''
  };
  selectedEmployee: Employee; //variable of Employee model type (used for update and delete functioanlity for slected employee)
  employees: Employee[];  //variable storing Array of Employee (to fetch all employess form mongodb)
  readonly baseURL = 'http://localhost:3000/api';

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }
  //To call node post router we need to make http request to node project
  //postEmployee(emp: Employee) {
    //return this.http.post(this.baseURL, emp);
 // }

 postEmployee(emp: Employee){
   
    return this.http.post(environment.apiBaseUrl+'/request',emp,this.noAuthHeader);
  }

  getmyRequests(email: string) {
    return this.http.get(environment.apiBaseUrl + '/myrequests'+ `/${email}`);
  }

  getallRequests() {
    return this.http.get(environment.apiBaseUrl + '/allrequests');
  }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

 // getEmployeeList(emp: Employee) {
   // return this.http.get(this.baseURL+ `/${emp.name}`);
  //}

  putEmployee(emp: Employee) {
    return this.http.put(environment.apiBaseUrl + '/update'+ `/${emp._id}`,emp);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(environment.apiBaseUrl + '/delete'+ `/${_id}`);
  }

}
