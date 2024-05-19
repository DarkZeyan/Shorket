import { Injectable } from '@angular/core';
import { Address } from '@shared/intefaces/address.interface';

@Injectable({providedIn: 'root'})
export class AddressService {

  private addresses:Address[] = [];

  constructor() { }

  getAddressesByUser(userId: number) {

  }

}
