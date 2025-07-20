import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  signIn(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/signIn', userData);
  }

  accessVerification(token: any) {
    return token ? 'true' : 'false';
  }

  signUp(userData: any): Observable<any> {
    return this.http.post('http://localhost:3000/signUp', userData);
  }
}
