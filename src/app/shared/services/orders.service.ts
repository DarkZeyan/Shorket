import { Injectable } from '@angular/core';
import { Order, OrderDetail } from '@shared/intefaces/order.interface';

@Injectable({ providedIn: 'root' })
export class OrdersService {

  orders: Order[] = [
    {
      id: 1,
      status: 'Completed',
      total: 1000,
      order_date: '2021-01-01',
      delivery_date: '2021-01-05'
    },
    {
      id: 2,
      status: 'Pending',
      total: 2000,
      order_date: '2021-02-01',
      delivery_date: '2021-02-05'
    },
    {
      id: 3,
      status: 'Sent',
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
    },
    {
      id: 3,
      order_id: 2,
      product_id: 5,
      quantity: 3,
      subtotal: 3000
    },
    {
      id: 4,
      order_id: 2,
      product_id: 4,
      quantity: 1,
      subtotal: 1000
    },
    {
      id: 5,
      order_id: 3,
      product_id: 6,
      quantity: 1,
      subtotal: 1000
    },
    {
      id: 6,
      order_id: 3,
      product_id: 3,
      quantity: 1,
      subtotal: 1000
    }
  ];



  constructor() { }

  getDetailsByOrderId(orderId: number): OrderDetail[] {
    return this.orderDetails.filter(detail => detail.order_id === orderId);
  }

  addNewOrder(order: Order): void {
    this.orders.push(order);
  }

  setDetailToOrder(orderId: number, details: OrderDetail[]): void {
    this.orderDetails = this.orderDetails.filter(detail => detail.order_id !== orderId);
    this.orderDetails.push(...details);
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

  getOrders(): Order[] {
    return this.orders
  }

  // Obtener el producto mas caro de un pedido
  getDetailWithMostExpensiveProduct(orderId: number): OrderDetail {
    const details = this.getDetailsByOrderId(orderId);
    // Considerar solamente los detalles que tengan subtotal mayor a 0
    details.filter(detail => detail.subtotal > 0);
    // Retornar el producto mas caro
    return details.reduce((previous, current) => {
      return previous.subtotal > current.subtotal ? previous : current;
    });
  }
}
