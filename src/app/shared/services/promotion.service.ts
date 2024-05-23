import { Injectable } from '@angular/core';
import { Promotion } from '@shared/intefaces/promotion.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PromotionService {

  private promotions: BehaviorSubject<Promotion[]> = new BehaviorSubject<Promotion[]>([]);
  private promotionsLoaded: boolean = false;
  private API_URL = 'http://localhost:8000/promotions';

  constructor(private httpClient: HttpClient) { }


  getPromotions(): Observable<Promotion[]> {
    if (!this.promotionsLoaded) {
      return this.httpClient.get<Promotion[]>(this.API_URL).pipe(
        tap(promotions => {
          this.promotions.next(promotions);
          this.promotionsLoaded = true;
        })
      );
    } else {
      return this.promotions.asObservable();
    }
  }

  createPromotion(promotion: Promotion): Observable<Promotion> {
    return this.httpClient.post<Promotion>(this.API_URL, promotion).pipe(
      tap(promotion => {
        this.promotions.next([...this.promotions.getValue(), promotion]);
      })
    );
  }

  deletePromotion(promotion_id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${promotion_id}`).pipe(
      tap(() => {
        const promotions = this.promotions.getValue().filter(promotion => promotion.promotion_id !== promotion_id);
        this.promotions.next(promotions);
      })
    );
  }

  updatePromotion(promotion: Promotion): Observable<Promotion> {
    return this.httpClient.put<Promotion>(`${this.API_URL}/${promotion.promotion_id}`, promotion).pipe(
      tap(updatedPromotion => {
        const promotions = this.promotions.getValue().map(promotion => {
          if (promotion.promotion_id === updatedPromotion.promotion_id) {
            return updatedPromotion;
          }
          return promotion;
        });
        this.promotions.next(promotions);
      })
    );
  }

}
