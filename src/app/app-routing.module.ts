import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from './shared/shared.module';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true}), SharedModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
