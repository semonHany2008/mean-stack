import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/product/${id}`, {
      headers: new HttpHeaders({
        authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        'content-type': 'application/json',
      }),
    });
  }
}
