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

export interface ProductBody {
  name: string;
  brand: string;
  category_id: number;
  description?: string;
  price: number;
  stock: number;
  image?: string;
}
