import { Component, Input } from '@angular/core';
import { ProductReview, } from '@products/interfaces/product-review.interface';
import { UsersService } from '../../../users/services/users.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'product-reviews',
  templateUrl: './product-review.component.html',
  styleUrl: './product-review.component.css'
})
export class ProductReviewComponent {

  @Input()
  reviews!: Observable<ProductReview[]>;

  constructor(private userService: UsersService) { }
  getStarsImagePath(rating: number): string {
    return `assets/${rating}-stars.png`;
  }
}
