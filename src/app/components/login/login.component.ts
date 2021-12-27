import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private _api: ApiService,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(6)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    })
  }

  onSubmit() {
    // If the form is invalid, do nothing
    if (this.loginForm.invalid) {
      console.error('Login form is invalid')
      return;
    }

    // Get entered email and password
    let email = this.loginForm.get('email').value
    let password = this.loginForm.get('password').value

    // Await response of login from server
    this.authService.login(email, password).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.token)
        this.tokenStorage.saveUser(data.user)
        this.router.navigate(['/user']);
      },
      (error) => console.error(error))
  }
}
