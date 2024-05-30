import { Component } from '@angular/core';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/interfaces/user.interface';
import { CartService } from '../../pages/cart-page/services/cart.service';
import { Router } from '@angular/router';
import { AddressService } from '../../services/addresses.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public codigoPostal: string = '31000';
  user: User | null = null;
  searchTerm: string = '';
  constructor(
    private UsersService: UsersService,
    private CartService: CartService,
    private AddressService: AddressService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.user = this.UsersService.getUserFromCookies();
    // Obtener el codigo psotal del usuario
    if (this.user) {
      this.AddressService.getFirstAddressByUser(this.user.user_id).subscribe((address) => {
        this.codigoPostal = address.postal_code;
      });
    }

  }

  logout(): void {
    this.UsersService.deleteUserSession();
    this.CartService.clearCart();
  }

  search() {

    this.router.navigate(['/search'], { queryParams: { search: this.searchTerm } });
  }
}
