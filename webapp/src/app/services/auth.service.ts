import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

export interface User {
  id: string;
  name?: string;
  email?: string;
  avatarUrl?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User | null> {
    return this.http.get<User>('/auth/me', { withCredentials: true }).pipe(
      tap(user => this.setUser(user)),
      catchError(err => {
        this.setUser(null);
        return of(null);
      })
    );
  }

  setUser(user: User | null): void {
    this.userSubject.next(user);
  }

  isAuthenticated(): boolean {
    return !!this.userSubject.getValue();
  }

  loginWithGoogle(): void {
    window.location.href = 'https://localhost:3000/auth/google';
  }
}
