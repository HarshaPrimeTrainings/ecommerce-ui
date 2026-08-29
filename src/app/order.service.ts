import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CreateOrderRequest,
  Order
} from './models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8082/order/save';

  createOrder(
    request: CreateOrderRequest
  ): Observable<Order> {

    return this.http.post<Order>(
      this.apiUrl,
      request
    );
  }
}