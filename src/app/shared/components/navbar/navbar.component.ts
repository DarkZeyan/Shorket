import { Component } from '@angular/core';
import { UsersService } from '../../../users/services/users.service';
import { User } from '../../../users/interfaces/user.interface';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public codigoPostal: string = '31000';
  user: User | null = null;
  constructor(
    private UsersService: UsersService
  ) {

  }

  ngOnInit(): void {
    this.user = this.UsersService.getUserFromCookies();
  }

  logout(): void {
    this.UsersService.deleteUserSession();
  }

}
