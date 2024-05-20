import { Component, OnInit } from '@angular/core';
import { Order, OrderDetail } from '../../interfaces/order.interface';
@Component({
  selector: 'app-order-status-page',
  templateUrl: './order-status-page.component.html',
  styleUrl: './order-status-page.component.css'
})
export class OrderStatusPageComponent implements OnInit {

  order: Order = {
    id: 1,
    status: 'Delivered',
    total: 1000,
    order_date: '2021-01-01',
    delivery_date: '2021-01-05'
  };

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

  ngOnInit(): void {
  }


}
