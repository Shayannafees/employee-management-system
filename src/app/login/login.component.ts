import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {

  constructor(private router: Router, private http: HttpClient) {}

  email = '';
  password = '';
  errorMessage = '';

  onLogin(){
    this.http.post(environment.apiUrl + '/login', {
      email: this.email,
      password: this.password
    }).subscribe((res:any)=>{
      localStorage.setItem('token', res.token);
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/employees'])
    }, (err) => {
      this.errorMessage = 'Invalid email or password';
    });
  }

}
