import { Injectable } from '@angular/core';
import { Promotion } from '@shared/intefaces/promotion.interface';

@Injectable({ providedIn: 'root' })
export class PromotionService {

  promotions: Promotion[] = [
    {
      promotion_id: 1,
      code: 'SHORTEK-10',
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      discount: 0.10
    },
    {
      promotion_id: 2,
      code: 'SHORTEK-20',
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      discount: 0.20
    },
    {
      promotion_id: 3,
      code: 'SHORTEK-30',
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
      discount: 0.30
    }
  ];

  constructor() { }

  getPromotions() {
    return this.promotions;
  }


}
