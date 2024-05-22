import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

import { Error403PageComponent } from './shared/pages/403/403.component';
import { Error404PageComponent } from './shared/pages/404/404.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '403', component: Error403PageComponent },
  { path: '404', component: Error404PageComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule, ProductsModule, UsersModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
