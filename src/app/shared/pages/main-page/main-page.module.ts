import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { MainPageSliderComponent } from '../../components/main-page-slider/main-page-slider.component';
import { MainPageRecommendedComponent } from '../../components/main-page-recommended/main-page-recommended.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbCarouselModule],
  exports: [MainPageSliderComponent, MainPageRecommendedComponent],
  declarations: [MainPageSliderComponent,MainPageRecommendedComponent],
  providers: [],
})
export class MainPageModule { }
