export interface Product {
  product_id: number;
  category_id: number;
  name: string;
  brand: string;
  description?: string;
  price: number;
  stock: number;
  image?: string;
}
