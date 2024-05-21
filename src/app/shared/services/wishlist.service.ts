import { Injectable } from '@angular/core';
import { WishList, WishListDetail } from '../interfaces/wishlist.interface';
import { Product } from '@products/interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class WishListService {

  WishList: WishList = {
    list_id: 0,
    user_id: 0,
  };

  WishLists: WishList[] = [];

  WishListDetails: WishListDetail[] = [
    {
      detail_id: 0,
      list_id: 0,
      product_id: 0
    }
  ];

  constructor() { }

  getWishList() {
    return this.WishList;
  }

  getWishListDetailsByWishListId(list_id: number) {
    return this.WishListDetails.filter(detail => detail.list_id === list_id);
  }

  getWishListByUserId(user_id: number) {
    return this.WishLists.filter(list => list.user_id === user_id);
  }

}
