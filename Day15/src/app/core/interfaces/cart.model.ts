export interface Cart {
  userId: any;
  products: [
    {
      productId: any;
      quantity: number;
    }
  ];
  totalPrice: number;
}
