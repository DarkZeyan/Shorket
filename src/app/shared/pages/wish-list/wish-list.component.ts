import { Component, OnInit } from '@angular/core';
import { WishList, WishListDetail } from '@shared/intefaces/wishlist.interface';
import { ProductService } from '../../../products/services/product.service';
import { WishListService } from '../../services/wishlist.service';
import { Product } from '@products/interfaces/product.interface';
import { CartService } from '../cart-page/services/cart.service';
import { EMPTY, Observable, forkJoin, map, of, switchMap, tap } from 'rxjs';
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
  productsWithDetails: { product: (Product | null), detail: WishListDetail }[] = [];

  constructor(private productService: ProductService, private wishlistService: WishListService,
    private router: Router,
    private cartService: CartService, private usersService: UsersService) { }
  ngOnInit() {
    const user = this.usersService.getUserFromCookies();

    if (user === null) {
      this.router.navigate(['/403']);
      return;
    } else {
      this.getWishListByUserId(user.user_id).pipe(
        switchMap(wishList => {
          this.WishList = wishList;
          if (wishList !== null) {
            return this.getWishListDetailsByWishListId(wishList.list_id).pipe(
              switchMap(wishListDetails => {
                this.wishListLength = wishListDetails.length;
                console.log(wishListDetails)
                // Use forkJoin to fetch all products in parallel
                return forkJoin(wishListDetails.map(detail => this.getProductById(detail.product_id).pipe(
                  map(product => ({ product, detail })) // Map each product to an object that contains the product and its detail
                )));
              })
            );
          } else {
            return this.wishlistService.createWishList(user.user_id).pipe(
              tap(createdWishList => {
                this.WishList = createdWishList;
              }),
              switchMap(() => EMPTY)
            );
          }
        })
      ).subscribe(productsWithDetails => {
        // 'productsWithDetails' is an array of objects, where each object contains a product and its detail
        this.productsWithDetails = productsWithDetails;
        console.log(productsWithDetails)
      });
    }
  }

  addToCart(product: Product, detail_id: number) {

    this.cartService.addToCart({ product: product, quantity: 1 });

    this.router.navigate(['/cart']).then(() => {
      window.location.reload();
    });
    this.deleteDetailFromWishList(detail_id)
  }



  //DeleteDetailFromWishList
  deleteDetailFromWishList(detail_id: number) {

    this.wishlistService.deleteWishListDetail(detail_id).subscribe(() => {
      this.wishListDetails = this.wishListDetails.pipe(
        switchMap(details => {
          return this.getWishListDetailsByWishListId(this.WishList!.list_id);
        })
      );
    });
    this.router.navigate(['/wish-list']).then(() => {
      window.location.reload();
    });
  }

  getProduct(productId: number) {
    return this.productsWithDetails.find(productDetail => productDetail!.product?.product_id === productId);
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
