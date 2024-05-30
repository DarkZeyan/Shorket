import { Injectable } from '@angular/core';
import { AdminUser } from '../../../../users/interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminUserService {

  API_URL = 'https://f5bzmcmfqw.us-east-2.awsapprunner.com/users/admin';
  constructor(private httpClient: HttpClient) {



  }


  getAdminUserByUsernameAndPassword(username: string, password: string): Observable<AdminUser> {
    return this.httpClient.get<AdminUser>(`${this.API_URL}/${username}/${password}`);
  }


}
