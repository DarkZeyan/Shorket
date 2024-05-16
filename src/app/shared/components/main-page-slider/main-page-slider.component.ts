import { Component,  } from '@angular/core';
import { Slide } from '../../interfaces/slide.interface';

@Component({
  selector: 'main-page-slider',
  templateUrl: './main-page-slider.component.html',
  styleUrls: ['./main-page-slider.component.scss'],
})
export class MainPageSliderComponent {

  public slides:Slide[] = [
    { src: 'assets/slide1.jpg', width: 1000, height: 500},
    { src: 'assets/slide2.jpg', width: 1000, height: 500},
    { src: 'assets/slide3.jpg', width: 1000, height: 500},
    { src: 'assets/slide4.jpg', width: 1000, height: 500},
    { src: 'assets/slide5.jpg', width: 1000, height: 500},
    { src: 'assets/slide6.jpg', width: 1000, height: 500},
    { src: 'assets/slide7.jpg', width: 1000, height: 500},
    { src: 'assets/slide8.jpg', width: 1000, height: 500},
  ];

  constructor() { }

}
