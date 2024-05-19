import { Injectable } from '@angular/core';
import { CartItem } from '@shared/intefaces/cart.interface';

@Injectable({providedIn: 'root'})
export class CartService {

  cartItems:CartItem[] = [];

  setCartItems(items:CartItem[]) {
    this.cartItems = items;
  }


  constructor() { }

  getTotalPrice(tempCart:CartItem[]) {
    if(tempCart.length > 0) {
      // Calcular el total de la compra
      return tempCart.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
    }
    return 0;
  }

}
