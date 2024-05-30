import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { Observable } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../../products/services/product.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  products: Product[] = [];
  search: string = '';
  constructor(private route: ActivatedRoute, private productService: ProductService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.route.queryParams.subscribe((params) => {
        const search = params['search'];
        this.search = search;
        this.searchProducts(search);
      });
    });

  }

  searchProducts(search: string) {
    this.productService.getSearchedProductsByName(search).subscribe((products) => {
      this.products = products;
    });
  }


}
