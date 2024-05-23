import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order, OrderDetail } from '@shared/intefaces/order.interface';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  API_URL = 'http://localhost:8000/orders';
  orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  ordersLoaded: boolean = false;
  orderDetailsLoaded: boolean = false;
  orderDetails: BehaviorSubject<OrderDetail[]> = new BehaviorSubject<OrderDetail[]>([]);


  constructor(private httpClient: HttpClient) { }


  getOrdersFromUser(user_id: number): Observable<Order[]> {

    if (this.ordersLoaded) {
      return this.httpClient.get<Order[]>(`${this.API_URL}/user/${user_id}`).pipe(
        tap(orders => {
          this.orders.next(orders);
        })
      );
    } else {
      return this.orders.asObservable();
    }
  }

  getOrderDetailsByOrderId(order_id: number): Observable<OrderDetail[]> {
    if (this.orderDetailsLoaded) {
      return this.httpClient.get<OrderDetail[]>(`${this.API_URL}/${order_id}/details`).pipe(
        tap(details => {
          this.orderDetails.next(details);
        })
      );
    } else {
      return this.orderDetails.asObservable();
    }
  }

  getOrderByOrderId(order_id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.API_URL}/${order_id}`);
  }


  getDetailWithMostExpensiveProduct(orderId: number): OrderDetail {
    const detailsObservable = this.getOrderDetailsByOrderId(orderId).pipe(
      map(details => details.filter(detail => detail.subtotal > 0))
    );

    let mostExpensiveDetail: OrderDetail = {
      detail_id: 0,
      order_id: 0,
      product_id: 0,
      quantity: 0,
      subtotal: 0
    }; // Initialize with an empty OrderDetail object

    detailsObservable.subscribe(details => {
      mostExpensiveDetail = details.reduce((previous, current) => {
        return previous.subtotal > current.subtotal ? previous : current;
      });
    });

    return mostExpensiveDetail;
  }
}
