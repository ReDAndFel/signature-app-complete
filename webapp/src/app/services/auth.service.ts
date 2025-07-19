import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    console.log('AuthService initialized');
    this.checkInitialAuth();
  }

  private checkInitialAuth(): void {
    console.log('Checking initial auth...');
    // Verificar si hay token en cookies al inicializar
    const token = this.getCookie('accessToken');
    console.log('Token found in cookies:', token ? 'YES' : 'NO');
    
    if (token) {
      try {
        const payload = this.decodeJwt(token);
        console.log('Token payload:', payload);
        
        // Verificar si el token no ha expirado
        const currentTime = Math.floor(Date.now() / 1000);
        console.log('Current time:', currentTime, 'Token exp:', payload.exp);
        
        if (payload.exp && payload.exp > currentTime) {
          const user: User = {
            id: payload.sub,
            name: payload.name,
            email: payload.email,
            avatarUrl: payload.avatarUrl
          };
          this.userSubject.next(user);
          console.log('Usuario autenticado desde cookie:', user);
        } else {
          console.log('Token expirado');
          this.clearAuthCookie();
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        this.clearAuthCookie();
      }
    } else {
      console.log('No token found in cookies');
    }
  }

  private getCookie(name: string): string | null {
    console.log('Getting cookie:', name);
    console.log('Full document.cookie:', document.cookie);
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    console.log('Cookie search parts:', parts);
    
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(';').shift() || null;
      console.log('Found cookie value:', cookieValue);
      return cookieValue;
    }
    
    console.log('Cookie not found');
    return null;
  }

  private clearAuthCookie(): void {
    document.cookie = 'accessToken=; Max-Age=0; path=/; domain=' + window.location.hostname;
    document.cookie = 'accessToken=; Max-Age=0; path=/;';
  }

  private decodeJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  loginWithGoogle(): void {
    // Redirigir a la ruta de autenticación de Google en el backend
    window.location.href = '/api/auth/google';
  }

  logout(): void {
    this.userSubject.next(null);
    this.clearAuthCookie();
    // Opcional: redirigir al backend para limpiar la sesión
    // window.location.href = '/api/auth/logout';
  }

  isAuthenticated(): boolean {
    return this.userSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // Método para verificar manualmente si hay un token nuevo en cookies
  checkForNewToken(): void {
    console.log('Checking for new token...');
    this.checkInitialAuth();
  }

  // Método para verificar periódicamente por un token (útil después del redirect)
  waitForToken(maxAttempts: number = 10, interval: number = 500): void {
    let attempts = 0;
    const checkInterval = setInterval(() => {
      attempts++;
      console.log(`Token check attempt ${attempts}/${maxAttempts}`);
      
      const token = this.getCookie('accessToken');
      if (token && !this.isAuthenticated()) {
        console.log('New token found, processing...');
        this.checkInitialAuth();
        clearInterval(checkInterval);
      } else if (attempts >= maxAttempts) {
        console.log('Token check timeout, no token found');
        clearInterval(checkInterval);
      }
    }, interval);
  }
}