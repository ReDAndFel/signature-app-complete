import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  // Listar usuarios con paginación y búsqueda
  getUsers(page: number = 1, limit: number = 5, search?: string): Observable<UsersResponse> {
    let params: any = { page: page.toString(), limit: limit.toString() };
    if (search) {
      params.search = search;
    }
    
    return this.http.get<UsersResponse>(`${this.baseUrl}/user/list`, { params });
  }

  // Obtener usuario por ID
  getUserById(id: number): Observable<{ user: User }> {
    return this.http.get<{ user: User }>(`${this.baseUrl}/user/id/${id}`);
  }
}
