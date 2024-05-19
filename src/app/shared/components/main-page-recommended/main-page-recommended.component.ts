import { Router} from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from './../../../products/services/product.service';
import { Component} from '@angular/core';

@Component({
  selector: 'main-page-recommended',
  templateUrl: './main-page-recommended.component.html',
  styleUrls: ['./main-page-recommended.component.css'],
})
export class MainPageRecommendedComponent{

  suggestedProducts: Product[] = [];

  constructor(private productsService:ProductService) { }

  ngOnInit() {
    this.suggestedProducts = this.getSuggestedProducts();
  }

  getSuggestedProducts(): Product[] {
    return this.productsService.getRandomSuggestedProducts();
  }
}
