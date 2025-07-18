import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  imports: [CardComponent, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  meals!: any[];
  constructor(private route: ActivatedRoute, http: HttpClient) {
    this.route.paramMap.subscribe((params) => {
      console.log(params);
      let meal = params.get('meal');
      if (!meal) {
        meal = params.get('drink');
      }
      if (!meal) {
        meal = params.get('snack');
      }

      http
        .get('http://localhost:3000/products', {
          headers: new HttpHeaders({
            authorization: `bearer ${JSON.parse(
              localStorage.getItem('token')!
            )}`,
            'content-type': 'application/json',
          }),
        })
        .subscribe((data: any) => {
          this.meals = data.find((obj: any) => obj.category == meal).products;
          console.log(meal, this.meals);
        });
    });
  }
}
