import { Component, OnInit } from '@angular/core';
import { Category } from '@shared/intefaces/category.interface';
import { CategoryService } from '../../services/category.service';
import { BehaviorSubject, Observable } from 'rxjs';

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


  getCategoryImage(category: Category) {
    if (category.image instanceof Blob) {
      this.getImageAsString(category.image).then(imageBase64 => {
        category.image = imageBase64;
      });
    }
  }

  getImageAsString(image: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
    });
  }

}
