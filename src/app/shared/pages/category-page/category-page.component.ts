import { Component } from '@angular/core';
import { Category } from '@shared/intefaces/category.interface';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent {
  public categories:Category[] = [
    { id:1, name: 'computadoras', image: 'assets/computadoras.png' },
    { id:2, name: 'celulares', image: 'assets/celulares.png' },
    { id:3, name: 'smartwatches', image: 'assets/smartwatches.png' },
    { id:4, name: 'perifericos', image: 'assets/perifericos.png' },
    { id:5, name: 'audio', image: 'assets/audio.png' },
    { id:6, name: 'hardware', image: 'assets/hardware.png' },
  ]

    constructor() {
    }
}
