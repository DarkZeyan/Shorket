import { Component, OnDestroy, OnInit } from '@angular/core';
import { Promotion } from '@shared/intefaces/promotion.interface';
import { PromotionService } from '../../services/promotion.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-promotions-page',
  templateUrl: './promotions-page.component.html',
  styleUrl: './promotions-page.component.css'
})
export class PromotionsPageComponent implements OnInit, OnDestroy {

  promotions: Observable<Promotion[]> = new Observable<Promotion[]>();
  promotionsLength: number = 0;
  promotionsSubscription: Subscription = new Subscription;
  constructor(private promotionService: PromotionService) { }
  ngOnInit() {
    this.promotions = this.getPromotions();
    this.promotionsSubscription = this.promotions.subscribe(promotions => {
      this.promotionsLength = promotions.length;
    });

  }

  getPromotions(): Observable<Promotion[]> {
    return this.promotionService.getPromotions();
  }

  ngOnDestroy(): void {
    this.promotionsSubscription.unsubscribe();
  }

}
