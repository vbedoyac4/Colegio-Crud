import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';

export interface Profesor{
  id: number;
  nombres: string;
  apellidos: string;
  genero: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {
  private apiUrl = `${environment.apiUrl}/Profesor`;

  constructor(private http: HttpClient) { }

  getProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.apiUrl);
  }

  getProfesorById(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.apiUrl}/${id}`);
  }

  addProfesor(alumno: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.apiUrl, alumno);
  }

  updateProfesor(alumno: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.apiUrl}/${alumno.id}`, alumno);
  }

  deleteProfesor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
