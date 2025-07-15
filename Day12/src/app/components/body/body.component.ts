import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-body',
  imports: [CardComponent, CommonModule],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  meals: any[] = [];
  constructor(private route: ActivatedRoute, http: HttpClient) {
    this.route.paramMap.subscribe((params) => {
      let meal = params.get('meal');
      http
        .get(`https://forkify-api.herokuapp.com/api/search?q=${meal}`)
        .subscribe((data: any) => {
          console.log(data);
          this.meals = data.recipes;
        });
    });
  }
}
