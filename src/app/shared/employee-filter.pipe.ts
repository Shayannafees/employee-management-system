import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee.model';


@Pipe({
  name: 'employeeFilter',
  standalone: true
})
export class EmployeeFilterPipe implements PipeTransform {

  transform(employees: Employee[], searchText: string): Employee[] {

    if (!employees) return [];
    if (!searchText) return employees;

    searchText = searchText.toLowerCase();

    return employees.filter(emp =>
      emp.name?.toLowerCase().includes(searchText) || emp.position?.toLowerCase().includes(searchText)
    );


  }

}
