import { Injectable } from '@angular/core';
import { WishList, WishListDetail } from '../interfaces/wishlist.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Product } from '@products/interfaces/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class WishListService {

  private wishList: WishList | null = null;
  private WishListDetails: BehaviorSubject<WishListDetail[]> = new BehaviorSubject<WishListDetail[]>([]);

  private isWishListLoaded: boolean = false;
  private isDetailsLoaded: boolean = false;




  private API_URL = 'http://localhost:8000/wish_lists';

  constructor(private httpClient: HttpClient) { }


  getWishListDetailsByListId(list_id: number): Observable<WishListDetail[]> {
    if (!this.isDetailsLoaded) {
      return this.httpClient.get<WishListDetail[]>(`${this.API_URL}/${list_id}/details`).pipe(
        tap(details => {
          this.WishListDetails.next(details);
        })
      );
    } else {
      return this.WishListDetails.asObservable();
    }
  }

  getWishListByUserId(user_id: number): Observable<WishList> {
    return this.httpClient.get<WishList>(`${this.API_URL}/user/${user_id}`);
  }



  createWishList(user_id: number): Observable<WishList> {
    const WishListBody = {
      user_id: user_id
    }
    return this.httpClient.post<WishList>(this.API_URL, WishListBody);
  }

  createWishListDetail(detail: WishListDetail): Observable<WishListDetail> {
    return this.httpClient.post<WishListDetail>(`${this.API_URL}/details`, detail);
  }

  deleteWishListDetail(detail_id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/details/${detail_id}`);
  }



}
