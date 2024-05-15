import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MainPageSliderComponent } from '../../components/main-page-slider/main-page-slider.component';

@NgModule({
  imports: [CommonModule],
  exports: [MainPageSliderComponent],
  declarations: [MainPageSliderComponent],
  providers: [],
})
export class MainPageModule { }
