import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Address } from '@shared/intefaces/address.interface';
import { Observable } from 'rxjs';
import { AddressService } from '../../services/addresses.service';
import { User } from '../../../users/interfaces/user.interface';
import { UsersService } from '../../../users/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresses-page',
  templateUrl: './addresses-page.component.html',
  styleUrl: './addresses-page.component.css'
})
export class AddressesPageComponent implements AfterViewInit, OnInit {

  addresses!: Observable<Address[]>;
  user!: User;
  modal!: Modal;

  addressForm: FormGroup;

  constructor(private fb: FormBuilder, private addressService: AddressService, private userService: UsersService, private router: Router) {
    this.addressForm = this.fb.group({
      // Define form controls for each address field


      name: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      postal_code: ['', Validators.required],
      phone_number: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    this.modal = new Modal(document.getElementById('addAddressModal')!);
  }

  ngOnInit() {
    if (!this.userService.getUserFromCookies()) {
      this.router.navigate(['/403']);
    }
    this.user = this.userService.getUserFromCookies()!;
    this.addresses = this.addressService.getAddressesByUser(this.user.user_id);
    console.log(this.addresses)
  }

  onSubmit() {
    if (this.addressForm.valid) {
      this.createAddress(this.addressForm.value, this.userService.getUserFromCookies()!.user_id);
      this.addressForm.reset();
      this.modal.hide()
    }
  }
  createAddress(address: Address, user_id: number) {

    return this.addressService.createAddress(address, user_id).subscribe(() => {
      this.addresses = this.addressService.getAddressesByUser(user_id);
    });
  }

}
