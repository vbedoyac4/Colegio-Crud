import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';

export interface GradoDto {
  id: number;
  nombre: string;
  profesor: string; 
}

export interface Grado {
  id: number;
  nombre: string;
  profesorId: number; 
}

@Injectable({
  providedIn: 'root'
})
export class GradosService {
  private apiUrl = `${environment.apiUrl}/Grado`; 

  constructor(private http: HttpClient) {}

   getGrados(): Observable<GradoDto[]> {
    return this.http.get<GradoDto[]>(this.apiUrl);
  }

  getGradoById(id: number): Observable<GradoDto> {
    return this.http.get<GradoDto>(`${this.apiUrl}/${id}`);
  }

  getGrado(id: number): Observable<Grado> {
    return this.http.get<Grado>(`${this.apiUrl}/db/${id}`);
  }

  addGrado(grado: Grado): Observable<Grado> {
    return this.http.post<Grado>(this.apiUrl, grado);
  }

  updateGrado(grado: Grado): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${grado.id}`, grado);
  }

  deleteGrado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
