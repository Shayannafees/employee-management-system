import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map';
//// ✅ NEW WAY
import { map } from 'rxjs/operators';
// import 'rxjs/add/operator/toPromise';
import { Employee } from './employee.model';
import { environment } from '../../environments/environment';


//injectable decorator
@Injectable({
  providedIn: 'root' // This makes the service available everywhere
})

export class EmployeeService {
  selectedEmployee: Employee = new Employee();      //creating an instance of Employee class model
  employees: Employee[] = [];
  readonly baseURL = environment.apiUrl + '/employees'; //  our Node JS API endpoint/port!

  constructor(private http: HttpClient) { }

  postEmployee(emp: any) {
  // Create a copy of the data
  const tempEmp = { ...emp };     // to avoid modifying original data
  // If _id is empty, remove it so MongoDB generates a new one automatically
  if (tempEmp._id === "") {
    delete tempEmp._id;
  }
  return this.http.post(this.baseURL, tempEmp);
}


  getEmployeeList(){
    return this.http.get(this.baseURL);
  }



  putEmployee(emp: Employee) {
    return this.http.put(this.baseURL + `/${emp._id}`, emp);   // PUT http://localhost:3000/employees/123 , body { name: ali updated }
  }


  deleteEmployee(_id: String) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }


}
