import { Injectable } from '@angular/core';
import { AdminUser } from '../../../../users/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminUserService {

  API_URL = 'http://localhost:8000/users/admin';
  constructor(private httpClient: HttpClient) {



  }


  getAdminUserByUsernameAndPassword(username: string, password: string): Observable<AdminUser> {
    console.log(username, password)
    return this.httpClient.get<AdminUser>(`${this.API_URL}/${username}/${password}`);
  }


}
