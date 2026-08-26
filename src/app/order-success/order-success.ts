import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-order-success',
  imports: [RouterLink],
  templateUrl: './order-success.html',
  styleUrl: './order-success.css'
})
export class OrderSuccess {

  private route = inject(ActivatedRoute);

  orderId =
    this.route.snapshot.paramMap.get('id');

}