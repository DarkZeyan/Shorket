import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Order, OrderDetail } from '../../interfaces/order.interface';
import { OrdersService } from '../../services/orders.service';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../../products/services/product.service';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { Address } from '@shared/intefaces/address.interface';
import { AddressService } from '../../services/addresses.service';
@Component({
  selector: 'app-order-status-page',
  templateUrl: './order-status-page.component.html',
  styleUrl: './order-status-page.component.css'
})
export class OrderStatusPageComponent implements OnInit {

  order: Observable<Order> = new Observable<Order>();
  globalOrderID: number = 0;
  statusLabel: string = '';
  orderAddress: Address | null = null;
  orderDetails: Observable<OrderDetail[]> = new Observable<OrderDetail[]>();
  productsFromDetails: Product[] = [];
  mostExpensiveProduct: Product | null = null;
  constructor(private route: ActivatedRoute, private addressService: AddressService, private router: Router, private orderService: OrdersService, private productService: ProductService) { }

  ngOnInit(): void {
    // Extract order ID from the URL
    try {


      this.route.queryParams.subscribe(params => {

        const orderId = +params['order_id'];
        this.globalOrderID = orderId;
        this.getOrderByOrderId(orderId).subscribe(order => {
          this.order = of(order);
          this.statusLabel = order.status;
        });

        this.getOrderDetailsByOrderId(orderId).subscribe(details => {
          this.orderDetails = of(details);
          // Use forkJoin to fetch all products in parallel
          this.orderDetails.pipe(
            switchMap(details => {
              return forkJoin(details.map(detail => this.getProductByOrderDetail(detail)));
            })
          ).subscribe(products => {
            // Filter out null values from the products array
            this.productsFromDetails = products.filter(product => product !== null) as Product[];
            this.mostExpensiveProduct = products.filter(product => product !== null).reduce((previous, current) => {
              return previous!.price > current!.price ? previous : current;
            });
          });
        });

        this.getAddressByOrderId(orderId);


      });
    } catch (error) {

    }
  }

  getOrderStatusLabelTranslated() {
    switch (this.statusLabel) {
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

  getOrderDetailsByOrderId(orderId: number): Observable<OrderDetail[]> {
    return this.orderService.getOrderDetailsByOrderId(orderId);
  }

  getOrderByOrderId(orderId: number): Observable<Order> {
    return this.orderService.getOrderByOrderId(orderId);
  }


  getProductById(productId: number): Observable<Product | null> {
    return this.productService.getProductById(productId);
  }

  getProductByOrderDetail(orderDetail: OrderDetail): Observable<Product | null> {
    return of(orderDetail).pipe(
      switchMap(detail => this.getProductById(detail.product_id))
    );
  }


  getAddressByOrderId(orderId: number): void {
    this.orderService.getOrderAddressIDByOrderId(orderId).subscribe(odAddress => {
      const address_id = odAddress.address_id;
      const orderAddress = this.addressService.getAddressById(address_id);
      orderAddress.subscribe(address => {
        this.orderAddress = address;
      });
    });
  }


}
