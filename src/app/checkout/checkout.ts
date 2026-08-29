import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from './../cart.service';
import { OrderService } from '../order.service';
import { CreateOrderRequest, Order } from '../models/order.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  cartService = inject(CartService);

  private router = inject(Router);
  private orderService = inject(OrderService);

  customer={
    csname:'',
    csemail:'',
    csaddress:''
  }

  isSubmitting  = false;
  errorMessage = '';
  placeOrder(): void {

    if (this.cartService.totalItems() === 0) {
      return;
    }
    if(!this.customer.csname||!this.customer.csemail||!this.customer.csaddress){
      this.errorMessage = ' name/Email/Adress missing';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.orderService.createOrder(this.buildOrderRequest()).subscribe({
      next:(order)=>{
        this.cartService.clear();
        this.isSubmitting = false;
        this.router.navigate(['/order-success',this.getOrderId(order)]);
      },
      error:()=>{
        this.isSubmitting = false;
        this.errorMessage = 'Unable Process Order. Please try again.';
        alert(this.errorMessage);
      }
    });

    this.cartService.clear();

    this.router.navigate(['/products']);
  }

  private buildOrderRequest():CreateOrderRequest{
    return{
      status:'CREATED',
      price:this.cartService.totalPrice(),
      customer:{...this.customer},
      orderItems:this.cartService.items().map(item=>({
        name:item.product.name,
        price:item.product.price,
        quantity:item.quantity
      }))
    };
  }

  private getOrderId(order:Order):number|string{
    return order.oid ?? order.orderId?? 'ORDER ID NOT AVAILABLE';
  }

}
