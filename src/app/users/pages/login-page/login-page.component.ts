import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { last } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements AfterViewInit {

  modal!: Modal;
  loginForm: FormGroup;
  registerForm: FormGroup;
  datePickerModel!: NgbDateStruct;

  // Controladores de alerts
  loginFailed: boolean = false;
  registerFailed: boolean = false;
  registerSuccess: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      // Define form controls for each login field
      email_login: ['', Validators.required],
      password_login: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      // Define form controls for each register field
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      verify_password: ['', Validators.required],
      birth_date: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.modal = new Modal(document.getElementById('registerNewUser')!);
  }

  onSubmit(): void {
    console.log('Entro')
    if (this.loginForm.valid) {
      // Call the login service
      console.log(this.loginForm.value);
      this.loginForm.reset();
      // this.router.navigate(['/home']);
    }
  }
  onSubmitRegister(): void {
    if (this.registerForm.valid) {
      // Call the register service
      this.registerForm.reset();
      this.modal.hide();
      this.registerSuccess = true;
      setInterval(() => {
        this.registerSuccess = false;
      }, 8000);
    }
  }
}
