import { Injectable } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { Review } from '@products/interfaces/product-review.interface';
@Injectable({ providedIn: 'root' })
export class ProductService {

  private Reviews: Review[] = [
    { id: 1, product_id: 1, user_id: 1, rating: 5, title: 'Great product', commentary: 'I love this product!' },
    { id: 2, product_id: 1, user_id: 2, rating: 4, title: 'Good product', commentary: 'I like this product!' },
    { id: 3, product_id: 1, user_id: 3, rating: 3, title: 'Ok product', commentary: 'This product is ok!' },
    { id: 4, product_id: 2, user_id: 1, rating: 5, title: 'Great product', commentary: 'I love this product!' },
    { id: 5, product_id: 2, user_id: 2, rating: 4, title: 'Good product', commentary: 'I like this product!' },
    { id: 6, product_id: 2, user_id: 3, rating: 3, title: 'Ok product', commentary: 'This product is ok!' },
  ];


  private product!: Product;

  getReviewsByProductId(product_id: number): Review[] {
    return this.Reviews.filter(review => review.product_id === product_id);
  }

  private products: Product[] = [
    {
      id: 1,
      category_id: 1,
      name: 'Macbook Pro',
      brand: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ex nec luctus ultrices, nunc risus ultricies nunc, nec malesuada mi nisl at justo.',
      price: 2000,
      stock: 10,
      image: 'assets/product-imgs/image-not-available.png'
    },
    {
      id: 2,
      category_id: 1,
      name: 'Macbook Air',
      brand: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ex nec luctus ultrices, nunc risus ultricies nunc, nec malesuada mi nisl at justo.',
      price: 1500,
      stock: 10,
      image: 'assets/product-imgs/image-not-available.png'
    },
    {
      id: 3,
      category_id: 1,
      name: 'Macbook Pro 16"',
      brand: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ex nec luctus ultrices, nunc risus ultricies nunc, nec malesuada mi nisl at justo.',
      price: 2500,
      stock: 10,
      image: 'assets/product-imgs/image-not-available.png'
    },
    {
      id: 4,
      category_id: 1,
      name: 'iMac',
      brand: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ex nec luctus ultrices, nunc risus ultricies nunc, nec malesuada mi nisl at justo.',
      price: 3000,
      stock: 10,
      image: 'assets/product-imgs/image-not-available.png'
    },
    {
      id: 5,
      category_id: 1,
      name: 'Mac Mini',
      brand: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ex nec luctus ultrices, nunc risus ultricies nunc, nec malesuada mi nisl at justo.',
      price: 1000,
      stock: 10,
      image: 'assets/product-imgs/image-not-available.png'
    },
    {
      id: 6,
      category_id: 2,
      name: 'iPhone 12',
      brand: 'Apple',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, ex nec luctus ultrices, nunc risus ultricies nunc, nec malesuada mi nisl at justo.',
      price: 1000,
      stock: 10,
      image: 'assets/product-imgs/image-not-available.png'
    }

  ];

  constructor() { }

  getProduct(): Product {
    return this.product;
  }

  getProductById(id: number): Product {
    return this.products.find(product => product.product_id === id)!;
  }

  getProductsByCategory(category_id: number): Product[] {
    return this.products.filter(product => product.category_id === category_id);
  }

  getRandomSuggestedProducts(): Product[] {
    // Get two random products
    if (this.products.length > 2) {
      const suggestedProducts: Product[] = [];
      let randomIndex1 = Math.floor(Math.random() * this.products.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * this.products.length);
      } while (randomIndex1 === randomIndex2);
      suggestedProducts.push(this.products[randomIndex1]);
      suggestedProducts.push(this.products[randomIndex2]);
      return suggestedProducts;
    }
    return [];
  }

  getSuggestedProductsByCategory(product_id: number, category_id: number): Product[] {

    // Get two random products from the same category and is not current product

    const suggestedProducts: Product[] = [];
    let productsByCategory = this.getProductsByCategory(category_id).filter(product => product.product_id !== product_id);
    if (productsByCategory.length > 0) {
      let randomIndex1 = Math.floor(Math.random() * productsByCategory.length);
      let randomIndex2;
      do {
        randomIndex2 = Math.floor(Math.random() * productsByCategory.length);
      } while (randomIndex1 === randomIndex2);
      suggestedProducts.push(productsByCategory[randomIndex1]);
      suggestedProducts.push(productsByCategory[randomIndex2]);
      return suggestedProducts;
    }
    return [];
  }

}
