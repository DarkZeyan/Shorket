import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from '@shared/intefaces/cart.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'cart-table-component',
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.css'
})
export class TableComponentComponent implements OnInit{
  @Input()
  cartItems: CartItem[] = [];
  total:number = 0;
  constructor(private cartService:CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.total = this.getCartTotal(this.cartItems);
  }
  getCartTotal(cartItems: CartItem[]) {
    return this.cartService.getTotalPrice(cartItems);
  }
}
