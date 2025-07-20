import { CartsService } from './../../core/services/carts.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Cart } from '../../core/interfaces/cart.model';
import { Product } from '../../core/interfaces/interfaces/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  standalone: true,
})
export class CardComponent {
  @Input() meal!: any;
  @Input() cartProducts!: any[];
  @Input() page!: string;
  @Output() showDetailsModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() totalPriceEmitter: EventEmitter<number> =
    new EventEmitter<number>();
  @Input() totalPrice!: number;

  constructor(
    private productsService: ProductsService,
    private cartsService: CartsService
  ) {}
  handleDeleteProduct() {
    this.productsService.deleteProduct(this.meal._id).subscribe({
      next: () => {
        console.log('product deleted successfully!');
        document.getElementById(this.meal._id)?.remove();
      },
      error: (err) => {
        console.error(err);
        console.log('message from backend:', err.error);
      },
      complete: () => {
        console.log('deleting product completed!');
      },
    });
  }

  handleAddToCart() {
    let existedProduct = this.cartProducts.find(
      (obj) => obj._id == this.meal._id
    );
    if (existedProduct) {
      let prodIndex = this.cartProducts.findIndex(
        (obj) => obj._id === this.meal._id
      );

      this.cartProducts[prodIndex].quantity++;
    } else {
      this.meal.quantity = 1;
      this.cartProducts.push(this.meal);
    }
    console.log(this.cartProducts);

    this.totalPrice += +this.meal.price;
    this.totalPriceEmitter.emit(this.totalPrice);
    this.cartsService
      .updateCart({ products: this.cartProducts, totalPrice: this.totalPrice })
      .subscribe({
        next: (res) => console.log('update cart:', res),
        error: (error) => {
          console.error('update cart:', error);
          console.log('message from backend:', error.error);
        },
      });
  }

  handleDeleteFromCart() {
    let prodIndex = this.cartProducts.findIndex(
      (obj) => obj._id == this.meal._id
    );

    if (this.cartProducts[prodIndex].quantity > 1) {
      this.cartProducts[prodIndex].quantity--;
    } else {
      this.cartProducts.splice(prodIndex, 1);
      document.getElementById(this.meal._id)?.remove();
    }

    this.totalPrice += -this.meal.price;
    this.totalPriceEmitter.emit(this.totalPrice);

    let formatted = this.cartProducts?.map((prod: any) => ({
      productId: prod._id,
      quantity: prod.quantity,
    }));

    this.cartsService
      .updateCart({ products: formatted, totalPrice: this.totalPrice })
      .subscribe({
        next: (res) => console.log('update cart:', res),
        error: (error) => {
          console.error('update cart:', error);
          console.log('message from backend:', error.error);
        },
      });
  }

  showDetails() {
    this.showDetailsModal.emit(this.meal);
  }
}
