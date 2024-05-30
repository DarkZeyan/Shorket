import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@shared/intefaces/address.interface';
import { Order, OrderBody, OrderDetail, OrderDetailBody } from '@shared/intefaces/order.interface';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  API_URL = 'https://f5bzmcmfqw.us-east-2.awsapprunner.com/orders';
  orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  ordersLoaded: boolean = false;
  orderDetailsLoaded: boolean = false;
  orderDetails: BehaviorSubject<OrderDetail[]> = new BehaviorSubject<OrderDetail[]>([]);


  constructor(private httpClient: HttpClient) { }


  getOrdersFromUser(user_id: number): Observable<Order[]> {
    if (!this.ordersLoaded) {
      return this.httpClient.get<Order[]>(`${this.API_URL}/user/${user_id}`).pipe(
        tap(orders => {
          this.orders.next(orders);
          this.ordersLoaded = true;
        })
      );
    } else {
      return this.orders.asObservable();
    }
  }

  getOrderDetailsByOrderId(order_id: number): Observable<OrderDetail[]> {
    if (!this.orderDetailsLoaded) {
      return this.httpClient.get<OrderDetail[]>(`${this.API_URL}/${order_id}/details`).pipe(
        tap(details => {
          this.orderDetailsLoaded = true;
          this.orderDetails.next(details);
        })
      );
    } else {
      return this.orderDetails.asObservable();
    }
  }

  getOrderByOrderId(order_id: number): Observable<Order> {
    return this.httpClient.get<Order>(`${this.API_URL}/${order_id}`).pipe(
      tap(order => {
      })
    );
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

  // Create a new order
  createOrder(orderBody: OrderBody): Observable<Order> {
    return this.httpClient.post<Order>(this.API_URL, orderBody);
  }

  // Create a new order detail
  createOrderDetail(detail: OrderDetailBody): Observable<OrderDetail> {
    return this.httpClient.post<OrderDetail>(`${this.API_URL}/detail`, detail);
  }

  // Update order status
  updateOrderStatus(order_id: number, status: string): Observable<Order> {
    return this.httpClient.put<Order>(`${this.API_URL}/${order_id}`, { status });
  }

  // Delete an order
  deleteOrder(order_id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${order_id}`);
  }

  // Delete an order detail
  deleteOrderDetail(detail_id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/details/${detail_id}`);
  }

  createOrderUserAddress(user_id: number, address_id: number, order_id: number): Observable<void> {
    return this.httpClient.post<void>(`${this.API_URL}/orderuseraddress/${order_id}/${user_id}/${address_id}`, { user_id, address_id, order_id });
  }


  getOrderAddressIDByOrderId(order_id: number): Observable<{ address_id: number }> {
    return this.httpClient.get<{ address_id: number }>(`${this.API_URL}/${order_id}/address`);
  }


}
