import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Slide } from '../../interfaces/slide.interface';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'main-page-slider',
  templateUrl: './main-page-slider.component.html',
  styleUrls: ['./main-page-slider.component.scss'],
})
export class MainPageSliderComponent implements AfterViewInit {
  @ViewChild('carousel')
  public carousel!: ElementRef<HTMLDivElement>;

  public slides:Slide[] = [
    { src: 'assets/slide1.jpg', width: 1200, height: 500},
    { src: 'assets/slide2.jpg', width: 1200, height: 500},
    { src: 'assets/slide3.jpg', width: 1200, height: 500},
    { src: 'assets/slide4.jpg', width: 1200, height: 500},
    { src: 'assets/slide5.jpg', width: 1200, height: 500},
    { src: 'assets/slide6.jpg', width: 1200, height: 500},
    { src: 'assets/slide7.jpg', width: 1200, height: 500},
    { src: 'assets/slide8.jpg', width: 1200, height: 500},
  ];

  ngAfterViewInit() {
    new bootstrap.Carousel(this.carousel.nativeElement, {
      interval: 4500, // Change this to the desired interval in milliseconds
      ride: 'carousel'
    });
  }
  constructor() { }

}
