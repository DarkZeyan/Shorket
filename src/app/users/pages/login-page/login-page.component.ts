import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements AfterViewInit, OnInit {

  modal!: Modal;
  loginForm: FormGroup;
  registerForm: FormGroup;
  datePickerModel!: NgbDateStruct;

  // Controladores de alerts
  loginFailed: boolean = false;
  registerFailed: boolean = false;
  registerSuccess: boolean = false;

  ngOnInit(): void {
    const user = this.usersService.getUserFromCookies();
    if (user) {
      this.router.navigate(['/home']);
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private usersService: UsersService) {
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
    if (this.loginForm.valid) {
      // Call the login service
      console.log(this.loginForm.value);
      this.usersService.getUserByEmailPassword(this.loginForm.value.email_login, this.loginForm.value.password_login).subscribe(
        (user: User | null) => {
          // Handle successful login
          if (user) {
            this.loginForm.reset();
            setInterval(() => {
              this.router.navigate(['/home']).then(() => {
                window.location.reload();
              });
            }, 500);
          }
          else {
            console.log('Login failed');
            this.loginFailed = true;
            setInterval(() => {
              this.loginFailed = false;
            }, 20000);
          }
        },
        (error) => {
          console.log(error);
        }
      );

    }
  }
  onSubmitRegister(): void {
    if (this.registerForm.valid) {

      if (this.registerForm.value.password !== this.registerForm.value.verify_password) {
        this.registerFailed = true;
        setInterval(() => {
          this.registerFailed = false;
        }, 20000);
        return;
      }

      // Convert the birth_date to a string
      console.log(this.registerForm.value.birth_date);
      const birth_date = `${this.registerForm.value.birth_date.year}-${this.registerForm.value.birth_date.month}-${this.registerForm.value.birth_date.day}`;
      this.registerForm.value.birth_date = birth_date;

      // Delete the verify_password field
      delete this.registerForm.value.verify_password;

      //Convert form data to an User object
      const user: User = this.registerForm.value;

      // Call the create user service
      this.usersService.createUser(user).subscribe(
        (createdUser: User) => {
          console.log(createdUser)
          // After creating the user, log the user in
          this.usersService.getUserByEmailPassword(createdUser.email, createdUser.password).subscribe(
            (loggedInUser: User | null) => {
              console.log(loggedInUser)
              if (loggedInUser) {

                // Call the register service
                this.registerForm.reset();


                this.modal.hide();
                this.registerSuccess = true;
                setInterval(() => {
                  this.registerSuccess = false;
                  this.router.navigate(['/home']).then(() => {
                    window.location.reload();
                  }
                  );
                }, 5000);

              }
              else {
                console.log('Login failed');
              }
            },
            (loginError) => {
              console.log(loginError);
            }
          );
        },
        (createError) => {
          console.log(createError);
        }
      );



    }
  }
}
