import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { MainPageSliderComponent } from '../../components/main-page-slider/main-page-slider.component';

@NgModule({
  imports: [CommonModule, NgbCarouselModule],
  exports: [MainPageSliderComponent],
  declarations: [MainPageSliderComponent],
  providers: [],
})
export class MainPageModule { }
