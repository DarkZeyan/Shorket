import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { Review } from '@products/interfaces/product-review.interface';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {


  product!: Product;

  reviews: Review[] = [];
  suggestedProducts: Product[] = [];

  constructor(private route: ActivatedRoute, private ProductService: ProductService, private router: Router) {

  }




  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const product_id = +params['product_id'];
      this.product = this.getProductById(product_id);
      this.reviews = this.getReviewsByProductId(this.product.product_id);
      this.suggestedProducts = this.getSuggestedProducts(this.product.product_id, this.product.category_id);
    });

  }
  getProductById(product_id: number) {
    return this.ProductService.getProductById(product_id);
  }
  getReviewsByProductId(product_id: number): Review[] {
    return this.ProductService.getReviewsByProductId(product_id);
  }

  getSuggestedProducts(product_id: number, category_id: number): Product[] {
    return this.ProductService.getSuggestedProductsByCategory(product_id, category_id);
  }

}
