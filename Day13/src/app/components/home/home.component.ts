import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Sub1Component } from '../sub-1/sub-1.component';
import { Sub2Component } from '../sub-2/sub-2.component';
import { Sub3Component } from '../sub-3/sub-3.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HomeHeaderComponent } from './home-header/home-header.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, RouterOutlet, HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
