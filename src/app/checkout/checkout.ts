import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './../cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  cartService = inject(CartService);

  private router = inject(Router);

  placeOrder(): void {

    if (this.cartService.totalItems() === 0) {
      return;
    }

    alert('Order placed successfully!');

    this.cartService.clear();

    this.router.navigate(['/products']);
  }
}
