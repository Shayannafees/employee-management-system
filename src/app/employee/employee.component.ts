import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { FormsModule, NgForm } from '@angular/forms';
import { Employee } from '../shared/employee.model';
import { CommonModule } from '@angular/common';
import { EmployeeFilterPipe } from '../shared/employee-filter.pipe';
import { Router } from '@angular/router';
import { ToastService } from '../shared/toast.service';



@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule, EmployeeFilterPipe],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [EmployeeService]
})
export class EmployeeComponent implements OnInit {

  //for search/filter
  searchText: string= '';

  //for sorting up and done
  sortColumn = '';
  sortDirection = 'asc';

  //pagination
  currentPage = 1;
  pageSize = 5;

  // //toast
  // toastMessage = '';
  // toastType = '';
  // showToast: boolean = false;



  constructor(
    public employeeService: EmployeeService,
    private router: Router,
    public toastService: ToastService
  ) {}       //sees employeeService, create instance, injects into component, this is called Dependency Injection (DI)

  ngOnInit() {                                    // it'll run once when component loads
    this.resetForm();
    this.refreshEmployeeList();
  }


  onSort(column: string){
    this.sortColumn = column;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';

  }

  getSortedEmployees(){
    if (!this.sortColumn){
      return this.employeeService.employees;
    }
    //make a copy by using spread operator so we don't mess with original array of employee
    let sorted = [...this.employeeService.employees];
    let direction = this.sortDirection === 'asc' ? 1 : -1
    //sort it
    sorted.sort((a:any, b:any) =>{
      let valueA = a[this.sortColumn];
      let valueB = b[this.sortColumn];

      if (valueA > valueB) return 1 * direction;
      if (valueB > valueA) return -1 * direction;
      return 0;
    });

    return sorted

  }

  totalPage(){
    return Math.ceil(this.employeeService.employees.length / this.pageSize)
  }


  nextPage(){
    if (this.currentPage < this.totalPage()){
      this.currentPage += 1;
    }
  }

  prevPage(){
    if (this.currentPage > 1){
      this.currentPage -= 1;
    }
  }


  getPaginatedEmployees(){
    let start = (this.currentPage - 1) * this.pageSize;
    let end = start + this.pageSize
    return this.getSortedEmployees().slice(start, end);
  }

    onSearch(){
      this.currentPage = 1;
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
    // this.showToastMessage(message, 'success');                             //message show
    this.toastService.showToast(message, 'success')
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
      // this.showToastMessage('Deleted successfully', 'danger');                                //message
      this.toastService.showToast('Deleted Successfully', 'danger');
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

  // showToastMessage(message:string, type: string){
  //   this.toastMessage = message;
  //   this.toastType = type;
  //   this.showToast = true;
  //   setTimeout(()=> {
  //     this.showToast = false
  //   }, 3000)
  // }

  onLogout(){
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
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
