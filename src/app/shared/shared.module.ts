import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MainPageComponent } from './pages/main-page/main-page.component';
import { AddressesPageComponent } from './pages/addresses-page/addresses-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import { OrderStatusPageComponent } from './pages/order-status-page/order-status-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';


import { MainPageModule } from './pages/main-page/main-page.module';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { TableComponentComponent } from './pages/cart-page/components/table-component/table-component.component';
import { PaymentMethodComponent } from './pages/cart-page/components/payment-method/payment-method.component';
import { WishListComponent } from './pages/wish-list/wish-list.component';
import { PromotionsPageComponent } from './pages/promotions-page/promotions-page.component';
import { Error404PageComponent } from './pages/404/404.component';
import { Error403PageComponent } from './pages/403/403.component';



const routes: Routes = [
  { path: 'home', component: MainPageComponent },
  { path: 'addresses', component: AddressesPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'categories', component: CategoryPageComponent },
  { path: 'category', component: CatalogPageComponent },
  { path: 'order-history', component: OrderHistoryPageComponent },
  { path: 'order', component: OrderStatusPageComponent },
  { path: 'wish-list', component: WishListComponent },
  { path: 'promotions', component: PromotionsPageComponent },
  { path: 'admin', component: AdminPageComponent },
];

@NgModule({
  declarations: [
    MainPageComponent,
    AddressesPageComponent,
    CartPageComponent,
    CatalogPageComponent,
    OrderHistoryPageComponent,
    OrderStatusPageComponent,
    AdminPageComponent,
    FooterComponent,
    NavbarComponent,
    CategoryPageComponent,
    TableComponentComponent,
    PaymentMethodComponent,
    WishListComponent,
    PromotionsPageComponent,
    Error403PageComponent,
    Error404PageComponent],

  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MainPageModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MainPageComponent,
    AddressesPageComponent,
    CartPageComponent,
    CatalogPageComponent,
    OrderHistoryPageComponent,
    OrderStatusPageComponent,
    AdminPageComponent,
    FooterComponent,
    NavbarComponent,
    RouterModule
  ],
  providers: []
})
export class SharedModule { }
