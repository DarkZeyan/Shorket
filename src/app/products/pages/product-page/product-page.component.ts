import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent  implements OnInit {


  product!: Product;

  constructor(private route: ActivatedRoute, private ProductService: ProductService, private router: Router) {

  }




  ngOnInit() {

      const product_id = +this.route.snapshot.queryParams['product_id'];
      this.product = this.getProductById(product_id);
  }
  getProductById(product_id: number){
    return this.ProductService.getProductById(product_id);
  }

}
