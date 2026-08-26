import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from './models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

private http = inject(HttpClient);


  private apiUrl = 'http://localhost:8080/product/all';

  getProducts(pageNumber: number): Observable<Product[]> {
const params = new HttpParams()
      .set('pageNumber', pageNumber);
    return this.http.get<Product[]>(this.apiUrl,{ params });

  }
}
