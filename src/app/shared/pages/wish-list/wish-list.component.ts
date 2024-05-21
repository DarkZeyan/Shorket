import { Component, OnInit } from '@angular/core';
import { WishList, WishListDetail } from '@shared/intefaces/wishlist.interface';
import { ProductService } from '../../../products/services/product.service';
import { WishListService } from '../../services/wishlist.service';
import { Product } from '@products/interfaces/product.interface';
import { CartService } from '../cart-page/services/cart.service';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {

  WishList: WishList = {
    id: 1,
    user_id: 1,
  };
  WishListDetails: WishListDetail[] = [
    {
      id: 1,
      list_id: 1,
      product_id: 1
    },
    {
      id: 1,
      list_id: 1,
      product_id: 1
    },
    {
      id: 1,
      list_id: 1,
      product_id: 1
    }
  ];


  constructor(private productService: ProductService, private wishlistService: WishListService, private cartService: CartService) { }
  ngOnInit() { }


  getProductById(productId: number): Product {
    return this.productService.getProductById(productId);
  }

  getWishListDetailsByWishListId(list_id: number) {
    return this.wishlistService.getWishListDetailsByWishListId(list_id);
  }

  getWishListByUserId(user_id: number) {
    return this.wishlistService.getWishListByUserId(user_id);
  }



}
