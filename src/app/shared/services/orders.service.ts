import { Injectable } from '@angular/core';
import { Order, OrderDetail } from '@shared/intefaces/order.interface';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  orders: Order[] = [
    {
      id: 1,
      status: 'Delivered',
      total: 1000,
      order_date: '2021-01-01',
      delivery_date: '2021-01-05'
    },
    {
      id: 2,
      status: 'Delivered',
      total: 2000,
      order_date: '2021-02-01',
      delivery_date: '2021-02-05'
    },
    {
      id: 3,
      status: 'Delivered',
      total: 3000,
      order_date: '2021-03-01',
      delivery_date: '2021-03-05'
    }
  ];
  orderDetails: OrderDetail[] = [
    {
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 2,
      subtotal: 2000
    },
    {
      id: 2,
      order_id: 1,
      product_id: 2,
      quantity: 1,
      subtotal: 1000
    }
  ];



  constructor() { }

  getDetailsByOrderId(orderId: number): OrderDetail[] {
    return this.orderDetails.filter(detail => detail.order_id === orderId);
  }

  getOrderById(orderId: number): Order {
    const order = this.orders.find(order => order.id === orderId);
    if (order) {
      return order;
    } else {
      // Return a default Order object when no matching order is found
      return {
        id: 0,
        status: '',
        total: 0,
        order_date: '',
        delivery_date: ''
      };
    }
  }
}
