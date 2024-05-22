import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), SharedModule, ProductsModule, UsersModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
