import { Component, OnInit } from '@angular/core';
import { CartItem } from '@shared/intefaces/cart.interface';
import { CartService } from './services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { User } from '../../../users/interfaces/user.interface';
import { Order, OrderBody, OrderDetail } from '@shared/intefaces/order.interface';
import { UsersService } from '../../../users/services/users.service';
import { AddressService } from '../../services/addresses.service';
import { Observable } from 'rxjs';
import { Address } from '@shared/intefaces/address.interface';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {

  cartItems: CartItem[] = [];
  user: User | null = null;
  addresses!: Observable<Address[]>;
  addressesLength: number = 0;
  selectedAddressID: number = 0;


  constructor(private cartService: CartService, private orderService: OrdersService, private addressService: AddressService, private usersService: UsersService) {
    this.user = this.usersService.getUserFromCookies();
    this.cartItems = this.cartService.cartItems;
  };


  // Convert cart items to an order
  createOrder(address_id: number): void {
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
      this.orderService.createOrderUserAddress(user.user_id, address_id, order.order_id).subscribe((orderUserAddress) => {
        console.log('orderUserAddress registrada');
        console.log(address_id)
      });
      console.log('Carrito', this.cartItems)
      this.cartItems.forEach(cartItem => {
        const orderDetailBody = {
          order_id: order.order_id,
          product_id: cartItem.product.product_id,
          quantity: cartItem.quantity,
          subtotal: cartItem.product.price * cartItem.quantity
        };
        console.log(orderDetailBody);
        this.orderService.createOrderDetail(orderDetailBody).subscribe((orderDetail: OrderDetail) => {
          // Se crea el detalle de la orden
          console.log('orderDetail registrada', orderDetail);
        });
      });
    }
    )
    this.cartService.clearCart();



  }



  ngOnInit(): void {
    this.cartService.getCart()
    this.cartItems = this.cartService.cartItems;
    this.addresses = this.addressService.getAddressesByUser(this.user!.user_id);
    this.addresses.subscribe((addresses) => {
      this.addressesLength = addresses.length;
      console.log(this.addressesLength)
    });
  }


}
