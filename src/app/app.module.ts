import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MainPageComponent } from './shared/pages/main-page/main-page.component';
import { AdminPageComponent } from './shared/pages/admin-page/admin-page.component';
import { CatalogPageComponent } from './shared/pages/catalog-page/catalog-page.component';
import { ProductPageComponent } from './shared/pages/product-page/product-page.component';
import { AddressesPageComponent } from './shared/pages/addresses-page/addresses-page.component';
import { OrderStatusPageComponent } from './shared/pages/order-status-page/order-status-page.component';
import { CartPageComponent } from './shared/pages/cart-page/cart-page.component';
import { OrderHistoryPageComponent } from './shared/pages/order-history-page/order-history-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MainPageComponent,
    AdminPageComponent,
    CatalogPageComponent,
    ProductPageComponent,
    AddressesPageComponent,
    OrderStatusPageComponent,
    CartPageComponent,
    OrderHistoryPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
