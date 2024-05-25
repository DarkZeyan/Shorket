import { Injectable } from '@angular/core';
import { CartItem } from '@shared/intefaces/cart.interface';

@Injectable({ providedIn: 'root' })
export class CartService {

  cartItems: CartItem[] = [];


  constructor() {

    // Obtener carrito del local storage
    this.getCart();


  }

  getTotalPrice(tempCart: CartItem[]) {
    if (tempCart.length > 0) {
      // Calcular el total de la compra
      return tempCart.reduce((acc, item) => {
        return acc + item.product.price * item.quantity;
      }, 0);
    }
    return 0;
  }

  // Guardar carrito en local storage
  saveCart(cart: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Verificar si un producto ya esta en el carrito

  checkIfProductIsAlreadyOnCart(product: CartItem): boolean {
    if (this.cartItems.length > 0) {
      return this.cartItems.some(item => item.product.product_id === product.product.product_id)
    }
    return false
  }

  // Añadir producto al carrito
  addToCart(product: CartItem) {
    let tempCart = [...this.cartItems];
    const index = tempCart.findIndex(item => item.product.product_id === product.product.product_id);

    if (index !== -1) {
      tempCart[index].quantity += product.quantity;
    } else {
      tempCart.push(product);
    }

    this.cartItems = tempCart;
    this.saveCart(tempCart);
  }


  // Eliminar producto del carrito
  removeItem(product: CartItem) {
    let tempCart = [...this.cartItems];
    const index = tempCart.findIndex(item => item.product.product_id === product.product.product_id);

    if (index !== -1) {
      tempCart.splice(index, 1);
    }

    this.cartItems = tempCart;
    this.saveCart(tempCart);
  }


  // Actualizar cantidad de producto en el carrito
  updateQuantity(product: CartItem, quantity: number) {
    let tempCart = [...this.cartItems];
    const index = tempCart.findIndex(item => item.product.product_id === product.product.product_id);

    if (index !== -1) {
      tempCart[index].quantity = quantity;
    }

    this.cartItems = tempCart;
    this.saveCart(tempCart);
  }

  // Limpiar carrito
  clearCart() {
    this.cartItems = [];
    this.saveCart([]);
  }

  // Obtener carrito del local storage
  getCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItems = JSON.parse(cart);
    }
  }

}
