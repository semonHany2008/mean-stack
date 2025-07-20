import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Cart } from '../../core/interfaces/cart.model';
import { ProductsService } from '../../core/services/products.service';
import { CartsService } from '../../core/services/carts.service';
import { Product } from '../../core/interfaces/interfaces/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-body',
  imports: [CardComponent, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  meals!: any[];
  cartProducts: Product[] = [];
  cartSubscription!: Subscription;
  selectedMeal: any = null;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private cartsService: CartsService
  ) {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      let meal = params.get('meal');
      if (!meal) {
        meal = params.get('drink');
      }
      if (!meal) {
        meal = params.get('snack');
      }

      this.productsService.getProducts().subscribe((data: any) => {
        let category = data.find((obj: any) => obj.category == meal);
        this.meals = category.products;
        console.log(meal, this.meals);
      });
    });
  }

  ngOnInit() {
    this.cartSubscription = this.cartsService.getCart().subscribe({
      next: (cart) => {
        console.log(cart);
        if (cart) {
          this.cartsService.getCartProducts().subscribe({
            next: (prods) => {
              console.log('cart prods:', prods);
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
    this.cartsService.updateCart(this.cartProducts);
    this.cartSubscription.unsubscribe();
  }

  showModal(meal: any) {
    console.log('Meal passed to modal:', meal);
    this.selectedMeal = meal;
  }
}
