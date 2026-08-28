import { Component, inject } from '@angular/core';
import { CartService } from './../cart.service';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';
import { CreateOrderRequest } from '../models/order.model';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {

  cartService = inject(CartService);
   
  private orderService = inject(OrderService);

  private router = inject(Router);

  placeOrder(): void {

    if (this.cartService.totalItems() === 0) {
      return;
    }

    const request: CreateOrderRequest = {

      items: this.cartService.items().map(item => ({
        productId: item.product.pid,
        quantity: item.quantity
      }))

    };
 this.orderService
      .createOrder(request)
      .subscribe({

        next: order => {

          console.log('Order created:', order);

          this.cartService.clear();

          this.router.navigate([
            '/order-success',
            order.id
          ]);

        },

        error: error => {

          console.error(
            'Failed to place order',
            error
          );

          alert('Unable to place order');

        }

      });
  }
  increase(productId: number): void {
    this.cartService.increase(productId);
  }

  decrease(productId: number): void {
    this.cartService.decrease(productId);
  }

  remove(productId: number): void {
    this.cartService.remove(productId);
  }
}