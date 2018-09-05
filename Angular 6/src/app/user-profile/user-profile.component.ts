import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

//To import EmployeeServices class (step1)
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M: any;


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  providers: [EmployeeService]   //To inject EmployeeServices class (step2)
})
export class UserProfileComponent implements OnInit {
  userDetails;
  showSucessMessage: boolean;
  serverErrorMessages: string;
  emailId: string;
  constructor(private userService: UserService, private router: Router, public employeeService: EmployeeService) { }

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
    this.refreshEmployeeList();
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
    
    this.employeeService.postEmployee(form.value).subscribe(
      res => {
        
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.serverErrorMessages = "";
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('.  ');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.employeeService.employees = res as Employee[];
    });
  }

  onEdit(emp: Employee) {
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
