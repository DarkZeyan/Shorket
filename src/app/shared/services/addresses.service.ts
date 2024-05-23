import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@shared/intefaces/address.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddressService {

  private API_URL = 'http://localhost:8000/addresses';

  private addresses: BehaviorSubject<Address[]> = new BehaviorSubject<Address[]>([]);
  private addressesLoaded: boolean = false;

  constructor(private httpClient: HttpClient) { }

  getAddressesByUser(user_id: number): Observable<Address[]> {

    if (!this.addressesLoaded) {
      return this.httpClient.get<Address[]>(`${this.API_URL}/user/${user_id}`).pipe(
        tap(addresses => {
          this.addresses.next(addresses);
        })
      );
    } else {
      return this.addresses.asObservable();
    }
  }

  getAddressById(id: number): Observable<Address> {
    return this.httpClient.get<Address>(`${this.API_URL}/${id}`);
  }


  deleteAddress(address_id: number): Observable<any> {
    return this.httpClient.delete(`${this.API_URL}/${address_id}`);
  }


}
