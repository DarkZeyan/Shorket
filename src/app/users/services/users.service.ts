import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'John',
      last_name: 'Doe',
      email: 'user@example.com',
      password: '123',
      birth_date: '1990-01-01'
    },
    {
      id: 2,
      name: 'Jane',
      last_name: 'Doe',
      email: 'jane@example.com',
      password: '123',
      birth_date: '1992-01-01'
    },
    {
      id: 3,
      name: 'Zeyan',
      last_name: 'Bugarini',
      email: 'jorge.bugarini@example.com',
      password: '123',
      birth_date: '1990-01-01'
    }
  ];

  constructor() {

  }

  getUserById(id: number): User {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    return user;
  }

  getUserNameById(id: number): string {
    return this.getUserById(id).name;
  }
}
