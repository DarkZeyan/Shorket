import { Component, OnInit } from '@angular/core';
import { CartItem } from '@shared/intefaces/cart.interface';
import { CartService } from './services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { User } from '../../../users/interfaces/user.interface';
import { Order, OrderBody, OrderDetail } from '@shared/intefaces/order.interface';
import { UsersService } from '../../../users/services/users.service';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  cartItems: CartItem[] = [];
  user: User | null = null;


  constructor(private cartService: CartService, private orderService: OrdersService, private usersService: UsersService) {
    this.user = this.usersService.getUserFromCookies();
    this.cartItems = this.cartService.cartItems;
  };


  // Convert cart items to an order
  createOrder(): void {
    console.log('Creating order')
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    console.log(deliveryDate)
    const orderBody: OrderBody = {
      status: 'Pending',
      total: this.cartService.cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0),
      order_date: new Date().toISOString(),
      delivery_date: deliveryDate.toISOString(),
    };

    const user = this.usersService.getUserFromCookies();
    if (user === null) {
      return;
    }

    this.orderService.createOrder(orderBody).subscribe((order: Order) => {
      console.log(user)
      this.orderService.createOrderUserAddress(user.user_id, 1, order.order_id).subscribe((orderUserAddress) => {
        console.log('orderUserAddress registrada', orderUserAddress);
      });

      this.cartService.cartItems.forEach(cartItem => {
        const orderDetailBody = {
          order_id: order.order_id,
          product_id: cartItem.product.product_id,
          quantity: cartItem.quantity,
          subtotal: cartItem.product.price * cartItem.quantity
        };
        this.orderService.createOrderDetail(orderDetailBody).subscribe((orderDetail: OrderDetail) => {
          console.log(orderDetail);
        });
      });
    }
    );


    this.cartService.clearCart();

  }



  ngOnInit(): void {
    this.cartService.getCart()
    this.cartItems = this.cartService.cartItems;
  }


}
