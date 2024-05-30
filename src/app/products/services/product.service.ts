import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Product, ProductBody } from '@products/interfaces/product.interface';
import { ProductReview } from '@products/interfaces/product-review.interface';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private API_URL = 'http://localhost:8000/products';
  private API_URL_REVIEWS = 'http://localhost:8000/reviews';

  private product!: Product;


  private productReviews: BehaviorSubject<ProductReview[]> = new BehaviorSubject<ProductReview[]>([]);
  private products: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private productsLoaded: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) { }

  getReviewsByProductId(product_id: number): Observable<ProductReview[]> {
    return this.httpClient.get<ProductReview[]>(`${this.API_URL_REVIEWS}/${product_id}`).pipe(
      tap(reviews => {
        this.productReviews.next(reviews);
      })
    );
  }

  getProducts(): Observable<Product[]> {
    if (!this.productsLoaded) {
      return this.httpClient.get<Product[]>(this.API_URL).pipe(
        tap(products => {
          this.products.next(products);
          this.productsLoaded = true;
        })
      );
    } else {
      return this.products.asObservable();
    }
  }

  getProductById(id: number): Observable<Product | null> {
    return this.httpClient.get<Product>(`${this.API_URL}/${id}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          this.router.navigate(['/404']);
          return of(null);
        } else {
          throw new Error('An error occurred while fetching the product');
        }
      }
      ),

      tap(product => {
        this.product = product!;
      })
    );
  }


  getProductsByCategory(category_id: number): Observable<Product[]> {
    // Obtener productos por categoría
    // por medio del getter de productos
    return this.getProducts().pipe(
      map(products => products.filter(product => product.category_id === category_id))
    );
  }

  // Obtener dos productos aleatorios para sugerir al usuario

  getRandomSuggestedProducts(): Observable<Product[]> {
    return this.getProducts().pipe(
      map(products => {
        if (products.length > 2) {
          const suggestedProducts: Product[] = [];
          let randomIndex1 = Math.floor(Math.random() * products.length);
          let randomIndex2;
          do {
            randomIndex2 = Math.floor(Math.random() * products.length);
          } while (randomIndex1 === randomIndex2);
          suggestedProducts.push(products[randomIndex1]);
          suggestedProducts.push(products[randomIndex2]);
          return suggestedProducts;
        }
        return [];
      })
    );
  }



  getSuggestedProductsByCategory(product_id: number): Observable<Product[]> {
    // Obtener 2 productos sugeridos por medio de la categoría
    // del producto actual
    return this.getProductById(product_id).pipe(
      switchMap(product =>
        this.getProductsByCategory(product!.category_id).pipe(
          // Filtrar los productos que no sean el producto actual
          // y obtener dos productos aleatorios

          map(products => products.filter(p => p.product_id !== product_id).slice(0, 2)),

        )
      )
    );

  }

  createProduct(product: ProductBody): Observable<Product> {
    return this.httpClient.post<Product>(this.API_URL, product).pipe(
      tap(newProduct => {
        this.products.next([...this.products.value, newProduct]);
      })
    );
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.httpClient.delete<Product>(`${this.API_URL}/${product.product_id}`).pipe(
      tap(() => {
        const products = this.products.value.filter(p => p.product_id !== product.product_id);
        this.products.next(products);
      })
    );
  }

  getSearchedProductsByName(name: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.API_URL}/search/${name}`).pipe(
      tap(products => {
        this.products.next(products);
      })
    );
  }

}
