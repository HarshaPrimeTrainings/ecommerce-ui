import { Component, OnInit, inject } from '@angular/core';
import { ProductService } from './../product.service';
import { CartService } from './../cart.service';
import { Product } from './../models/product.model';

@Component({
  selector: 'app-products',
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products implements OnInit {

  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products: Product[] = [];
  currentPage = 1;


  ngOnInit(): void {

    this.loadProducts();

  }

  loadProducts(): void {

    this.productService
      .getProducts(this.currentPage)
      .subscribe({

        next: products => {
          this.products = products;
        },

        error: error => {
          console.error('Failed to load products', error);
        }

      });
  }

  nextPage(): void {

    this.currentPage++;

    this.loadProducts();
  }

  previousPage(): void {

    if (this.currentPage > 0) {

      this.currentPage--;

      this.loadProducts();
    }
  }
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}