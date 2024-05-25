import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductService } from '../../services/product.service';
import { ProductReview } from '@products/interfaces/product-review.interface';
import { Observable, Subscription, filter } from 'rxjs';
import { CartService } from '../../../shared/pages/cart-page/services/cart.service';
import { CartItem } from '@shared/intefaces/cart.interface';
import { Toast } from 'bootstrap';
import { WishListService } from '../../../shared/services/wishlist.service';
import { WishList, WishListDetail } from '@shared/intefaces/wishlist.interface';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, AfterViewInit {


  product!: Observable<Product | null>;
  suggestedProducts!: Observable<Product[]>;
  productReviews!: Observable<ProductReview[]>;
  quantity: number = 1;
  productRef!: Product;
  wishList!: WishList;
  @ViewChild('cartToast')
  cartToast!: Toast;

  @ViewChild('wishingToast')
  wishingToast!: Toast;

  constructor(private route: ActivatedRoute, private ProductService: ProductService, private router: Router,
    private wishListService: WishListService,
    private usersService: UsersService,
    private CartService: CartService) {

  }


  ngAfterViewInit() {
    this.cartToast = new Toast(document.getElementById('cartToast')!);
    this.wishingToast = new Toast(document.getElementById('wishingToast')!);
  }




  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const product_id = +params['product_id'];
      try {
        this.product = this.getProductById(product_id);

        if (this.product === null) throw new Error('Product not found');
        if (Number.isNaN(product_id)) throw new Error('Invalid product ID');

        this.product.subscribe(product => {
          this.productRef = product!;
          this.productReviews = this.ProductService.getReviewsByProductId(product!.product_id).pipe(
            filter(review => review !== null)
          );
          this.suggestedProducts = this.getSuggestedProducts(product!.product_id, product!.category_id);
        });

        const user = this.usersService.getUserFromCookies();
        if (user) {
          this.wishListService.getWishListByUserId(user.user_id).subscribe(wishList => {
            this.wishList = wishList;
          });
        }

      } catch (error) {
        this.router.navigate(['**']);
      }

    });
  }
  getProductById(product_id: number) {
    return this.ProductService.getProductById(product_id);
  }



  getSuggestedProducts(product_id: number, category_id: number): Observable<Product[]> {
    return this.ProductService.getSuggestedProductsByCategory(product_id);
  }

  addToCart(product: Product, quantity: number) {

    const cartItem: CartItem = {
      product: product,
      quantity: quantity
    };

    // Verificar si el producto ya esta en el carrito, si es asi aumentar solamente la cantidad


    const isOnCart = this.CartService.checkIfProductIsAlreadyOnCart({ product: product, quantity: quantity })
    if (isOnCart) {
      this.CartService.updateQuantity(cartItem, quantity)
      this.cartToast.show();
      setTimeout(() => {
        this.cartToast.hide();
      }, 4500);
      return;
    } else {
      this.CartService.addToCart(cartItem);
      this.cartToast.show();
      setTimeout(() => {
        this.cartToast.hide();
      }, 4500);
    }
  }


  addToWishList(wishList: WishList, product: Product) {
    this.wishListService.createWishListDetail(wishList.list_id, product.product_id).subscribe(() => {
      this.wishingToast.show();
      setTimeout(() => {
        this.wishingToast.hide();
      }, 4500);
    });
  }


}
