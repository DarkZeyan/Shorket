import { Router } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from './../../../products/services/product.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'main-page-recommended',
  templateUrl: './main-page-recommended.component.html',
  styleUrls: ['./main-page-recommended.component.css'],
})
export class MainPageRecommendedComponent {

  suggestedProducts: Observable<Product[]> = new Observable<Product[]>();

  constructor(private productsService: ProductService) { }

  ngOnInit() {
    this.suggestedProducts = this.getSuggestedProducts();
  }

  getSuggestedProducts(): Observable<Product[]> {
    return this.productsService.getRandomSuggestedProducts();
  }
}
