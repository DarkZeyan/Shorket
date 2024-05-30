import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '@shared/intefaces/address.interface';;
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AddressService {

  private API_URL = 'https://f5bzmcmfqw.us-east-2.awsapprunner.com/addresses';

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

  getAddresses(): Observable<Address[]> {
    if (!this.addressesLoaded) {
      return this.httpClient.get<Address[]>(this.API_URL).pipe(
        tap(addresses => {
          this.addresses.next(addresses);
          this.addressesLoaded = true;
        })
      );
    } else {
      return this.addresses.asObservable();
    }
  }

  getAddressById(id: number): Observable<Address> {
    return this.getAddresses().pipe(
      map(addresses => {
        const address = addresses.find(address => address.address_id === id);
        if (!address) {
          throw new Error('Address not found');
        }
        return address;
      })
    );
  }

  getFirstAddressByUser(user_id: number): Observable<Address> {
    return this.httpClient.get<Address>(`${this.API_URL}/user/${user_id}/first`).pipe(
      tap(address => {
        return address
      })
    );
  }


  // crear dirección
  createAddress(address: Address, user_id: number): Observable<Address> {
    const body = {
      address: address,
      user_id: user_id
    }

    return this.httpClient.post<Address>(`${this.API_URL}/user/${user_id}`, body).pipe(
      tap(newAddress => {
        this.addresses.next([...this.addresses.value, newAddress]);
        // Create a new value in user_addresses table
      })
    );
  }

  // actualizar dirección
  updateAddress(address: Address): Observable<Address> {

    return this.httpClient.put<Address>(`${this.API_URL}/${address.address_id}`, address).pipe(
      tap(updatedAddress => {
        const addresses = this.addresses.value.map(a => {
          if (a.address_id === updatedAddress.address_id) {
            return updatedAddress;
          }
          return a;
        });
        this.addresses.next(addresses);
      })
    );
  }


  // eliminar la dirección por objeto y a partir de ahi se elimina por id
  deleteAddress(address_id: number): Observable<Address> {
    return this.httpClient.delete<Address>(`${this.API_URL}/${address_id}`).pipe(
      tap(() => {
        const addresses = this.addresses.value.filter(a => a.address_id !== address_id);
        this.addresses.next(addresses);
      })
    );
  }




}
