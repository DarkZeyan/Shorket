import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../../products/services/product.service';
import { Category } from '@shared/intefaces/category.interface';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent implements OnInit {

  public category: string = '';
  public category_object!: Category;
  public category_id: number = 0;
  public banner_img: string | Blob = '';
  public products: Product[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductService, private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(() => {
      this.category = this.route.snapshot.params['name'];
      this.category_id = +this.route.snapshot.queryParams['id'];

      this.products = this.getProductsByCategory(this.category_id);
      this.getCategoryById(this.category_id).subscribe(data => {
        this.category_object = data;
        this.banner_img = data.banner_image;
      });



    });

  }

  getCategoryById(category_id: number) {
    return this.categoryService.getCategoryById(category_id);
  }

  getProductsByCategory(category_id: number) {
    return this.productService.getProductsByCategory(category_id);
  }



}
