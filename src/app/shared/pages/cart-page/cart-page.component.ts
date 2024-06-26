import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CartItem } from '@shared/intefaces/cart.interface';
import { CartService } from './services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { User } from '../../../users/interfaces/user.interface';
import { Order, OrderBody, OrderDetail } from '@shared/intefaces/order.interface';
import { UsersService } from '../../../users/services/users.service';
import { AddressService } from '../../services/addresses.service';
import { Observable } from 'rxjs';
import { Address } from '@shared/intefaces/address.interface';
import { Toast } from 'bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})

export class CartPageComponent implements OnInit, AfterViewInit {

  successFullOrder!: Toast;
  cartItems: CartItem[] = [];
  user: User | null = null;
  addresses!: Observable<Address[]>;
  addressesLength: number = 0;
  selectedAddressID: number = 0;


  constructor(private cartService: CartService, private router: Router, private orderService: OrdersService, private addressService: AddressService, private usersService: UsersService) {
    this.user = this.usersService.getUserFromCookies();
    this.cartItems = this.cartService.cartItems;
  };


  // Convert cart items to an order
  createOrder(address_id: number): void {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
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
      this.orderService.createOrderUserAddress(user.user_id, address_id, order.order_id);
      this.cartItems.forEach(cartItem => {
        const orderDetailBody = {
          order_id: order.order_id,
          product_id: cartItem.product.product_id,
          quantity: cartItem.quantity,
          subtotal: cartItem.product.price * cartItem.quantity
        };
        this.orderService.createOrderDetail(orderDetailBody).subscribe((orderDetail: OrderDetail) => {
          // Se crea el detalle de la orden
        });
      });
      this.successFullOrder.show();
      setTimeout(() => {
        this.successFullOrder.hide();
        this.cartService.clearCart();
        this.router.navigate(['/order'], { queryParams: { order_id: order.order_id } }).then(() => {
          window.location.reload();
        });
      }, 4500);
    });
  }



  ngOnInit(): void {
    this.cartService.getCart()
    this.cartItems = this.cartService.cartItems;
    this.addresses = this.addressService.getAddressesByUser(this.user!.user_id);
    this.addresses.subscribe((addresses) => {
      this.addressesLength = addresses.length;
    });
  }

  ngAfterViewInit(): void {
    this.successFullOrder = new Toast(document.getElementById('successToast')!);
  }

}
