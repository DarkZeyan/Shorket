export interface Review{
  id: number;
  product_id: number;
  user_id: number;
  rating: number;
  title: string;
  commentary?: string;
}
