import { Component } from '@angular/core';
import { Order } from '@shared/intefaces/order.interface';

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrl: './order-history-page.component.css'
})
export class OrderHistoryPageComponent {


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

  constructor() { }

  ngOnInit(): void {
  }


}
