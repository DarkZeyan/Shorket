export interface WishList {
  id: number;
  user_id: number;
}

export interface WishListDetail {
  id: number;
  wishlist_id: number;
  product_id: number;
  quantity: number;
}
