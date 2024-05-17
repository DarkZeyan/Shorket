import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrl: './catalog-page.component.css'
})
export class CatalogPageComponent implements OnInit{

  public category: string = '';
  public banner_img: string = '';
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


  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
      this.route.params.subscribe(params => {
        this.category = params['name'];
        this.banner_img = `assets/cat-banners/${this.category}.png`;
      });
  }

}
