import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Modal } from 'bootstrap';
import { Address } from '@shared/intefaces/address.interface';

@Component({
  selector: 'app-addresses-page',
  templateUrl: './addresses-page.component.html',
  styleUrl: './addresses-page.component.css'
})
export class AddressesPageComponent {

  addresses: Address[] = [

  ];

  modal!: Modal;

  addressForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addressForm = this.fb.group({
      // Define form controls for each address field


      full_name: ['', Validators.required],
      address_line1: ['', Validators.required],
      address_line2: [''],
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

  onSubmit() {
    if (this.addressForm.valid) {
      this.addresses.push(this.addressForm.value);
      this.addressForm.reset();
      this.modal.hide()
    }
  }
}
