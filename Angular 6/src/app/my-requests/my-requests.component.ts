import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

//To import EmployeeServices class (step1)
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css'],
  providers: [EmployeeService]   //To inject EmployeeServices class (step2)
})
export class MyRequestsComponent implements OnInit {
  userRequests;
  userDetails;
  showSucessMessage: boolean;
  admin ="vivekratnesh001@gmail.com";
  serverErrorMessages: string;
  emailId: string;
  constructor(private userService: UserService, private router: Router, public employeeService: EmployeeService) { }
  public showEditor: boolean;
  ngOnInit() {
    
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.emailId = this.userDetails.email;
      
      },
      err => { 
        console.log(err);
        
      }
    );
    this.resetForm();
    if(this.emailId==this.admin){
      window.alert("dsaad");
      this.refreshAllEmployeeList();}
    else{
      this.refreshEmployeeList();}

    this.showEditor = false;

    //this.employeeService.getmyRequests().subscribe(
      //res => {
        //this.userRequests = res['employee'];
        //this.emailId = this.userRequests.email;
      //},
      //err => { 
       // console.log(err);
     //   
   //   }
 //   );
    //this.resetForm();
    
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.employeeService.selectedEmployee = {
      _id: "",
      email: "",
      projectname: "",
      datacenter: "",
      ostype: null
    }
  }



  onSubmit(form: NgForm) {
    this.employeeService.putEmployee(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.showEditor=false;
        this.resetForm(form);
        this.refreshEmployeeList();
       ;
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  refreshAllEmployeeList() {
    window.alert("Test1");
    
     this.employeeService.getallRequests().subscribe((res) => {
     this.employeeService.employees = res as Employee[];
   }) 
 }

 refreshEmployeeList() {
    window.alert("Test");
    
     this.employeeService.getmyRequests(this.emailId).subscribe((res) => {
     this.employeeService.employees = res as Employee[];
   }) 
 }

  onEdit(emp: Employee) {
    this.showEditor=true;
    this.employeeService.selectedEmployee = emp;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully' });
      });
    }
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}

