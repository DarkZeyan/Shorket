import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '@shared/intefaces/category.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<Category[]>('http://localhost:8000/categories').subscribe(data => {
      this.categories.next(data);
    });
    console.log(this.categories.value);
  }

  getCategories(): Observable<Category[]> {
    return this.categories.asObservable();
  }

  // getCategoryById(id: number): Observable<Category> {
  //   return this.categories.asObservable().pipe(
  //     map(categories => categories.find(category => category.category_id === id))
  //   );
  // }
}
