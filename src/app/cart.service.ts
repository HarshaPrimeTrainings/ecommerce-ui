import { Injectable, signal, computed } from '@angular/core';
import { Product } from './models/product.model';
import { CartItem } from './models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItems = signal<CartItem[]>([]);

  items = this.cartItems.asReadonly();

  totalItems = computed(() =>
    this.cartItems()
      .reduce((total, item) => total + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems()
      .reduce(
        (total, item) =>
          total + item.product.price * item.quantity,
        0
      )
  );

  addToCart(product: Product): void {

    const items = this.cartItems();

    const existingItem = items.find(
      item => item.product.id === product.id
    );

    if (existingItem) {

      this.cartItems.set(
        items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

    } else {

      this.cartItems.set([
        ...items,
        {
          product,
          quantity: 1
        }
      ]);

    }
  }

  increase(productId: number): void {

    this.cartItems.update(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  decrease(productId: number): void {

    this.cartItems.update(items =>
      items
        .map(item =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  remove(productId: number): void {

    this.cartItems.update(items =>
      items.filter(item => item.product.id !== productId)
    );
  }

  clear(): void {
    this.cartItems.set([]);
  }
}
