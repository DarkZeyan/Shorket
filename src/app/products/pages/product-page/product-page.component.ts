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
export class ProductPageComponent  implements OnInit {


  product!: Product;

  reviews: Review[] = [];

  constructor(private route: ActivatedRoute, private ProductService: ProductService, private router: Router) {

  }




  ngOnInit() {

      const product_id = +this.route.snapshot.queryParams['product_id'];
      this.product = this.getProductById(product_id);
      this.reviews = this.getReviewsByProductId(this.product.id);

  }
  getProductById(product_id: number){
    return this.ProductService.getProductById(product_id);
  }
  getReviewsByProductId(product_id: number): Review[] {
    return this.ProductService.getReviewsByProductId(product_id);
  }

}
