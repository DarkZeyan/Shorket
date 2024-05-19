import { Component, Input } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';

@Component({
  selector: 'suggested-products',
  templateUrl: './suggested-products.component.html',
  styleUrl: './suggested-products.component.css'
})
export class SuggestedProductsComponent {
  @Input()
  suggestedProducts: Product[] = [];

}
