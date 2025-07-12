import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyService {
  private apiUrl = '/api/keys';

  constructor(private http: HttpClient) { }

  generateKeyPair(alias: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}`, { alias }, {
      headers,
      responseType: 'blob'
    });
  }

  getPublicKey(alias: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/query`, { alias }, {
      headers
    });
  }
}
