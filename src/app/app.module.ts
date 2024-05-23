import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsModule } from './products/products.module';
import myLocale from '@angular/common/locales/es-MX'
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { CookieService } from 'ngx-cookie-service';

registerLocaleData(myLocale, 'es-MX');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    ProductsModule,
    UsersModule,
    NgbModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
