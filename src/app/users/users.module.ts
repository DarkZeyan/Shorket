import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './pages/login-page/login-page.component';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

const routes = [
  { path: 'login', component: LoginPageComponent }
];
@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    CommonModule,
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginPageComponent
  ]
})
export class UsersModule { }
