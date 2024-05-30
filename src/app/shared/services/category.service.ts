import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '@shared/intefaces/category.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CategoryService {

  private categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
  private categoriesLoaded: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getCategories(): Observable<Category[]> {
    if (!this.categoriesLoaded) {
      return this.httpClient.get<Category[]>('http://localhost:8000/categories').pipe(
        tap(categories => {
          this.categories.next(categories);
          this.categoriesLoaded = true;
        })
      );
    }
    else {
      return this.categories.asObservable();
    }
  }


  getCategoryById(id: number): Observable<Category> {

    return this.getCategories().pipe(
      map(categories => {
        const category = categories.find(category => category.category_id === id);
        if (!category) {
          throw new Error('Category not found');
        }
        return category;
      })
    );
  }

  addCategory(name: string): Observable<Category> {
    return this.httpClient.post<Category>('http://localhost:8000/categories', { name: name }).pipe(
      tap(category => {
        this.categories.next([...this.categories.getValue(), category]);
      })
    );
  }

  deleteCategory(id: number): Observable<Category> {
    return this.httpClient.delete<Category>(`http://localhost:8000/categories/${id}`).pipe(
      tap(() => {
        this.categories.next(this.categories.getValue().filter(category => category.category_id !== id));
      })
    );
  }
}
