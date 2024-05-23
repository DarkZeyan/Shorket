import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '@shared/intefaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrl: './order-history-page.component.css'
})
export class OrderHistoryPageComponent implements OnInit, OnDestroy {



  orders: Observable<Order[]> = new Observable<Order[]>();
  ordersLength: number = 0;
  private orderSubscription: Subscription = new Subscription;


  constructor(private orderService: OrdersService, private userService: UsersService) { }

  ngOnInit(): void {
    const user = this.userService.getUserFromCookies();
    if (!user) {
      return;
    }
    this.orders = this.getOrderByUser(user.user_id);
    this.orderSubscription = this.orders.subscribe(orders => {
      this.ordersLength = orders.length;
    })
  }

  getOrderByUser(user_id: number): Observable<Order[]> {
    return this.orderService.getOrdersFromUser(user_id);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
