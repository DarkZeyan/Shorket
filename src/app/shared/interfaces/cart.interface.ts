import { Product } from "@products/interfaces/product.interface";
export interface CartItem{
  product: Product;
  quantity: number;
}
