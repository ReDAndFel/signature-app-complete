import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  // Compartir archivo con usuario
  shareFile(fileId: number, sharedWithUserId: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/shared`, {
      fileId,
      sharedWithUserId
    });
  }

  // Compartir archivo con múltiples usuarios
  shareFileWithMultipleUsers(fileId: number, userIds: number[]): Observable<{ message: string; results: any[] }> {
    return this.http.post<{ message: string; results: any[] }>(`${this.baseUrl}/shared/multiple`, {
      fileId,
      userIds
    });
  }

  // Revocar acceso a archivo
  revokeAccess(fileId: number, sharedWithUserId: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/shared`, {
      body: {
        fileId,
        sharedWithUserId
      }
    });
  }
}
