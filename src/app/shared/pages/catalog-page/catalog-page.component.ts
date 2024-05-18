import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../../products/services/product.service';
@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent implements OnInit{

  public category: string = '';
  public category_id: number = 0;
  public banner_img: string = '';
  public products: Product[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductService) {

  }

  ngOnInit(): void {
      this.route.params.subscribe(() => {
        this.category = this.route.snapshot.params['name'];
        this.category_id = +this.route.snapshot.queryParams['id'];
        this.banner_img = `assets/cat-banners/${this.category}.png`;
        this.products = this.getProductsByCategory(this.category_id);
      });

  }

  getProductsByCategory(category_id: number){
    return this.productService.getProductsByCategory(category_id);
  }



}
