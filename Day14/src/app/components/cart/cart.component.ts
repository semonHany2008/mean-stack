import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [BodyComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {}
