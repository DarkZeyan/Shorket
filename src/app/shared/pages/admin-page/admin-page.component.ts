import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AdminUser } from '../../../users/interfaces/user.interface';
import { UsersService } from '../../../users/services/users.service';
import { Router } from '@angular/router';
import { AdminUserService } from './services/admin.service';
import { ProductService } from '../../../products/services/product.service';
import { CategoryService } from '../../services/category.service';
import { Product, ProductBody } from '@products/interfaces/product.interface';
import { Category } from '@shared/intefaces/category.interface';
import { Modal } from 'bootstrap';
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.css'
})
export class AdminPageComponent implements OnInit, AfterViewInit {
  AdminUser: AdminUser | null = null;
  username: string = '';
  password: string = '';
  products!: Product[];
  categories!: Category[];
  page: number = 1;
  pageSize: number = 10;

  // Para categorias
  category_name: string = '';


  // Para productos
  name: string = '';
  brand: string = '';
  price: number = 0;
  category_id: number = 1;
  description: string = '';
  stock: number = 0;
  addProductModal!: Modal;
  addCategoryModal!: Modal;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router,
    private adminService: AdminUserService

  ) { }


  ngOnInit() {

    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

  }

  login(username: string, password: string) {
    this.adminService.getAdminUserByUsernameAndPassword(username, password).subscribe((user) => {
      this.AdminUser = user;
      if (user != null) {
        alert('Inicio de sesion exitoso');
        this.router.navigate(['/admin']);
      } else {
        alert('Inicio de sesion fallido');
      }
    });
  }

  deleteProduct(product: Product) {
    this.productService.deleteProduct(product).subscribe(() => {
      this.products = this.products.filter((p) => p.product_id !== product.product_id);
    });
  }

  ngAfterViewInit(): void {

    this.addProductModal = new Modal(document.getElementById('addProductModal')!);
    this.addCategoryModal = new Modal(document.getElementById('addCategoryModal')!);
  }


  addProduct(name: string, brand: string, price: number, category_id: number, description: string, stock: number) {

    const newProduct: ProductBody = {
      name: name,
      brand: brand,
      price: price,
      category_id: category_id,
      description: description,
      stock: stock
    };
    this.productService.createProduct(newProduct).subscribe((product) => {
      this.products.push(product);
    });
    this.addProductModal.hide();
  }

  addCategory(category_name: string) {
    this.categoryService.addCategory(category_name).subscribe((category) => {
      this.categories.push(category);
    });
    this.addCategoryModal.hide();
  }

  deleteCategory(category: Category) {
    this.categoryService.deleteCategory(category.category_id).subscribe(() => {
      this.categories = this.categories.filter((c) => c.category_id !== category.category_id);
    });
  }

}
