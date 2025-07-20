import { Product } from './../interfaces/interfaces/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    const rawToken = localStorage.getItem('token');
    const token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get('http://localhost:3000/cart', { headers });
  }

  updateCart(newVersion: any): Observable<any> {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    let formatted = newVersion.products?.map((prod: any) => ({
      productId: prod._id,
      quantity: prod.quantity,
    }));
    newVersion.Products = formatted;
    return this.http.put('http://localhost:3000/cart', newVersion, { headers });
  }

  createCart(): Observable<any> {
    return this.http.post('http://localhost:3000/cart', [], {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')!}`,
      }),
    });
  }

  addProductToCart(id: any): Observable<any> {
    return this.http.post(`http://localhost:3000/cart/${id}`, [], {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')!}`,
      }),
    });
  }

  getCartProducts(): Observable<any> {
    let rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;

    return this.http.get(`http://localhost:3000/cart/products`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    });
  }
}

//note: take care of case-sensetivity and don't use json.stringify or json.parse with the token
