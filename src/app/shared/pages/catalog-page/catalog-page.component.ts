import { Component } from '@angular/core';
import { Category } from '@shared/intefaces/category.interface';
@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent {

  public categories:Category[] = [
    { id:1, name: 'Computadoras', image: '' },
    { id:2, name: 'Celulares', image: '' },
    { id:3, name: 'Smartwatches', image: '' },
    { id:4, name: 'Perifericos', image: '' },
    { id:5, name: 'Audio', image: '' },
    { id:6, name: 'Hardware', image: '' },
  ]

  constructor() {
  }


}
