import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/enviroment';


export interface Alumno {
  id: number;
  nombres: string;
  apellidos: string;
  genero: string;
  fechaNacimiento: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {
  private apiUrl = `${environment.apiUrl}/Alumno`; 

  constructor(private http: HttpClient) {}

  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.apiUrl);
  }

  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(`${this.apiUrl}/${id}`);
  }

  addAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(this.apiUrl, alumno);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${this.apiUrl}/${alumno.id}`, alumno);
  }

  deleteAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
