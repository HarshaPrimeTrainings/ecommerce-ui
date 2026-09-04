import { Component, inject, signal } from '@angular/core';
import {
  RouterLink,
  RouterOutlet
} from '@angular/router';

import { CartService } from './cart.service';
import { KeycloakService } from './keycloak';

@Component({
  selector: 'app-root',

  imports: [
    RouterLink,
    RouterOutlet
  ],

  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  protected readonly title = signal('ecommerce-ui');

  cartService = inject(CartService);
keycloakservice = inject(KeycloakService);

}