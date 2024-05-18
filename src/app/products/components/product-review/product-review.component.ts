import { Component, Input } from '@angular/core';
import { Review } from '@products/interfaces/product-review.interface';
import { UsersService } from '../../../users/services/users.service';

@Component({
  selector: 'product-reviews',
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.css'
})
export class ProductReviewComponent {

  @Input()
  reviews: Review[] = [];

  constructor(private userService:UsersService) { }
  getStarsImagePath(rating: number): string {
    return `assets/${rating}-stars.png`;
  }
  getUserNameById(id: number): string {
    return this.userService.getUserNameById(id);
  }
}
