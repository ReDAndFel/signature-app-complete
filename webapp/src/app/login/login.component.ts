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
    
    // Verificar inmediatamente si ya está autenticado
    if (this.authService.isAuthenticated()) {
      console.log('Usuario ya autenticado, redirigiendo...');
      this.router.navigate(['/dashboard']);
      return;
    }
    
    // Verificar si hay un token nuevo en cookies (especialmente después del redirect de Google)
    this.authService.checkForNewToken();
    
    // Esperar por un token durante unos segundos (útil después del redirect de Google)
    this.authService.waitForToken();
    
    // Suscribirse a cambios en el estado de autenticación
    this.authService.user$.subscribe(user => {
      console.log('Estado de usuario cambió:', user);
      if (user) {
        console.log('Usuario logueado, redirigiendo al dashboard');
        this.router.navigate(['/dashboard']);
      } else {
        this.isLoading = false;
      }
    });
    
    // Si después de un momento no hay usuario, mostrar el login
    setTimeout(() => {
      if (!this.authService.isAuthenticated()) {
        this.isLoading = false;
      }
    }, 2000); // Aumentar el tiempo de espera
  }

  loginWithGoogle(): void {
    console.log('Iniciando login con Google...');
    this.authService.loginWithGoogle();
  }
}