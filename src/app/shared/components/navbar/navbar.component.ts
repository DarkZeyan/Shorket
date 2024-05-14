import { Component } from '@angular/core';

import { addIcons } from 'ionicons';
import { list as IonicList} from 'ionicons/icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  public codigoPostal:string = '31000';

  constructor() {

    addIcons({
      'list': IonicList,
    })

  }
}
