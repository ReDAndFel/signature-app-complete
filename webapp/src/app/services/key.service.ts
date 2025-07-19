import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  private apiUrl = '/api/key';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  generateKeyPair(alias: string): Observable<Blob> {
    const headers = this.getHeaders();

    return this.http.post(`${this.apiUrl}`, { alias }, {
      headers,
      responseType: 'blob'
    });
  }

  getPublicKey(alias: string): Observable<any> {
    const headers = this.getHeaders();

    return this.http.post(`${this.apiUrl}/query`, { alias }, {
      headers
    });
  }
}
