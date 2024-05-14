import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';


import { MainPageComponent } from './pages/main-page/main-page.component';
import { AddressesPageComponent } from './pages/addresses-page/addresses-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import { OrderStatusPageComponent } from './pages/order-status-page/order-status-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { FooterComponent } from './components/footer/footer.component';

import { NavbarComponent } from './components/navbar/navbar.component';


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
    NavbarComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot({})
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
    NavbarComponent
  ]
})
export class SharedModule { }
