import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface FileItem {
  id: number;
  fileName: string;
  hash: string;
  path: string;
  userId: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

export interface FileSignature {
  signature: string;
  keyId: number;
  userId: number;
  fileId: number;
  createdAt?: string;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  // Subir archivo
  uploadFile(file: File): Observable<FileItem> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<FileItem>(`${this.baseUrl}/file`, formData);
  }

  // Listar todos los archivos (disponibles para cualquier usuario)
  getUserFiles(): Observable<FileItem[]> {
    return this.http.get<FileItem[]>(`${this.baseUrl}/file/accesible`);
  }

  // Obtener archivo por ID
  getFileById(id: number): Observable<FileItem> {
    return this.http.get<FileItem>(`${this.baseUrl}/file/${id}`);
  }

  // Firmar archivo
  signFile(fileId: number, privateKeyFile: File): Observable<FileSignature> {
    const formData = new FormData();
    formData.append('file', privateKeyFile);
    return this.http.post<FileSignature>(`${this.baseUrl}/signature/${fileId}`, formData);
  }

  // Listar firmas del usuario
  getUserSignatures(): Observable<FileSignature[]> {
    return this.http.get<FileSignature[]>(`${this.baseUrl}/signature/user`);
  }

  // Listar firmas de un archivo específico
  getFileSignatures(fileId: number): Observable<FileSignature[]> {
    return this.http.get<FileSignature[]>(`${this.baseUrl}/signature/file/${fileId}`);
  }

  // Verificar firma
  verifySignature(signatureId: number): Observable<{ valid: boolean }> {
    return this.http.post<{ valid: boolean }>(`${this.baseUrl}/verify-signature/${signatureId}`, {});
  }
}
