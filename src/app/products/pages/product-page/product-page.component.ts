import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductReview } from '@products/interfaces/product-review.interface';
import { Observable, filter } from 'rxjs';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {


  product!: Observable<Product>;
  suggestedProducts!: Observable<Product[]>;
  productReviews!: Observable<ProductReview[]>;
  constructor(private route: ActivatedRoute, private ProductService: ProductService, private router: Router) {

  }




  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const product_id = +params['product_id'];
      this.product = this.getProductById(product_id);
      this.product.subscribe(product => {
        this.productReviews = this.ProductService.getReviewsByProductId(product.product_id).pipe(
          filter(review => review !== null)
        );
        this.suggestedProducts = this.getSuggestedProducts(product.product_id, product.category_id);
      });
    });
  }
  getProductById(product_id: number) {
    return this.ProductService.getProductById(product_id);
  }



  getSuggestedProducts(product_id: number, category_id: number): Observable<Product[]> {
    return this.ProductService.getSuggestedProductsByCategory(product_id);
  }

}
