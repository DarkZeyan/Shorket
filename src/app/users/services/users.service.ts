import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private API_URL = 'http://localhost:8000/users';
  private isUserLoaded: boolean = false;
  private user: User | null = null;

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {

  }


  getUserByEmailPassword(email: string, password: string): Observable<User | null> {

    if (this.isUserLoaded) {
      return of(this.user);
    }
    console.log('Getting user from API')
    return this.httpClient.get<User>(`${this.API_URL}/user`, {
      params: {
        email: email,
        password: password
      }
    }).pipe(
      tap(user => {
        if (user) {
          this.isUserLoaded = true;
          this.setUser(user);
        } else {
          this.isUserLoaded = false;
        }
      })
    );
  }

  // Crear un nuevo usuario
  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.API_URL}/`, user);
  }

  // Obtener el usuario de las cookies del navegador

  getUserFromCookies(): User | null {
    const user = this.cookieService.get('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  // Guardar el usuario en las cookies del navegador

  saveUserInCookies(user: User): void {
    this.cookieService.set('user', JSON.stringify(user));
  }

  setUser(user: User): void {
    this.user = user;

    this.saveUserInCookies(user);
  }

  //Eliminar la sesion del usuario
  deleteUserSession(): void {
    this.user = null;
    this.deleteUserFromCookies();
  }

  getUserNameById(user_id: number): string {
    // Buscar a partir de la API el nombre del usuario con la ID

    const user = this.httpClient.get<User>(`${this.API_URL}/review/${user_id}`);
    let UserName = '';
    user.subscribe(user => {
      if (user) {
        return user.name;
      }
      return 'Unknown User'
    });
    return UserName;

  }

  // Borrar el usuario de las cookies del navegador
  deleteUserFromCookies(): void {
    this.cookieService.delete('user');

  }





}
