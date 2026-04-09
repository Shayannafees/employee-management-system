import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor (private router: Router, private http: HttpClient){}

  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';
  successMessage = '';

  onRegister(){
    if (this.password != this.confirmPassword){
      this.errorMessage = 'Password does not match';
      return;
    }

    this.http.post(environment.apiUrl + '/register', {
      email: this.email,
      password: this.password
    }).subscribe((res:any)=> {
      this.successMessage = 'Registered Successfully! Please login.';
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }, (err)=> {
      this.errorMessage = err.error.message || 'Registeration Failed';
    });
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }
}
