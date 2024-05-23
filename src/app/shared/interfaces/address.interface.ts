export interface Address {
  name: string;
  address_id: number;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  phone_number: string;
}
