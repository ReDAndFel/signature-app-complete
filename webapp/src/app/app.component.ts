import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Signature App';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // El AuthService maneja la verificación inicial del token en su constructor
  }
}
