import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


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



const routes:Routes = [
  { path: '', component: MainPageComponent },
  { path: 'addresses', component: AddressesPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'categories', component: CategoryPageComponent },
  { path: 'category/:name', component: CatalogPageComponent },
  { path: 'order-history', component: OrderHistoryPageComponent },
  { path: 'order/:id', component: OrderStatusPageComponent},
  { path: 'wish-list', component: WishListComponent},
  { path: 'admin', component: AdminPageComponent }
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
    WishListComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    MainPageModule,
    RouterModule.forChild(routes)
  ],
  exports:[
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
