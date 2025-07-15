import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BodyComponent } from './components/body/body.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: ':meal', component: BodyComponent },
];
