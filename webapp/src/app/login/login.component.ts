import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading = true;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log('LoginComponent initialized');

    // Llamar a la nueva ruta /auth/me para verificar si ya está autenticado
    this.authService.getCurrentUser().subscribe({
      next: user => {
        if (user) {
          console.log('Usuario autenticado desde /auth/me:', user);
          this.authService.setUser(user); // Actualiza el observable user$
          this.router.navigate(['/dashboard']);
        } else {
          this.isLoading = false;
        }
      },
      error: err => {
        console.log('No autenticado o error al verificar:', err);
        this.isLoading = false;
      }
    });
  }

  loginWithGoogle(): void {
    console.log('Iniciando login con Google...');
    this.authService.loginWithGoogle();
  }
}
