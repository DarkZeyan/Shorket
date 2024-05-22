import { Component, OnInit } from '@angular/core';
import { Category } from '@shared/intefaces/category.interface';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrl: './category-page.component.css'
})
export class CategoryPageComponent implements OnInit {
  public categories!: Observable<Category[]>;

  constructor(private CategoryService: CategoryService) {
  }
  ngOnInit() {
    this.categories = this.CategoryService.getCategories();
  }


}
