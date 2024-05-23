import { Component, OnInit } from '@angular/core';
import { CartItem } from '@shared/intefaces/cart.interface';
import { CartService } from './services/cart.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  cartItems: CartItem[] = [];



  constructor(private cartService: CartService) { };

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
  }





}
