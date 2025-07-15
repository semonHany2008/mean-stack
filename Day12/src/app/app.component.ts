import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';
import { NavbarComponent } from './components/header/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'day12';
}
