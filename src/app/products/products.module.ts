import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductReviewComponent } from './components/product-review/product-review.component';
import { SuggestedProductsComponent } from './components/suggested-products/suggested-products.component';

const routes = [
  { path: 'products', component: ProductPageComponent }
];


@NgModule({
  declarations: [ProductPageComponent, ProductReviewComponent, SuggestedProductsComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    ProductPageComponent
  ],
  providers: [

  ]
})
export class ProductsModule { }
