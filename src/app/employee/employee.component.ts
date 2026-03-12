import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeFilterPipe } from '../shared/employee-filter.pipe';



@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, EmployeeFilterPipe],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  searchText: string= '';

  constructor(public employeeService: EmployeeService) {}       //sees employeeService, create instance, injects into component, this is called Dependency Injection (DI)

  ngOnInit() {                                    // it'll run once when component loads
    this.resetForm();
    this.refreshEmployeeList();
  }

  trackById(index: number, emp: Employee){
    return emp._id;
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "" || form.value._id == null) {
      // new record
      this.employeeService.postEmployee(form.value).subscribe((res)=> {     //subscribe means when response comes back, run this code
        this.afterSave(form, "saved successfully")
      });
    } else {
      //update record
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.afterSave(form, "Updated Successfully")
      })
    }
  }

  //helper function
  afterSave(form: NgForm, message: string){
    this.resetForm(form);                       //clears form
    this.refreshEmployeeList();                 //fetch updated data
    alert(message);                             //message show
  }

  //Refresh employee List method
  refreshEmployeeList(){
    this.employeeService.getEmployeeList().subscribe((res)=>{
      this.employeeService.employees = res as Employee [];       //res as Employee[] is called type assertion meaning to tell TS, trust me it's employee array
      console.log("Employees fetched:", res);
    });
  }


  //onEdit logic
  onEdit(emp: Employee) {
    this.employeeService.selectedEmployee = {...emp};   //employee copied, assigned to selectedEmployee, form auto-fills (bcz ngmodel),
    //  {..emp} is called spread operator (it created a copy not reference )
  }


  onDelete(_id: string | undefined) { // Allow string or undefined
  if (!_id) {
    console.error("Cannot delete: ID is missing");
    return;
  }

  if (confirm('Are you sure you want to delete this record?')) {    //confirmation dialog
    this.employeeService.deleteEmployee(_id).subscribe((res) => {
      this.refreshEmployeeList();                                   //to update UI with fresh list of emp
      alert("Deleted successfully");                                //message
    });
  }
}


  resetForm(form?: NgForm) {
    // 1. Clear the Angular Form UI & Validation
    if (form) {
      form.resetForm();
    }

    // 2. Reset the data object in your service
    this.employeeService.selectedEmployee = {
      _id: "",
      name: "",
      position: "",
      office: "",
      salary: 0
    };
  }
}




// import { Component, OnInit } from '@angular/core';
// import { EmployeeService } from '../shared/employee.service';
// import { FormsModule, NgForm } from '@angular/forms';

// @Component({
//   selector: 'app-employee',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './employee.component.html',
//   styleUrls: ['./employee.component.css'],
//   providers: [EmployeeService]
// })
// export class EmployeeComponent implements OnInit {

//   constructor(public employeeService: EmployeeService) {}

//   ngOnInit() {
//     this.resetForm();
//   }

//   onSubmit(form: NgForm) {
//     console.log(form.value);
//   }

//   resetForm(form?: NgForm) {
//     // 1️⃣ Reset the form controls
//     if (form) form.resetForm();

//     // 2️⃣ Reset the selectedEmployee object
//     this.employeeService.selectedEmployee = {
//       _id: "",
//       name: "",
//       position: "",
//       office: "",
//       salary: 0
//     };

//     // 3️⃣ Force label update for Materialize (optional if using Materialize)
//     setTimeout(() => {
//       const elems = document.querySelectorAll('input');
//       elems.forEach((el: any) => el.value = '');
//     }, 0);
//   }
// }
