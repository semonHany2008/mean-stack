import { Component, Input, Output } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() meal: any;

  constructor(private productsService: ProductsService) {}
  handleDeleteProduct() {
    this.productsService.deleteProduct(this.meal._id).subscribe({
      next: () => {
        console.log('product deleted successfully!');
        document.getElementById(this.meal._id)?.remove();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('deleting product completed!');
      },
    });
  }

  handleAddToCart() {}
}
