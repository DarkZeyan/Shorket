import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order, OrderDetail } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../../products/services/product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-order-status-page',
  templateUrl: './order-status-page.component.html',
  styleUrl: './order-status-page.component.css'
})
export class OrderStatusPageComponent implements OnInit {

  order!: Order;
  orderDetails: OrderDetail[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private orderService: OrdersService, private productService: ProductService) { }

  ngOnInit(): void {
    // Extract order ID from the URL
    this.route.params.subscribe(params => {

      const orderId = +params['id'];
      this.getOrderByOrderId(orderId);
      this.getOrderDetailsByOrderId(orderId);

    });
  }

  getOrderStatusLabelTranslated() {
    switch (this.order.status) {
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

  getOrderDetailsByOrderId(orderId: number): void {
    this.orderDetails = this.orderService.getDetailsByOrderId(orderId);
  }

  getOrderByOrderId(orderId: number): void {
    this.order = this.orderService.getOrderById(orderId);
  }

  getProductById(productId: number): Observable<Product> {
    return this.productService.getProductById(productId);
  }

  getProductByOrderDetail(orderDetail: OrderDetail): Observable<Product> {
    return this.getProductById(orderDetail.product_id);
  }

  getMostExpensiveProductByOrderDetail(order_id: number): Observable<Product> {
    const detail = this.orderService.getDetailWithMostExpensiveProduct(order_id);
    return this.getProductById(detail.product_id);
  }


}
