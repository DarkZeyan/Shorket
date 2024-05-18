import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { ProductsModule } from './products/products.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true}), SharedModule, ProductsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
