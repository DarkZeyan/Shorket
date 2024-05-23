import { Component, OnInit } from '@angular/core';
import { WishList, WishListDetail } from '@shared/intefaces/wishlist.interface';
import { ProductService } from '../../../products/services/product.service';
import { WishListService } from '../../services/wishlist.service';
import { Product } from '@products/interfaces/product.interface';
import { CartService } from '../cart-page/services/cart.service';
import { Observable, of } from 'rxjs';
import { UsersService } from '../../../users/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {

  WishList: WishList | null = null;

  wishListDetails: Observable<WishListDetail[]> = new Observable<WishListDetail[]>();
  wishListLength: number = 0;


  constructor(private productService: ProductService, private wishlistService: WishListService,
    private router: Router,
    private cartService: CartService, private usersService: UsersService) { }
  ngOnInit() {

    const user = this.usersService.getUserFromCookies();

    if (user === null) {
      this.router.navigate(['/403']);
      return;
    } else {
      this.getWishListByUserId(user.user_id).subscribe(wishList => {
        this.WishList = wishList;
        if (wishList !== null) {
          this.getWishListDetailsByWishListId(wishList.list_id).subscribe(
            wishListDetails => {
              this.wishListDetails = of(wishListDetails);
              this.wishListLength = wishListDetails.length;
            }
          )
        } else {
          this.wishlistService.createWishList(user.user_id).subscribe(wishList => {
            this.WishList = wishList;
          });
        }
      });
    }

  }


  getProductById(productId: number): Observable<Product | null> {
    return this.productService.getProductById(productId);
  }

  getWishListDetailsByWishListId(list_id: number) {
    return this.wishlistService.getWishListDetailsByListId(list_id);
  }

  getWishListByUserId(user_id: number) {
    return this.wishlistService.getWishListByUserId(user_id);
  }



}
