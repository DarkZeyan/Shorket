export interface Order {
  detail_id: number;
  status: string;
  total: number
  order_date: string;
  delivery_date?: string;
}

export interface OrderDetail {
  detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
}

export interface OrderUserAddress {
  user_id: number;
  address_id: number;
  order_id: number;
}
