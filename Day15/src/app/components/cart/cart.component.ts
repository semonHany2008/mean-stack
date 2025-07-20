import { Component } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { RouterLink } from '@angular/router';
import { CartsService } from '../../core/services/carts.service';
import { Subscription } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, CardComponent, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartProducts: any[] = [];
  cartSubscription!: Subscription;
  selectedMeal: any = null;

  constructor(private cartsService: CartsService) {}

  ngOnInit() {
    this.cartSubscription = this.cartsService.getCart().subscribe({
      next: (cart) => {
        console.log(cart);
        if (cart) {
          this.cartsService.getCartProducts().subscribe({
            next: (prods) => {
              console.log(prods);
              this.cartProducts = prods;
            },
          });
        } else {
          this.cartsService.createCart().subscribe({
            next: (res) => {
              console.log(res);
              // this.cartsService
              //   .getCart()
              //   .subscribe((cart) => (this.cartProducts = cart.products));
            },
            error: (err) => console.error(err),
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    this.cartsService.updateCart(this.cartProducts);
  }

  showModal(meal: any) {
    this.selectedMeal = meal;
  }
}
