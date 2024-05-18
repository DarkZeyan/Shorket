import { Injectable } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
@Injectable({providedIn: 'root'})
export class ProductService {
  private product!: Product;

  public products:Product[] = [
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

  ];

  constructor() { }

  setProduct(product: Product) {
    this.product = product;
  }

  getProduct(): Product {
    return this.product;
  }

  getProductById(id: number): Product {
    return this.products.find(product => product.id === id)!;
  }

  getProductsByCategory(category_id: number): Product[] {
    return this.products.filter(product => product.category_id === category_id);
  }
}
