import { Component, OnDestroy, OnInit } from '@angular/core';
import { Order } from '@shared/intefaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/interfaces/user.interface';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrl: './order-history-page.component.css'
})
export class OrderHistoryPageComponent implements OnInit, OnDestroy {



  orders!: Observable<Order[]>;
  ordersLength: number = 0;
  user!: User;
  private orderSubscription: Subscription = new Subscription;


  constructor(private orderService: OrdersService, private userService: UsersService) { }

  ngOnInit(): void {

    this.user = this.userService.getUserFromCookies()!;
    this.orders = this.orderService.getOrdersFromUser(this.user.user_id);
    this.orders.subscribe((orders: Order[]) => {
      this.ordersLength = orders.length;
    });

  }


  getOrderStatusLabelTranslated(status: string) {
    switch (status) {
      case 'Completed':
        return 'Pedido completado';
      case 'Pending':
        return 'Pedido en almacen';
      case 'Sent':
        return 'Pedido enviado';
      default:
        return 'Estado desconocido';
    }
  }


  getOrderByUser(user_id: number): Observable<Order[]> {
    return this.orderService.getOrdersFromUser(user_id);
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
  }

}
