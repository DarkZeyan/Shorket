import { Component, OnInit } from '@angular/core';
import { Promotion } from '@shared/intefaces/promotion.interface';
import { PromotionService } from '../../services/promotion.service';

@Component({
  selector: 'app-promotions-page',
  templateUrl: './promotions-page.component.html',
  styleUrl: './promotions-page.component.css'
})
export class PromotionsPageComponent implements OnInit {

  promotions: Promotion[] = [];

  constructor(private promotionService: PromotionService) { }
  ngOnInit() {
    this.promotions = this.promotionService.getPromotions();
  }



}
