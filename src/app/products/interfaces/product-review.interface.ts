export interface Review {
  review_id: number;
  product_id: number;
  user_id: number;
  rating: number;
  title: string;
  commentary?: string;
}

export interface ProductReview {
  product_id: number;
  title: string;
  rating: number;
  commentary?: string;
  customer_name: string;
}
