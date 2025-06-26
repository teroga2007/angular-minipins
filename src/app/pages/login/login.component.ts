import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [],
  templateUrl: './login.component.html',
  styles: ``,
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    const userJson = '{"username":"admin","password":"1234"}';
    const user = JSON.parse(userJson);
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/profile']);
  }
}
