import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';

export interface AlumnoGrado{
  id: number;
  alumnoId: number;
  gradoId: number;
  seccion: string;
}

export interface AlumnoGradoDto{
  id: number;
  alumno: number;
  grado: number;
  seccion: string;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnosGradosService {
  private apiUrl = `${environment.apiUrl}/AlumnoGrado`; 

  constructor(private http: HttpClient) { }

  getAlumnosGrado(): Observable<AlumnoGradoDto[]> {
    return this.http.get<AlumnoGradoDto[]>(this.apiUrl);
  }

  getAlumnoGradoById(id: number): Observable<AlumnoGradoDto> {
    return this.http.get<AlumnoGradoDto>(`${this.apiUrl}/${id}`);
  }

  getAlumnoGrado(id: number): Observable<AlumnoGrado> {
    return this.http.get<AlumnoGrado>(`${this.apiUrl}/db/${id}`);
  }

  addAlumnoGrado(alumno: AlumnoGrado): Observable<AlumnoGrado> {
    return this.http.post<AlumnoGrado>(this.apiUrl, alumno);
  }

  updateAlumnoGrado(alumno: AlumnoGrado): Observable<AlumnoGrado> {
    return this.http.put<AlumnoGrado>(`${this.apiUrl}/${alumno.id}`, alumno);
  }

  deleteAlumnoGrado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
