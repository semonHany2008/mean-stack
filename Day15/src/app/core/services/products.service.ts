import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    const rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
    return this.http.get('http://localhost:3000/products', {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteProduct(id: number): Observable<any> {
    const rawToken = localStorage.getItem('token');
    let token = rawToken?.startsWith('"') ? JSON.parse(rawToken) : rawToken;
    return this.http.delete(`http://localhost:3000/product/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    });
  }
}
