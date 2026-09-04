import { Routes } from '@angular/router';
import { autGaurd } from './auth.gaurd';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full'
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./products/products')
        .then(m => m.Products)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./cart/cart')
        .then(m => m.Cart)
  },

  {
    path: 'checkout',
    canActivate:[autGaurd],
    loadComponent: () =>
      import('./checkout/checkout')
        .then(m => m.Checkout)
  },
  {
  path: 'order-success/:id',
  canActivate:[autGaurd],
  loadComponent: () =>
    import('./order-success/order-success')
      .then(m => m.OrderSuccess)
}

];
